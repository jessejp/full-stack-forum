import { MyContext } from "src/types";
import { Post } from "../entities/Post";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { PostgresDataSource } from "../utils/DataSource";
import { Vote } from "../entities/Vote";
import { User } from "../entities/User";

@InputType()
class PostInput {
  @Field()
  title: string;
  @Field()
  text: string;
}

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];
  @Field()
  hasMore: boolean;
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() root: Post) {
    return root.text.slice(0, 80);
  }

  @FieldResolver(() => User)
  creator(@Root() post: Post, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(post.creatorId);
  }

  @FieldResolver(() => Int, { nullable: true })
  async voteStatus(@Root() post: Post, @Ctx() { voteLoader, req }: MyContext) {
    if (!req.session.userId) return null;

    const vote = await voteLoader.load({
      postId: post._id,
      userId: req.session.userId,
    });

    return vote ? vote.value : null;
  }

  @Query(() => PaginatedPosts)
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);
    const tommiStrat = realLimit + 1;

    const replacements: any[] = [tommiStrat];

    if (cursor) {
      replacements.push(cursor);
    }

    const posts = await PostgresDataSource.query(
      `
      SELECT p.*
      FROM post p
      ${cursor ? 'WHERE p."createdAt" < $2' : ""}
      ORDER BY p."createdAt" DESC
      LIMIT $1
    `,
      replacements
    );

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === tommiStrat,
    };
  }

  @Query(() => Post, { nullable: true })
  async readPost(@Arg("_id", () => Int) _id: number): Promise<Post | null> {
    return Post.findOne({ where: { _id } });
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    return Post.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async updatePost(
    @Arg("_id", () => Int) _id: number,
    @Arg("title") title: string,
    @Arg("text") text: string,
    @Ctx() { req }: MyContext
  ): Promise<Post | null> {
    const result = await PostgresDataSource.createQueryBuilder()
      .update(Post)
      .set({ title, text })
      .where("_id = :id", { id: _id })
      .andWhere("creatorId = :creatorId", { creatorId: req.session.userId })
      .returning("*")
      .execute();

    if (!result.raw.length) {
      return null;
    }

    return result.raw[0];
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deletePost(
    @Arg("_id", () => Int) _id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const post = await Post.findOne({ where: { _id } });
    if (!post) {
      return false;
    }
    if (post.creatorId !== req.session.userId) {
      throw new Error("not authorized");
    }

    await Vote.delete({ postId: _id });
    await Post.delete({ _id, creatorId: req.session.userId });
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg("postId", () => Int) postId: number,
    @Arg("value", () => Int) value: number,
    @Ctx() { req }: MyContext
  ) {
    const isUpvote = value !== -1;
    const realValue = isUpvote ? 1 : -1;
    const { userId } = req.session;

    const isVoted = await Vote.findOne({ where: { postId, userId } });

    if (isVoted && isVoted.value !== realValue) {
      // user is changing their vote
      PostgresDataSource.transaction(async (manager) => {
        await manager.query(
          `
        UPDATE vote
        SET value = $1
        WHERE "userId" = $2 AND "postId" = $3;
        `,
          [realValue, userId, postId]
        );

        await manager.query(
          `
        UPDATE post
        SET points = points + $1
        WHERE "_id" = $2;
        `,
          [realValue * 2, postId]
        );
      });
    } else if (!isVoted) {
      // use has not voted before
      PostgresDataSource.transaction(async (manager) => {
        await manager.query(
          `
          INSERT INTO vote("userId", "postId", value)
          VALUES ($1, $2, $3);
          `,
          [userId, postId, realValue]
        );

        await manager.query(
          `
          UPDATE post
          SET points = points + $1
          WHERE _id = $2;
          `,
          [realValue, postId]
        );
      });
    }

    return true;
  }
}

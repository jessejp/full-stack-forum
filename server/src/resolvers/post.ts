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
      SELECT p.*,
      json_build_object(
        '_id', u._id,
        'username', u.username,
        'email', u.email
      ) creator
      FROM post p
      INNER JOIN public.user u ON u._id = p."creatorId"
      ${cursor ? `WHERE p."createdAt" < $2` : ""}
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
  readPost(@Arg("_id", () => Int) _id: number): Promise<Post | null> {
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
  async updatePost(
    @Arg("_id") _id: number,
    @Arg("title") title: string
  ): Promise<Post | null> {
    const post = await Post.findOne({ where: { _id } });
    if (!post) {
      return null;
    }
    if (typeof title !== "undefined") {
      await Post.update({ _id: post._id }, { title });
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("_id") _id: number): Promise<boolean> {
    try {
      await Post.delete({ _id });
      return true;
    } catch {
      return false;
    }
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

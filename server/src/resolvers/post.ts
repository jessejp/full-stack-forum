import { Post } from "../entities/Post";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(): Promise<Post[]> {
    return Post.find({});
  }

  @Query(() => Post, { nullable: true })
  readPost(@Arg("_id", () => Int) _id: number): Promise<Post | null> {
    return Post.findOne({ where: { _id } });
  }

  @Mutation(() => Post)
  async createPost(@Arg("title") title: string): Promise<Post> {
    // Note: this is 2 SQL queries
    return Post.create({ title }).save();
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
}

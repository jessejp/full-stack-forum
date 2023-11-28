import { ReadPostQuery } from "@/generated/graphql";
import { READ_POST } from "@/graphql/queries/readPost";
import { createApolloClient } from "@/utils/createApolloClient";
import type {
  InferGetServerSidePropsType,
  NextPage,
  GetServerSideProps,
} from "next";
import { parse } from "path";
import React from "react";

const Post: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ post }) => {
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.text}</p>
      <div>Created by: {post.creator.username}</div>
    </div>
  );
};

export const getServerSideProps = (async (context) => {
  if (!context.params?.id || typeof context.params.id !== "string") {
    return {
      props: {
        post: null,
      },
    };
  }

  const client = createApolloClient();
  const { data } = await client.query<ReadPostQuery>({
    query: READ_POST,
    variables: {
      id: parseInt(context.params.id),
    },
  });

  return {
    props: {
      post: data.readPost,
    },
  };
}) satisfies GetServerSideProps<{
  post: ReadPostQuery["readPost"];
}>;

export default Post;

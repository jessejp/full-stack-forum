import Layout from "@/components/Layout";
import PostItem from "@/components/PostItem";
import { ReadPostQuery } from "@/generated/graphql";
import { READ_POST } from "@/graphql/queries/readPost";
import { createApolloClient } from "@/utils/createApolloClient";
import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import type {
  InferGetServerSidePropsType,
  NextPage,
  GetServerSideProps,
} from "next";
import { useRouter } from "next/router";
import React from "react";

const Post: NextPage = () => {
  const { id } = useRouter().query;
  const badId = !id || typeof id !== "string";

  const { data } = useQuery<ReadPostQuery>(READ_POST, {
    variables: {
      id: !badId ? parseInt(id) : -1,
    },
    skip: badId,
  });

  const post = data?.readPost;

  if (!post || badId) {
    return (
      <Layout>
        <Box color={"red"}>Post not found.</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <PostItem post={post} />
    </Layout>
  );
};

// export const getServerSideProps = (async (context) => {
//   if (!context.params?.id || typeof context.params.id !== "string") {
//     return {
//       props: {
//         post: null,
//       },
//     };
//   }

//   const client = createApolloClient();
//   const { data } = await client.query<ReadPostQuery>({
//     query: READ_POST,
//     variables: {
//       id: parseInt(context.params.id),
//     },
//   });

//   return {
//     props: {
//       post: data.readPost,
//     },
//   };
// }) satisfies GetServerSideProps<{
//   post: ReadPostQuery["readPost"];
// }>;

export default Post;

import NavBar from "@/components/NavBar";
import { PostsQuery } from "@/generated/graphql";
import { POSTS_QUERY } from "@/graphql/queries/posts";
import { createApolloClient } from "@/utils/createApolloClient";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import Head from "next/head";

export default function Home({ posts }: { posts: PostsQuery["posts"] }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <NavBar />
        <Flex direction={"row"} alignItems={"end"} gap={8} mb={4}>
          <Heading>Welcome!</Heading>
          <Button as={Link} href={"/create-post"}>
            Create A Post
          </Button>
        </Flex>
        <Stack>
          {!posts && <div>Loading...</div>}
          {posts && posts.map((post) => <div key={post._id}>{post.title}</div>)}
        </Stack>
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  const client = createApolloClient();
  const { data } = await client.query<PostsQuery>({
    query: POSTS_QUERY,
  });

  return {
    props: {
      posts: data.posts,
    },
  };
}

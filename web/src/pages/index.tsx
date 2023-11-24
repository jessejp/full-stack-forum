import NavBar from "@/components/NavBar";
import { PostsQuery } from "@/generated/graphql";
import { POSTS_QUERY } from "@/graphql/queries/posts";
import { createApolloClient } from "@/utils/createApolloClient";
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
      <Box px={8}>
        <NavBar />
        <Flex
          direction={"row"}
          alignItems={"end"}
          justifyContent={"space-between"}
          gap={8}
          mb={4}
        >
          <Heading>Welcome!</Heading>
          <Button as={Link} href={"/create-post"}>
            Create A Post
          </Button>
        </Flex>
        <Stack gap={8}>
          {!posts && <div>Loading...</div>}
          {posts &&
            posts.map((post) => (
              <Box
                key={post._id}
                minW={128 * 2}
                maxW={128 * 8}
                w={"100%"}
                shadow={"md"}
                p={4}
                borderRadius={4}
              >
                <Heading size={"md"} mb={2}>
                  {post.title}
                </Heading>
                <Box>{post.textSnippet}</Box>
              </Box>
            ))}
        </Stack>
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  const client = createApolloClient();
  const { data } = await client.query<PostsQuery>({
    query: POSTS_QUERY,
    variables: {
      limit: 10,
      cursor: null,
    },
  });

  return {
    props: {
      posts: data.posts,
    },
  };
}

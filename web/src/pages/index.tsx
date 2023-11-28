import NavBar from "@/components/NavBar";
import { PostsQuery } from "@/generated/graphql";
import { POSTS_QUERY } from "@/graphql/queries/posts";
import Link from "next/link";
import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import PostItem from "@/components/PostItem";
import Layout from "@/components/Layout";

export default function Home() {
  const { data, loading, fetchMore } = useQuery<PostsQuery>(POSTS_QUERY, {
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  const { posts, hasMore } = data?.posts || {};

  return (
    <Layout>
      <Flex
        direction={"row"}
        alignItems={"end"}
        justifyContent={"space-between"}
        gap={8}
        mb={4}
      >
        <Heading>Welcome to the forum!</Heading>
        <Button as={Link} href={"/create-post"}>
          Create A Post
        </Button>
      </Flex>
      <Stack gap={8}>
        {loading && <Box>Loading...</Box>}
        {!loading && !posts && <Box>No posts found.</Box>}
        {!!posts &&
          posts.map((post) => <PostItem key={post._id} post={post} />)}
        {!!posts && hasMore && (
          <Button
            isLoading={loading}
            onClick={async () => {
              await fetchMore({
                variables: {
                  limit: 15,
                  cursor: posts[posts.length - 1].createdAt,
                },
                // updateQuery: (prev, { fetchMoreResult }) => {
                //   if (!fetchMoreResult) {
                //     return prev;
                //   }

                //   return {
                //     __typename: "Query",
                //     posts: {
                //       __typename: "PaginatedPosts",
                //       hasMore: fetchMoreResult.posts.hasMore,
                //       posts: [
                //         ...prev.posts.posts,
                //         ...fetchMoreResult.posts.posts,
                //       ],
                //     },
                //   };
                // },
              });
            }}
          >
            Load More
          </Button>
        )}
      </Stack>
    </Layout>
  );
}

// export async function getServerSideProps() {
//   const client = createApolloClient();
//   const { data } = await client.query<PostsQuery>({
//     query: POSTS_QUERY,
//     variables: {
//       limit: 10,
//       cursor: null,
//     },
//   });

//   return {
//     props: {
//       posts: data.posts,
//     },
//   };
// }

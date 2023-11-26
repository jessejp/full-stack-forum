import { PostsQuery, VoteMutation } from "@/generated/graphql";
import { Flex, Heading, Box, IconButton } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import React from "react";
import { useMutation } from "@apollo/client";
import { VOTE_MUTATION } from "@/graphql/mutations/vote";

interface PostItemProps {
  post: PostsQuery["posts"]["posts"][0];
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const [voteMutation, { loading }] = useMutation<VoteMutation>(VOTE_MUTATION);
  return (
    <Flex
      direction={"row"}
      minW={128 * 2}
      maxW={128 * 8}
      w={"100%"}
      shadow={"md"}
      p={4}
      borderRadius={4}
      gap={4}
      align={"center"}
    >
      <Flex direction={"column"} gap={1}>
        <IconButton
          isDisabled={loading}
          size={"sm"}
          aria-label="Like Post"
          icon={<TriangleUpIcon />}
          _hover={{ background: "green.400" }}
          onClick={async () => {
            await voteMutation({
              variables: {
                postId: post._id,
                value: 1,
              },
              update: (cache) => {
                // cache.evict({ fieldName: "posts" });
              },
            });
          }}
        />
        <Box textAlign={"center"}>{post.points}</Box>
        <IconButton
          isDisabled={loading}
          size={"sm"}
          aria-label="Dislike Post"
          icon={<TriangleDownIcon />}
          _hover={{ background: "red.400" }}
          onClick={async () => {
            await voteMutation({
              variables: {
                postId: post._id,
                value: -1,
              },
              update: (cache) => {
                // cache.evict({ fieldName: "posts" });
              },
            });
          }}
        />
      </Flex>
      <Flex direction={"column"} gap={2}>
        <Heading size={"md"}>{post.title}</Heading>
        <Box>{post.textSnippet}</Box>
        <Box color={"purple"} fontSize={"small"}>
          posted by {post.creator.username}
        </Box>
      </Flex>
    </Flex>
  );
};

export default PostItem;
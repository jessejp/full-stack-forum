import {
  DeletePostMutation,
  PostFragmentFieldsFragment,
  PostsQuery,
  ReadPostQuery,
  VoteMutation,
} from "@/generated/graphql";
import { Flex, Heading, Box, IconButton } from "@chakra-ui/react";
import {
  DeleteIcon,
  EditIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import React from "react";
import { gql, useMutation } from "@apollo/client";
import { VOTE_MUTATION } from "@/graphql/mutations/vote";
import Link from "next/link";
import { DELETE_POST } from "@/graphql/mutations/deletePost";

interface PostItemProps {
  post: PostFragmentFieldsFragment & {
    textSnippet?: string;
    text?: string;
  };
  userId?: number;
}

const PostItem: React.FC<PostItemProps> = ({ post, userId }) => {
  const isFullPost = !!post.text;
  const [voteMutation, { loading }] = useMutation<VoteMutation>(VOTE_MUTATION);

  const [deleteMutation] = useMutation<DeletePostMutation>(DELETE_POST);

  const handleVote: (voteValue: 1 | -1) => void = async (voteValue) => {
    if (post.voteStatus === voteValue) return;

    await voteMutation({
      variables: {
        postId: post._id,
        value: voteValue,
      },
      update: (cache) => {
        const data = cache.readFragment<{
          _id: string;
          points: number;
          voteStatus: number | null;
        }>({
          id: "Post:" + post._id,
          fragment: gql`
            fragment _ on Post {
              _id
              points
              voteStatus
            }
          `,
        });

        if (!data || data.voteStatus === voteValue) return;

        const newPoints = data.points + (!data.voteStatus ? 1 : 2) * voteValue;
        cache.writeFragment({
          id: "Post:" + post._id,
          fragment: gql`
            fragment __ on Post {
              points
              voteStatus
            }
          `,
          data: {
            points: newPoints,
            voteStatus: voteValue,
          },
        });
      },
    });
  };

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
      align={"start"}
    >
      <Flex direction={"column"} gap={1}>
        <IconButton
          bg={post.voteStatus === 1 ? "green.500" : "initial"}
          isDisabled={loading}
          size={"sm"}
          aria-label="Like Post"
          icon={<TriangleUpIcon />}
          _hover={{ background: "green.400", color: "black" }}
          onClick={() => {
            handleVote(1);
          }}
        />
        <Box textAlign={"center"}>{post.points}</Box>
        <IconButton
          bg={post.voteStatus === -1 ? "red.500" : "initial"}
          isDisabled={loading}
          size={"sm"}
          aria-label="Dislike Post"
          icon={<TriangleDownIcon />}
          _hover={{ background: "red.400", color: "black" }}
          onClick={() => {
            handleVote(-1);
          }}
        />
      </Flex>
      <Flex direction={"column"} gap={2} w={"full"}>
        <Heading
          as={!isFullPost ? Link : undefined}
          href={`/post/${post._id}`}
          size={"md"}
          color={!isFullPost ? "blue.600" : undefined}
          _hover={
            !isFullPost
              ? { textDecor: "underline", color: "blue.400" }
              : undefined
          }
          _visited={!isFullPost ? { color: "purple.500" } : undefined}
        >
          {post.title}
        </Heading>
        <Box>{isFullPost ? post.text : `${post.textSnippet}...`}</Box>
        <Box color={"purple"} fontSize={"small"}>
          posted by {post.creator.username}
        </Box>
      </Flex>
      {post.creator._id === userId && (
        <Flex direction={"column"} gap={2}>
          <IconButton
            aria-label="delete post"
            icon={<DeleteIcon />}
            onClick={async () => {
              await deleteMutation({
                variables: {
                  id: post._id,
                },
                update: (cache) => {},
              });
            }}
          />
          <IconButton
            as={Link}
            href={`/post/edit/${post._id}`}
            aria-label="delete post"
            icon={<EditIcon />}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default PostItem;

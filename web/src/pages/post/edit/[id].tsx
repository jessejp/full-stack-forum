import InputField from "@/components/InputField";
import Layout from "@/components/Layout";
import { ReadPostQuery, UpdatePostMutation } from "@/generated/graphql";
import { EDIT_POST } from "@/graphql/mutations/editPost";
import { READ_POST } from "@/graphql/queries/readPost";
import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const EditPost: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const badId = !id || typeof id !== "string";

  const { data } = useQuery<ReadPostQuery>(READ_POST, {
    variables: {
      id: !badId ? parseInt(id) : -1,
    },
    skip: badId,
  });

  const [editPost] = useMutation<UpdatePostMutation>(EDIT_POST);

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
      <Flex align="center" justify="center">
        <Formik
          initialValues={{ title: post.title, text: post.text }}
          onSubmit={async ({ text, title }) => {
            await editPost({
              variables: {
                title,
                text,
                id: post._id,
              },
            }).then((res) => {
              router.push(`/post/${post._id}`);
              return res;
            });
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <VStack w={"100vw"} px={4} maxW={128 * 4}>
                <InputField
                  label="Title"
                  name="title"
                  placeholder="title"
                  variant="filled"
                />
                <InputField
                  label="Text"
                  name="text"
                  placeholder="Write your post here ..."
                  variant="filled"
                  isTextArea
                  height={64 * 4}
                />

                <Button
                  isLoading={isSubmitting}
                  type="submit"
                  colorScheme="purple"
                  width="full"
                >
                  Submit
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Flex>
    </Layout>
  );
};

export default EditPost;

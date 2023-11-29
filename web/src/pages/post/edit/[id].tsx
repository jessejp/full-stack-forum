import InputField from "@/components/InputField";
import Layout from "@/components/Layout";
import { ReadPostQuery } from "@/generated/graphql";
import { READ_POST } from "@/graphql/queries/readPost";
import { useQuery } from "@apollo/client";
import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const EditPost: NextPage = () => {
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
      <Flex align="center" justify="center">
        <Formik initialValues={{ title: post.title, text: post.text }}>
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <VStack>
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

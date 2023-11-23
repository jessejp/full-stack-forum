import InputField from "@/components/InputField";
import NavBar from "@/components/NavBar";
import { CreatePostMutation } from "@/generated/graphql";
import { CREATE_POST } from "@/graphql/mutations/createPost";
import { useMutation } from "@apollo/client";
import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import type { NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";
import { useIsAuth } from "@/utils/useIsAuth";

interface CreatePostProps {}

const CreatePost: NextPage<CreatePostProps> = ({}) => {
  useIsAuth();
  const router = useRouter();
  const [createPost] = useMutation<CreatePostMutation>(CREATE_POST);
  return (
    <Box>
      <NavBar />
      <Flex align="center" justify="center">
        <Formik
          initialValues={{ title: "", text: "" }}
          onSubmit={async (values, { setErrors }) => {
            console.log(values);
            if (values.title.length < 1) {
              setErrors({ title: "Title must be at least 1 character long" });
              return;
            }

            if (values.text.length < 1) {
              setErrors({ text: "Text must be at least 1 character long" });
              return;
            }

            const response = await createPost({
              variables: {
                input: {
                  ...values,
                },
              },
            })
              .then((res) => {
                router.push("/");
                return res;
              })
              .catch((err) => {
                return err;
              });
          }}
        >
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
    </Box>
  );
};

export default CreatePost;

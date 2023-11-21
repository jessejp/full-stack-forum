import InputField from "@/components/InputField";
import NavBar from "@/components/NavBar";
import { Box, Flex, VStack, Heading, Button } from "@chakra-ui/react";
import { Formik } from "formik";
import type { GetStaticPaths, GetStaticPropsContext, NextPage } from "next";
import router from "next/router";
import React from "react";

interface ChangePasswordProps {}

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  return (
    <Box h="100vh" bg="gray.100">
      <NavBar />
      <Flex align="center" justify="center" h="100%">
        <Box bg="white" p={6} rounded="md" w={64}>
          <VStack spacing={4} align="flex-start">
            <Heading size="md">Change Password</Heading>
            <Formik
              initialValues={{
                newPassword: "",
              }}
              onSubmit={async (values, { setErrors }) => {
                // const response = await changePassword({
                //   variables: {
                //     ...values,
                //   },
                // });
                // if (response.data?.forgotPassword.errors) {
                //   setErrors(toErrorMap(response.data.forgotPassword.errors));
                // } else if (response.data?.forgotPassword) {
                //   router.push("/");
                //   return response;
                // }
              }}
            >
              {({ handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <InputField
                      label="New Password"
                      type="password"
                      name="newPassword"
                      placeholder="enter new password"
                      variant="filled"
                    />
                    <Button
                      isLoading={isSubmitting}
                      type="submit"
                      colorScheme="purple"
                      width="full"
                    >
                      Change Password
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ token: string }>
) => {
  return {
    props: {
      token: context.params?.token,
    },
  };
};

export default ChangePassword;

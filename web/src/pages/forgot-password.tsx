import InputField from "@/components/InputField";
import NavBar from "@/components/NavBar";
import { ForgotPasswordMutation } from "@/generated/graphql";
import { FORGOT_PASSWORD } from "@/graphql/mutations/forgotPassword";
import { toErrorMap } from "@/utils/toErrorMap";
import { useMutation } from "@apollo/client";
import { Box, Flex, VStack, Heading, Button } from "@chakra-ui/react";
import { Formik } from "formik";
import { NextPage } from "next";
import router from "next/router";
import React from "react";

interface ForgotPasswordProps {}

const ForgotPassword: NextPage<ForgotPasswordProps> = ({}) => {
  const [forgotPassword] = useMutation<ForgotPasswordMutation>(FORGOT_PASSWORD);
  return (
    <Box h="100vh" bg="gray.100">
      <NavBar />
      <Flex align="center" justify="center" h="100%">
        <Box bg="white" p={6} rounded="md" w={64}>
          <VStack spacing={4} align="flex-start">
            <Heading size="md">Forgot Password</Heading>
            <Formik
              initialValues={{
                email: "",
              }}
              onSubmit={async (values, { setErrors }) => {
                const response = await forgotPassword({
                  variables: {
                    email: values.email,
                  },
                });
                router.push("/");
                return response;
              }}
            >
              {({ handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <InputField
                      label="Your Email"
                      type="email"
                      name="email"
                      placeholder="enter your email"
                      variant="filled"
                    />
                    <Button
                      isLoading={isSubmitting}
                      type="submit"
                      colorScheme="purple"
                      width="full"
                    >
                      Request New Password
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

export default ForgotPassword;

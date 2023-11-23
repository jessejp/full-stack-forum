import InputField from "@/components/InputField";
import NavBar from "@/components/NavBar";
import { ChangePasswordMutation } from "@/generated/graphql";
import { CHANGE_PASSWORD } from "@/graphql/mutations/changePassword";
import { toErrorMap } from "@/utils/toErrorMap";
import { useMutation } from "@apollo/client";
import { Box, Flex, VStack, Heading, Button } from "@chakra-ui/react";
import { Formik } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [changePassword] = useMutation<ChangePasswordMutation>(CHANGE_PASSWORD);
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
                repeatNewPassword: "",
              }}
              onSubmit={async (values, { setErrors }) => {
                if (values.newPassword !== values.repeatNewPassword) {
                  setErrors({
                    newPassword: "passwords do not match",
                    repeatNewPassword: "passwords do not match",
                  });
                  return;
                }
                const response = await changePassword({
                  variables: {
                    newPassword: values.newPassword,
                    token: router.query.token as string,
                  },
                });
                if (response.data?.changePassword.errors) {
                  const errorMap = toErrorMap(
                    response.data.changePassword.errors
                  );
                  if ("token" in errorMap) {
                    router.push("/forgot-password");
                  }
                  setErrors(errorMap);
                } else if (response.data?.changePassword.user) {
                  router.push("/");
                  return response;
                }
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
                    <InputField
                      label="New Password"
                      type="password"
                      name="repeatNewPassword"
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

export default ChangePassword;

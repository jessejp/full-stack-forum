import { Formik } from "formik";
import { Box, Button, Flex, VStack, Heading } from "@chakra-ui/react";
import InputField from "@/components/InputField";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useMutation } from "@apollo/client";
import { LoginMutation, MeDocument } from "@/generated/graphql";
import { toErrorMap } from "@/utils/toErrorMap";
import { LOGIN_USER } from "@/graphql/mutations/login";
import NavBar from "@/components/NavBar";
import Link from "next/link";

const Login: NextPage = () => {
  const router = useRouter();
  const [login] = useMutation<LoginMutation>(LOGIN_USER);
  return (
    <Box h="100vh" bg="gray.100">
      <NavBar />
      <Flex align="center" justify="center" h="100%">
        <Box bg="white" p={6} rounded="md" w={64}>
          <VStack spacing={4} align="flex-start">
            <Heading size="md">Login</Heading>
            <Formik
              initialValues={{
                usernameOrEmail: "",
                password: "",
              }}
              onSubmit={async (values, { setErrors }) => {
                const response = await login({
                  variables: {
                    ...values,
                  },
                  update: (cache, { data }) => {
                    cache.writeQuery({
                      query: MeDocument,
                      data: {
                        __typename: "Query",
                        me: data?.login.user,
                      },
                    });
                  },
                });

                if (response.data?.login.errors) {
                  setErrors(toErrorMap(response.data.login.errors));
                } else if (response.data?.login.user) {
                  router.push(
                    router.query.next ? router.query.next.toString() : "/"
                  );
                  return response;
                }
              }}
            >
              {({ handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <InputField
                      label="Username or Email"
                      type="text"
                      name="usernameOrEmail"
                      placeholder="enter username"
                      variant="filled"
                    />
                    <InputField
                      label="Password"
                      type="password"
                      name="password"
                      placeholder="enter password"
                      variant="filled"
                    />
                    <Button
                      isLoading={isSubmitting}
                      type="submit"
                      colorScheme="purple"
                      width="full"
                    >
                      Login
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
            <Link href="/forgot-password">
              <Button colorScheme="purple" variant="link">
                Forgot Password?
              </Button>
            </Link>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Login;

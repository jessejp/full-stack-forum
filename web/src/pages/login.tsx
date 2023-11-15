import { Formik } from "formik";
import { Box, Button, Flex, VStack, Heading } from "@chakra-ui/react";
import InputField from "@/components/InputField";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useMutation } from "@apollo/client";
import { LoginMutation } from "@/generated/graphql";
import { toErrorMap } from "@/utils/toErrorMap";
import { LOGIN_USER } from "@/graphql/mutations/login";

const Login: NextPage = () => {
  const router = useRouter();
  const [login] = useMutation<LoginMutation>(LOGIN_USER);
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={64}>
        <VStack spacing={4} align="flex-start">
          <Heading size='md'>Login</Heading>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await login({ variables: { options: values } });

              if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data.login.errors));
              } else if (response.data?.login.user) {
                router.push("/");
                return response;
              }
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <InputField
                    label="Username"
                    type="text"
                    name="username"
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
        </VStack>
      </Box>
    </Flex>
  );
};

export default Login;

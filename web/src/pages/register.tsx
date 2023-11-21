import { Formik } from "formik";
import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import InputField from "@/components/InputField";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "@/graphql/mutations/register";
import { MeDocument, MeQuery, RegisterMutation } from "@/generated/graphql";
import { toErrorMap } from "@/utils/toErrorMap";
import NavBar from "@/components/NavBar";

const Register: NextPage = ({}) => {
  const router = useRouter();
  const [register] = useMutation<RegisterMutation>(REGISTER_USER);
  return (
    <Box h="100vh" bg="gray.100">
      <NavBar />
      <Flex align="center" justify="center" h="100%">
        <Box bg="white" p={6} rounded="md" w={64}>
          <VStack spacing={4} align="flex-start">
            <Heading size="md">Register New User</Heading>
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
              }}
              onSubmit={async (values, { setErrors }) => {
                const response = await register({
                  variables: { options: values },
                  update: (cache, { data }) => {
                    cache.writeQuery<MeQuery>({
                      query: MeDocument,
                      data: {
                        __typename: "Query",
                        me: data?.register.user,
                      },
                    });
                  },
                });

                if (response.data?.register.errors) {
                  setErrors(toErrorMap(response.data.register.errors));
                } else if (response.data?.register.user) {
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
                      label="Email"
                      type="email"
                      name="email"
                      placeholder="enter email"
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
                      Register
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

export default Register;

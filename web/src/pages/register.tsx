import { Formik } from "formik";
import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import InputField from "@/components/InputField";
import type { NextPage } from "next";
import { gql, useMutation } from "@apollo/client";

const REGISTER_USER = gql`
  mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      errors {
        field
        message
      }
      user {
        _id
        username
      }
    }
  }
`;

interface RegisterProps {}

const Register: NextPage<RegisterProps> = ({}) => {
  const [register] = useMutation(REGISTER_USER);
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={64}>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={(values) => {
            return register({ variables: { options: values } });
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
                  Register
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default Register;

import { Formik } from "formik";
import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import InputField from "@/components/InputField";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "@/graphql/mutations/register";
import { RegisterMutation } from "@/generated/graphql";
import { toErrorMap } from "@/utils/toErrorMap";

interface RegisterProps {}

const Register: NextPage<RegisterProps> = ({}) => {
  const router = useRouter();
  const [register] = useMutation<RegisterMutation>(REGISTER_USER);
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={64}>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({ variables: { options: values } });

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

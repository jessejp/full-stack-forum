import type { LogoutMutation, MeQuery } from "@/generated/graphql";
import { LOGOUT_USER } from "@/graphql/mutations/logout";
import { ME_QUERY } from "@/graphql/queries/me";
import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { isServer } from "@/utils/isServer";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [logout, { loading: logoutFetching }] =
    useMutation<LogoutMutation>(LOGOUT_USER);
  // const apolloClient = useApolloClient();
  const { loading, data } = useQuery<MeQuery>(ME_QUERY, {
    ssr: false,
    skip: isServer(),
  });

  return (
    <Box
      py={4}
      width={"100%"}
      bg={"white"}
      position={"sticky"}
      top={0}
      zIndex={10}
    >
      <Flex
        align="center"
        justify="space-between"
        wrap={"wrap-reverse"}
        gap={4}
      >
        <Stack direction={"row"} align="center">
          <Button as={Link} href={"/"} variant={"link"}>
            Home
          </Button>
        </Stack>
        <Stack direction={"row"} align="center" gap={"4"}>
          {(loading || !data?.me) && (
            <>
              <Button
                as={Link}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                href="/login"
              >
                Login
              </Button>
              <Button
                as={Link}
                href="/register"
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"purple.500"}
                _hover={{
                  bg: "purple.300",
                }}
              >
                Register
              </Button>
            </>
          )}
          {data?.me && (
            <Flex wrap={"wrap"} align={"center"} gap={4}>
              <Stack direction={"row"} wrap={"wrap"}>
                <Text>Signed in as: </Text>
                <Text fontWeight={600} color={"purple"}>
                  {data?.me?.username}
                </Text>
              </Stack>
              <Button
                isLoading={logoutFetching}
                onClick={async () => {
                  await logout();
                  router.reload();
                  // await apolloClient.clearStore();
                }}
              >
                Logout
              </Button>
            </Flex>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default NavBar;

import { PaginatedPosts } from "@/generated/graphql";
import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { onError } from "@apollo/client/link/error";
// import Router from "next/router";

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.forEach(({ message, locations, path }) => {
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       );
//       if (message.includes("not authenticated")) {
//         Router.replace("/login");
//       }
//     });
// });

// const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

export const createApolloClient = () =>
  new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: [],
              merge(
                existing: PaginatedPosts | undefined,
                incoming: PaginatedPosts
              ): PaginatedPosts {
                return {
                  ...incoming,
                  posts: [...(existing?.posts || []), ...incoming.posts],
                };
              },
            },
          },
        },
      },
    }),
    credentials: "include",
  });

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
    cache: new InMemoryCache(),
    credentials: "include",
    // link: from([errorLink, httpLink]),
    ssrMode: true,
  });

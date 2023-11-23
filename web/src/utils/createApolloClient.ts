import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Router from "next/router";

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message }) => {
      if (message.includes("not authenticated")) {
        Router.replace("/login");
      }
    });
});

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

export const createApolloClient = () =>
  new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
    credentials: "include",
    link: from([errorLink, httpLink]),
  });

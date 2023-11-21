import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
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

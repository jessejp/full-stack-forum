import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($options: UsernamePasswordInput!) {
    login(options: $options) {
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

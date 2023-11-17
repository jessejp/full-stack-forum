import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
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
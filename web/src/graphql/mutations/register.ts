import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation register($options: UserInput!) {
    register(options: $options) {
      errors {
        field
        message
      }
      user {
        _id
        createdAt
        username
        email
      }
    }
  }
`;

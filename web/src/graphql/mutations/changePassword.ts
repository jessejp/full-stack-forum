import { gql } from "@apollo/client";

export const CHANGE_PASSWORD = gql`
  mutation changePassword($newPassword: String!, $token: String!) {
    changePassword(newPassword: $newPassword, token: $token) {
      errors {
        field
        message
      }
      user {
        _id
        email
        username
        createdAt
        updatedAt
      }
    }
  }
`;

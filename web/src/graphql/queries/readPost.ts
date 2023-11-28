import { gql } from "@apollo/client";

export const READ_POST = gql`
  query readPost($id: Int!) {
    readPost(_id: $id) {
      _id
      createdAt
      points
      title
      text
      creator {
        username
      }
    }
  }
`;

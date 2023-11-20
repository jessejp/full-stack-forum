import { gql } from "@apollo/client";

export const POSTS_QUERY = gql`
  query Posts {
    posts {
      _id
      title
      createdAt
      updatedAt
    }
  }
`;

import { gql } from "@apollo/client";

export const POSTS_QUERY = gql`
  query Posts($limit: Int!, $cursor: String) {
    posts(limit: $limit, cursor: $cursor) {
      _id
      title
      text
      creatorId
      points
      createdAt
      updatedAt
    }
  }
`;

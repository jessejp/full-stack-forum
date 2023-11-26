import { gql } from "@apollo/client";

export const POSTS_QUERY = gql`
  query Posts($limit: Int!, $cursor: String) {
    posts(limit: $limit, cursor: $cursor) {
      hasMore
      posts {
        _id
        title
        textSnippet
        creatorId
        points
        createdAt
        updatedAt
        creator {
          _id
          username
        }
      }
    }
  }
`;

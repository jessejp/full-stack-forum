import { gql } from "@apollo/client";
import { POST_FRAGMENT } from "../fragments/postFragment";

export const POSTS_QUERY = gql`
  ${POST_FRAGMENT}
  query posts($limit: Int!, $cursor: String) {
    posts(limit: $limit, cursor: $cursor) {
      hasMore
      posts {
        textSnippet
        ...PostFragmentFields
      }
    }
  }
`;

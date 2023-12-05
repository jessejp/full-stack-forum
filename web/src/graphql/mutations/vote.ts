import { gql } from "@apollo/client";

export const VOTE_MUTATION = gql`
  mutation vote($value: Int!, $postId: Int!) {
    vote(value: $value, postId: $postId)
  }
`;

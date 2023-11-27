import { gql } from "@apollo/client";

export const VOTE_MUTATION = gql`
  mutation Vote($value: Int!, $postId: Int!) {
    vote(value: $value, postId: $postId)
  }
`;

import { gql } from "@apollo/client";

export const EDIT_POST = gql`
  mutation updatePost($text: String!, $title: String!, $id: Int!) {
    updatePost(text: $text, title: $title, _id: $id) {
      _id
      title
      text
      textSnippet
    }
  }
`;

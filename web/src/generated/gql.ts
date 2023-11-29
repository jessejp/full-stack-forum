/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment PostFragmentFields on Post {\n    _id\n    title\n    points\n    createdAt\n    voteStatus\n    creator {\n      _id\n      username\n    }\n  }\n": types.PostFragmentFieldsFragmentDoc,
    "\n  mutation changePassword($newPassword: String!, $token: String!) {\n    changePassword(newPassword: $newPassword, token: $token) {\n      errors {\n        field\n        message\n      }\n      user {\n        _id\n        email\n        username\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.ChangePasswordDocument,
    "\n  mutation createPost($input: PostInput!) {\n    createPost(input: $input) {\n      _id\n      createdAt\n      points\n      title\n      text\n      creatorId\n    }\n  }\n": types.CreatePostDocument,
    "\n  mutation deletePost($id: Int!) {\n    deletePost(_id: $id)\n  }\n": types.DeletePostDocument,
    "\n  mutation updatePost($text: String!, $title: String!, $id: Int!) {\n    updatePost(text: $text, title: $title, _id: $id) {\n      _id\n      title\n      text\n      textSnippet\n    }\n  }\n": types.UpdatePostDocument,
    "\n  mutation forgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n": types.ForgotPasswordDocument,
    "\n  mutation login($usernameOrEmail: String!, $password: String!) {\n    login(usernameOrEmail: $usernameOrEmail, password: $password) {\n      errors {\n        field\n        message\n      }\n      user {\n        _id\n        username\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  mutation register($options: UserInput!) {\n    register(options: $options) {\n      errors {\n        field\n        message\n      }\n      user {\n        _id\n        createdAt\n        username\n        email\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation vote($value: Int!, $postId: Int!) {\n    vote(value: $value, postId: $postId)\n  }\n": types.VoteDocument,
    "\n  query me {\n    me {\n      _id\n      username\n    }\n  }\n": types.MeDocument,
    "\n  \n  query posts($limit: Int!, $cursor: String) {\n    posts(limit: $limit, cursor: $cursor) {\n      hasMore\n      posts {\n        textSnippet\n        ...PostFragmentFields\n      }\n    }\n  }\n": types.PostsDocument,
    "\n  \n  query readPost($id: Int!) {\n    readPost(_id: $id) {\n      text\n      ...PostFragmentFields\n    }\n  }\n": types.ReadPostDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PostFragmentFields on Post {\n    _id\n    title\n    points\n    createdAt\n    voteStatus\n    creator {\n      _id\n      username\n    }\n  }\n"): (typeof documents)["\n  fragment PostFragmentFields on Post {\n    _id\n    title\n    points\n    createdAt\n    voteStatus\n    creator {\n      _id\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation changePassword($newPassword: String!, $token: String!) {\n    changePassword(newPassword: $newPassword, token: $token) {\n      errors {\n        field\n        message\n      }\n      user {\n        _id\n        email\n        username\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation changePassword($newPassword: String!, $token: String!) {\n    changePassword(newPassword: $newPassword, token: $token) {\n      errors {\n        field\n        message\n      }\n      user {\n        _id\n        email\n        username\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createPost($input: PostInput!) {\n    createPost(input: $input) {\n      _id\n      createdAt\n      points\n      title\n      text\n      creatorId\n    }\n  }\n"): (typeof documents)["\n  mutation createPost($input: PostInput!) {\n    createPost(input: $input) {\n      _id\n      createdAt\n      points\n      title\n      text\n      creatorId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deletePost($id: Int!) {\n    deletePost(_id: $id)\n  }\n"): (typeof documents)["\n  mutation deletePost($id: Int!) {\n    deletePost(_id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updatePost($text: String!, $title: String!, $id: Int!) {\n    updatePost(text: $text, title: $title, _id: $id) {\n      _id\n      title\n      text\n      textSnippet\n    }\n  }\n"): (typeof documents)["\n  mutation updatePost($text: String!, $title: String!, $id: Int!) {\n    updatePost(text: $text, title: $title, _id: $id) {\n      _id\n      title\n      text\n      textSnippet\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation forgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n"): (typeof documents)["\n  mutation forgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login($usernameOrEmail: String!, $password: String!) {\n    login(usernameOrEmail: $usernameOrEmail, password: $password) {\n      errors {\n        field\n        message\n      }\n      user {\n        _id\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation login($usernameOrEmail: String!, $password: String!) {\n    login(usernameOrEmail: $usernameOrEmail, password: $password) {\n      errors {\n        field\n        message\n      }\n      user {\n        _id\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation logout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation register($options: UserInput!) {\n    register(options: $options) {\n      errors {\n        field\n        message\n      }\n      user {\n        _id\n        createdAt\n        username\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation register($options: UserInput!) {\n    register(options: $options) {\n      errors {\n        field\n        message\n      }\n      user {\n        _id\n        createdAt\n        username\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation vote($value: Int!, $postId: Int!) {\n    vote(value: $value, postId: $postId)\n  }\n"): (typeof documents)["\n  mutation vote($value: Int!, $postId: Int!) {\n    vote(value: $value, postId: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query me {\n    me {\n      _id\n      username\n    }\n  }\n"): (typeof documents)["\n  query me {\n    me {\n      _id\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  \n  query posts($limit: Int!, $cursor: String) {\n    posts(limit: $limit, cursor: $cursor) {\n      hasMore\n      posts {\n        textSnippet\n        ...PostFragmentFields\n      }\n    }\n  }\n"): (typeof documents)["\n  \n  query posts($limit: Int!, $cursor: String) {\n    posts(limit: $limit, cursor: $cursor) {\n      hasMore\n      posts {\n        textSnippet\n        ...PostFragmentFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  \n  query readPost($id: Int!) {\n    readPost(_id: $id) {\n      text\n      ...PostFragmentFields\n    }\n  }\n"): (typeof documents)["\n  \n  query readPost($id: Int!) {\n    readPost(_id: $id) {\n      text\n      ...PostFragmentFields\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
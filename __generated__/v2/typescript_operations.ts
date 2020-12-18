import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  posts: Array<Post>;
  comments: Array<Comment>;
  me: User;
  post: Post;
};


export type QueryUsersArgs = {
  query?: Maybe<Scalars['String']>;
};


export type QueryPostsArgs = {
  query?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  age?: Maybe<Scalars['Int']>;
  posts: Array<Post>;
  comments: Array<Comment>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  title: Scalars['String'];
  body: Scalars['String'];
  published: Scalars['Boolean'];
  author: User;
  comments: Array<Comment>;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  text: Scalars['String'];
  author: User;
  post: Post;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  deleteUser: User;
  updateUser: User;
  createPost: Post;
  deletePost: Post;
  updatePost: Post;
  createComment: Comment;
  deleteComment: Comment;
  updateComment: Comment;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  data: UpdateUserInput;
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['ID'];
  data: UpdatePostInput;
};


export type MutationCreateCommentArgs = {
  data: CreateCommentInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateCommentArgs = {
  id: Scalars['ID'];
  data: UpdateCommentInput;
};

export type CreateUserInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  age?: Maybe<Scalars['Int']>;
};

export type UpdateUserInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
};

export type CreatePostInput = {
  title: Scalars['String'];
  body: Scalars['String'];
  published: Scalars['Boolean'];
  author: Scalars['ID'];
};

export type UpdatePostInput = {
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
};

export type CreateCommentInput = {
  text: Scalars['String'];
  author: Scalars['ID'];
  post: Scalars['ID'];
};

export type UpdateCommentInput = {
  text?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  comment: CommentSubscriptionPayload;
  post: PostSubscriptionPayload;
};


export type SubscriptionCommentArgs = {
  postId: Scalars['ID'];
};

export type CommentSubscriptionPayload = {
  __typename?: 'CommentSubscriptionPayload';
  mutation: MutationType;
  data: Comment;
};

export enum MutationType {
  Created = 'CREATED',
  Updated = 'UPDATED',
  Deleted = 'DELETED'
}

export type PostSubscriptionPayload = {
  __typename?: 'PostSubscriptionPayload';
  mutation: MutationType;
  data: Post;
};

export type AddUserMutationVariables = Exact<{
  email: Scalars['String'];
  name: Scalars['String'];
  age?: Maybe<Scalars['Int']>;
}>;


export type AddUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'name' | 'email' | 'age'>
  ) }
);

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'body'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email'>
    ) }
  )> }
);

export type ViewUserQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewUserQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'age'>
  )> }
);


export const AddUserDocument = gql`
    mutation AddUser($email: String!, $name: String!, $age: Int) {
  createUser(data: {email: $email, name: $name, age: $age}) {
    name
    email
    age
  }
}
    `;
export type AddUserMutationFn = Apollo.MutationFunction<AddUserMutation, AddUserMutationVariables>;

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      age: // value for 'age'
 *   },
 * });
 */
export function useAddUserMutation(baseOptions?: Apollo.MutationHookOptions<AddUserMutation, AddUserMutationVariables>) {
        return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument, baseOptions);
      }
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<AddUserMutation, AddUserMutationVariables>;
export const PostsDocument = gql`
    query Posts {
  posts(query: "a") {
    id
    title
    body
    author {
      id
      name
      email
    }
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const ViewUserDocument = gql`
    query ViewUser {
  users(query: "a") {
    id
    name
    email
    age
  }
}
    `;

/**
 * __useViewUserQuery__
 *
 * To run a query within a React component, call `useViewUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewUserQuery(baseOptions?: Apollo.QueryHookOptions<ViewUserQuery, ViewUserQueryVariables>) {
        return Apollo.useQuery<ViewUserQuery, ViewUserQueryVariables>(ViewUserDocument, baseOptions);
      }
export function useViewUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewUserQuery, ViewUserQueryVariables>) {
          return Apollo.useLazyQuery<ViewUserQuery, ViewUserQueryVariables>(ViewUserDocument, baseOptions);
        }
export type ViewUserQueryHookResult = ReturnType<typeof useViewUserQuery>;
export type ViewUserLazyQueryHookResult = ReturnType<typeof useViewUserLazyQuery>;
export type ViewUserQueryResult = Apollo.QueryResult<ViewUserQuery, ViewUserQueryVariables>;
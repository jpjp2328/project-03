import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email:$email, password: $password) {
        token
        user {
            _id
            username
            email
        }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation Mutation($input: UpdateUserInput) {
    updateUser(input: $input) {
      _id
      name
      username
      about
      profilePicture {
        public_id
        url
      }
      createdAt
    }
  }
`

export const CREATE_POST = gql`
  mutation Mutation($input: createPostInput!) {
    createPost(input: $input) {
      _id
      text
      image {
        url
        public_id
      }
      author {
        _id
        username
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation Mutation($postId: String!) {
    deletePost(postId: $postId) {
      _id
    }
  }
`;

// export const UPDATE_POST = gql``;

// export const CREATE_PRODUCT = gql``;

// export const UPDATE_PRODUCT = gql``;

// export const DELETE_PRODUCT = gql``;

// export const ADD_FRIEND = gql``;

// export const REMOVE_FRIEND = gql``;

// export const LIKE_POST = gql``;

// export const UNLIKE_POST = gql``;

// export const CREATE_COMMENT = gql``;

// export const UPDATE_COMMENT = gql``;

// export const DELETE_COMMENT = gql``;




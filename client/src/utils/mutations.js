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

// export const CREATE_POST = gql``;

// export const UPDATE_POST = gql``;

// export const DELETE_POST = gql``;

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




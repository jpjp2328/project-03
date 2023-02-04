import { gql } from '@apollo/client';

export const GET_TAGS = gql`
  query Query {
    tags {
        _id
        name
    }
  }
`;

export const GET_CATEGORIES = gql`
  query Query {
    categories {
        _id
        name
    }
  }
`;

//export const GET_POST = gql`
//`;

export const GET_ALL_POSTS = gql`
  query Query {
      allPosts {
        id
        title
        description
      }
  }
`;

export const GET_PROFILE = gql`
  query Query {
    profile {
      _id
      about
      createdAt
      name
      username
      profilePicture {
        url
        public_id
      }
    }
  }
`;

export const GET_SINGLE_USER = gql`
  query SingleUser($username: String!) {
    singleUser(username: $username) {
      _id
      username
      name
      about
      email
      profilePicture {
        public_id
        url
      }
    }
  }
`

export const GET_ALL_USERS = gql`
  query Query {
    allUsers {
      _id
      about
      name
      email
      username
      profilePicture {
        url
      }
    }
  }
`;

//export const GET_PRODUCTS = gql``;

//export const GET_ALL_PRODUCTS = gql``;

//GET_FRIENDS? or can get them via User

//GET_COMMENTS and GET_LIKES? could get data via Post






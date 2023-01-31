import { gql } from '@apollo/client';

export const GET_TAGS = gql`
  query Query {
    tags {
        _id
        name
    }
  }
`

export const GET_CATEGORIES = gql `
  query Query {
    categories {
        _id
        name
    }
  }
`
export const GET_POST = gql`
`
export const GET_ALL_POSTS = gql`
`
export const GET_PRODUCTS = gql`
`
export const GET_ALL_PRODUCTS = gql`
`
// need 'me' query in schema
export const GET_PROFILE = gql`
`
// update 'user' query in schema
export const GET_USER = gql`
`

//GET_FRIENDS? or can get them via User

//GET_COMMENTS and GET_LIKES? could get data via Post






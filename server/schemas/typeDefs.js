const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    profilePic: String
    friends: [User]
    posts: [Post]
    products: [Product]
  }

  type Post {
    _id: ID!
    text: String!
    image: String
    author: User!
    tags: [Tag]
    likes: [Like]
    likeCount: Int
    comments: [Comment]
    commentCount: Int
    createdAt: String
  }

`
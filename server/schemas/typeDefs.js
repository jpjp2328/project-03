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

  type Product {
    _id: ID!
    name: String!
    description: String
    price: Float
    image: String
    category: Category
    seller: User
    createdAt: String
  }

  type Tag {
    _id: ID!
    name: String!
  }

  type Category {
    _id: ID!
    name: String!
  }

  type Like {
    _id: ID!
    user: User!
  }

  type Comment {
    _id: ID!
    text String!
    author: User!
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(_id: ID!): User
    users: [User]
    post(_id: ID!): Post
    posts: [Post]
    product(_id: ID!): Product
    products: [Product]
    tags: [Tag]
    categories: [Category]
    likes(postId: ID!): [Like]
    comments(postId: ID!): [Comment]
  }
`
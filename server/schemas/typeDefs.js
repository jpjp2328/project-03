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
    id: ID!
    title: String!
    description: String!
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
    text: String!
    author: User!
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  #input types
  input PostInput {
    title: String!
    description: String!
  }

  # Query types
  type Query {
    totalPosts: Int!
    allPosts: [Post]
    me: String!
    profile(_id: ID!): User
    user(_id: ID!): User
    post(_id: ID!): Post
    posts(tag: ID!, name: String): [Post]
    product(_id: ID!): Product
    products(category: ID!, name: String): [Product]
    tags: [Tag]
    categories: [Category]
    likes(postId: ID!): [Like]
    comments(postId: ID!): [Comment]
  }

  # Mutation types
  type Mutation {
    newPost(input: PostInput!): Post!
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createPost(text: String!, image: String, tags: [String]): Post
    updatePost(_id: ID!, text: String, image: String, tags: [String]): Post
    deletePost(_id: ID!): User
    createProduct(name: String!, description: String, price: Float, image: String, category: String): Product
    updateProduct(_id: ID!, name: String, description: String, price: Float, image: String, category: String): Product
    deleteProduct(_id: ID!): User
    addFriend(userId: ID!): User
    removeFriend(userId: ID!): User
    likePost(postID: ID!): Post
    unlikePost(postID: ID!): Post
    createComment(postId: ID!, text: String!): Comment
    updateComment(_id: ID!, text: String): Comment
    deleteComment(_id: ID!): Post
  }
`;

module.exports = typeDefs;
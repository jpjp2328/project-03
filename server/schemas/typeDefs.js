const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar DateTime 

  type User {
    _id: ID!
    username: String
    email: String
    password: String
    name: String
    profilePicture: [Image]
    about: String
    createdAt: DateTime
  }

  type Image {
    url: String
    public_id: String
  }

  type Post {
    _id: ID!
    text: String!
    image: Image
    author: User
    createdAt: DateTime
  }

  type Product {
    _id: ID!
    name: String!
    description: String
    price: Float
    image: String
    category: Category
    seller: User
    createdAt: DateTime
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
    createdAt: DateTime
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

  input ImageInput {
    url: String
    public_id: String
  }

  input UpdateUserInput {
    username: String
    name: String
    profilePicture: [ImageInput]
    about: String
  }

  input createPostInput {
    text: String!
    image: ImageInput
  }

  # Query types
  type Query {
    profile: User!
    singleUser(username: String!): User!
    allUsers: [User!]
    allPosts: [Post]
    postByUser: [Post!]!
    product(_id: ID!): Product
    products(category: ID!, name: String): [Product]
    tags: [Tag]
    categories: [Category]
    likes(postId: ID!): [Like]
    comments(postId: ID!): [Comment]
  }

  # Mutation types
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(input: UpdateUserInput): User!
    createPost(input: createPostInput!): Post!
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
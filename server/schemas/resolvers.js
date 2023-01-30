const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Post, Tag } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id })
                    .populate(['friends', 'posts', 'products']);
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        post: async (parents, args) => {
            return Post.findOne({ _id: args._id })
                .populate(['author', 'tags', 'likes', 'comments']);
        },
        posts: async (parents, { tag, name }) => {
            const params = {};

            if (tag) {
                params.tag = tag;
            }

            if (name) {
                params.name = {
                    $regex: name,
                };
            }

            return Post.find(params)
                .populate(['author', 'tags', 'likes', 'comments']);
        },
        product: async (parent, args) => {
            return Product.findOne({ _id: args._id })
                .populate(['seller', 'category']);
        },
        products: async (parent, { category, name }) => {
            const params = {};

            if (category) {
                params.category = category;
            }

            if (name) {
                params.name = {
                    $regex: name,
                };
            }

            return Product.find(params)
                .populate(['seller', 'category']);
        },
        tags: async () => Tag.find(),
        categories: async () => Category.find(),
        likes: async (parent, args, context) => {
            const post = await Post.findOne({ _id: args.postId });
            return post.likes;
        },
        comments: async (parent, args, context) => {
            const post = await Post.findOne({ _id: args.postId });
            return post.comments;
        },
    },

    Mutations: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user with this email found!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(user);
            return { token, user };
        },
        createPost: async (parent, args, context) => {
            if (context.user) {
                const post = await Post.create({ ...args, author: context.user._id });
                await User.findByIdAndUpdate(
                    context.user._id,
                    { $push: { posts: post._id } },
                    { new: true }
                );
                return post;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        updatePost: async (parent, args, context) => {
            if (context.user) {
                const post = await Post.findByIdAndUpdate(
                    args._id,
                    { $set: { ...args } },
                    { new: true }
                );
                return post;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        deletePost: async (parent, args, context) => {
            if (context.user) {
                await Post.findByIdAndDelete(args._id);
                return User.findByIdAndUpdate(
                    context.user._id,
                    { $pull: { posts:args._id } },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        
    }


}
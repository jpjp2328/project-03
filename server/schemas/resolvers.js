const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Post, Tag } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id })
                .populate(['friends','posts', 'products']);
            }
            throw new AuthenticationError("You need to be logged in!")
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

            return Post.find(params).populate('tag');
        },
        

    },
}
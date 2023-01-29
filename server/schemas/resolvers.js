const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate(['friends','posts', 'products'])
            }
            throw new AuthenticationError("You need to be logged in!")
        },
        posts: async (parents, args, context) => {
            
        }
    },
}
const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Post, Tag } = require('../models');
const { signToken } = require('../utils/auth');

const { posts } = require('../temp')

const resolvers = {
    Query: {
        totalPosts: () => posts.length,
        allPosts: () => posts,
        me: () => 'Jeff',
        profile: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id })
                    .populate(['friends', 'posts', 'products']);
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(args._id);
                if (!user) {
                    throw new Error('User not found!');
                }
                return user;
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

    Mutation: {
        newPost: (parent, args) => {

            console.log(args)
            const post = {
                id: posts.length + 1,
                title: args.input.title,
                description: args.input.description
            }
            posts.push(post)
            return post;
        },
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
                    { $pull: { posts: args._id } },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        createProduct: async (parent, args, context) => {
            if (context.user) {
                let category = await Category.findOne({ name: args.category });
                if (!category) {
                    category = await Category.create({ name: args.category });
                }
                const product = await Product.create({ ...args, seller: context.user._id, category: category._id });
                await User.findByIdAndUpdate(
                    context.user._id,
                    { $push: { products: product._id } },
                    { new: true }
                );
                return product;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        updateProduct: async (parent, args, context) => {
            if (context.user) {
                const product = await Product.findOne({ _id: args._id, seller: context.user._id });
                if (product) {
                    const updatedProduct = await Product.findByIdAndUpdate(
                        args._id,
                        { $set: { ...args } },
                        { new: true }
                    )
                };
                return updatedProduct;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        deleteProduct: async (parent, args, context) => {
            if (context.user) {
                const product = await Product.findByIdAndDelete(args.id);
                await User.findByIdAndUpdate(
                    context.user._id,
                    { $pull: { products: product._id } },
                    { new: true }
                );
                return product;
            }
            throw new AuthenticationError('You need to be logged in!')
        },
        addFriend: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findByIdAndUpdate(
                    context.user._id,
                    { $push: { friends: args.friendId } },
                    { new: true }
                );
                return user;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeFriend: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findByIdAndUpdate(
                    context.user._id,
                    { $pull: { friends: args.friendId } },
                    { new: true }
                );
                return user;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        likePost: async (parent, args, context) => {
            if (context.user) {
                const post = await Post.findByIdAndUpdate(
                    args.postID,
                    { $addToSet: { likes: context.user._id } },
                    { new: true }
                );
                return post;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        unlikePost: async (parent, args, context) => {
            if (context.user) {
                const post = await Post.findByIdAndUpdate(
                    args.postID,
                    { $pull: { likes: context.user._id } },
                    { new: true }
                );
                return post;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        createComment: async (parent, args, context) => {
            if (context.user) {
                const post = await Post.findById(args.postId);
                if (!post) {
                    throw new Error('Post not found!');
                }

                const comment = {
                    text: args.text,
                    author: context.user._id
                };

                post.comments.push(comment);
                const updatedPost = await post.save();

                return updatedPost;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        updateComment: async (parent, args, context) => {
            if (context.user) {
                const post = await Post.findOne({
                    'comments._id': args._id
                });
                if (!post) {
                    throw new Error('Comment not found');
                }

                const comment = post.comments.id(args._id);
                comment.text = args.text;
                const updatedPost = await post.save();

                return updatedPost;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        deleteComment: async (parent, args, context) => {
            if (context.user) {
                const post = await Post.findOne({
                    'comments._id': args._id
                });
                if (!post) {
                    throw new Error('Comment not found');
                }

                const comment = post.comments.id(args._id);
                comment.remove();
                const updatedPost = await post.save();

                return updatedPost;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },
};

module.exports = resolvers;
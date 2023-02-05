const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Post, Tag } = require('../models');
const { signToken } = require('../utils/auth');
const { DateTimeResolver } = require('graphql-scalars')

const { posts } = require('../postData')

const resolvers = {
    Query: {
        profile: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        singleUser: async (parent, args, context) => {
            const user = await User.findOne({ username: args.username });
            if (!user) {
                throw new Error('User not found!');
            }
            return user;
        },
        allUsers: async (parent, args) => {
            return await User.find({})
        },
        totalPosts: async (parent, args) => {
            return await Post.find({}).estimatedDocumentCount();
        },
        allPosts: async (parent, args) => {
            const currentPage = args.page || 1
            const perPage = 6
            return await Post.find({}).skip((currentPage - 1) * perPage).populate('author').limit(perPage).sort({ createdAt: -1 })
        },
        postByUser: async (parent, args, context) => {
            if (context.user) {
                return await Post.find({ author: context.user._id }).populate('author').sort({ createdAt: -1 });
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        singlePost: async (parent, args) => {
            return await Post.findById({ _id: args.postId }).populate('author');
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
        updateUser: async (parent, args, context) => {
            if (context.user) {
                console.log(args)
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { ...args.input },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        createPost: async (parent, args, context) => {
            if (context.user) {
                const newPost = await Post.create({ ...args.input, author: context.user._id });
                const populatedPost = await newPost.populate('author').execPopulate();
                return populatedPost;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        deletePost: async (parent, args, context) => {
            if (context.user) {
                const currentUser = await User.findOne({ _id: context.user._id });
                const postToDelete = await Post.findById({ _id: args.postId });

                if (currentUser._id.toString() !== postToDelete.author._id.toString())
                    throw new Error('Unauthorised');

                let deletedPost = await Post.findByIdAndDelete({ _id: args.postId });
                return deletedPost;
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
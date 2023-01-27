const { Schema, model } = require('mongoose');

const likeSchema = require('./Like');
const commentSchema = require('./Comment');

const postSchema = new Schema(
    {
        text: {
            type: String, required: true,
        },
        image: {
            type: String
        },
        author: {
            type: Schema.Types.ObjectId, ref: 'User', required: true,
        },
        tags: [{
            type: Schema.Types.ObjectId, ref: 'Tag'
        }],
        likes: [likeSchema],
        likeCount: {
            type: Number, 
            default: 0
        },
        comments: [commentSchema],
        commentCount: {
            type: Number,
            default: 0
        },
        createdAt: {
            type: Date, default: Date.now
        }
    }
);

const Post = model('Post', postSchema);

module.exports = Post;


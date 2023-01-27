const { Schema, model } = require('mongoose');

const PostSchema = new Schema(
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
        likes: [{
            type: Schema.Types.ObjectId, ref: 'Like'
        }],
        comments: [{
            type: Schema.Types.ObjectId, ref: 'Comment'
        }],
        createdAt: {
            type: Date, default: Date.now
        }
    }
);

const Post = model('Post', PostSchema);

module.exports = Post;


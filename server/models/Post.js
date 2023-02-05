const { Schema, model } = require('mongoose');

const likeSchema = require('./Like');
const commentSchema = require('./Comment');

const postSchema = new Schema(
    {
        text: {
            type: String, required: true,
        },
        image: {
            url: { 
                type: String,
                default: 'https://www.shareicon.net/data/256x256/2017/07/13/888370_business_512x512.png'
            },
            public_id: {
                type: String,
                default: Date.now
            }
        },
        author: {
            type: Schema.Types.ObjectId, ref: 'User', required: true,
        }
        // tags: [{
        //     type: Schema.Types.ObjectId, ref: 'Tag'
        // }],
        // likes: [likeSchema],
        // likeCount: {
        //     type: Number, 
        //     default: 0
        // },
        // comments: [commentSchema],
        // commentCount: {
        //     type: Number,
        //     default: 0
        // }
    },
    {
        timestamps: true
    }
);

const Post = model('Post', postSchema);

module.exports = Post;


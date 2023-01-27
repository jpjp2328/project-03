const { Schema } = require('mongoose');

const commentSchema = new Schema(
    {
        text: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = commentSchema

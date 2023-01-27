const { Schema } = require('mongoose');

const likeSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
);

module.exports = likeSchema
const { Schema, model } = require('mongoose');

const tagSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
        },
    }
);

const Tag = model('Tag', tagSchema);

module.exports = Tag;
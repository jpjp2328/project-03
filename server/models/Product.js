const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String
        },
        category: {
            type: Schema.Types.ObjectId, ref: 'Category'
        },
        seller: {
            type: Schema.Types.ObjectId, ref: 'User'
        },
        createdAt: {
            type: Date, default: Date.now
        }
    }
);

const Product = model('Product', productSchema);

module.exports = Product;


const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        profilePicture: {
            type: Array,
            default: {
                url:'https://via.placeholder.com/200x200.png?text=Profile',
                public_id: Date.now
            }
        },
        about: {
          type: String  
        }
        // friends: [{
        //     type: Schema.Types.ObjectId, ref: 'User'
        // }],
        // posts: [{
        //     type: Schema.Types.ObjectId, ref: 'Post'
        // }],
        // products: [{
        //     type: Schema.Types.ObjectId, ref: 'Product'
        // }]
    },
    { timestamps: true },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
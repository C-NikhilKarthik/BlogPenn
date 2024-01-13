const mongoose = require('mongoose')
const { emailValidator } = require('../helpers/validators');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: {
            validator: emailValidator,
            message: props => `${props.value} is not a valid email address`,
        },
        required: [true, 'Email is required'],
        unique: true,
    },
    userName: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    FirstName: {
        type: String,
        default: null,
    },
    LastName: {
        type: String,
        default: null,
    },
    DOB: {
        type: Date,
        default: null,
    },
    friends: {
        type: [mongoose.Schema.Types.ObjectId],
        default: null,
    },
    blogs: {
        type: [mongoose.Schema.Types.ObjectId],
        default: null,
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);

        this.password = hash;

        return next();
    } catch (err) {
        return next(err);
    }
});


module.exports = mongoose.model('User', userSchema)
const bcrypt = require('bcrypt');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const env = require('../config/env');


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let user = null;

        user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Wrong password',
            });
        }

        const payload = {
            email: user.email,
            id: user.id
        };

        const token = jwt.sign(payload, env.JWT_SECRET, {
            expiresIn: '5d',
        });
        return res.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (err) {
        next(err);
    }
}

exports.userSignup = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
};
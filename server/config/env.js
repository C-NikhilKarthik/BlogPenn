require('dotenv').config();

const {
    PORT,
    MONGODB_URI,
    JWT_SECRET,
} = process.env;

const config = {
    PORT: 5050,
    MONGODB_URI,
    JWT_SECRET,
};

module.exports = config;

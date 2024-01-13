const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const env = require('./config/env');
const errorHandler = require('./middlewares/errorHandler');

require('./config/database');
const app = express();
const router = require('./router/router');

app.use(cors({
    origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and credentials
    optionsSuccessStatus: 204, // Set the response status for successful preflight requests
}));
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.use('/api', router);

app.use(errorHandler.get404);
app.use(errorHandler.global);

app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
});

process.on('uncaughtException', error => {
    console.log('Uncaught Exception: ', error);
    // process.exit(1)
});

const express = require('express');
const { createServer } = require('http');
const dotENV = require('dotenv');
const logger = require('morgan');
require('colors');

// Mongo Connection
const db = require('./config/db.js');

// Configure dotENV
dotENV.config({ path: './config/config.env' });

const app = express();
const server = createServer(app);

// Establish Mongo Connection
db(server);

// Use HTTPLogger Middleware
app.use(logger('dev'));

// Routes
app.use('/api/auth', require('./routes/auth'));

module.exports = app;
const express = require('express');
const { createServer } = require('http');
const dotENV = require('dotenv');
const logger = require('morgan');

// Mongo Connection
const db = require('./config/db.js');

// Configure dotENV
dotENV.config({ path: './config/config.env' });

const app = express();
const server = createServer(app);

// Remove Console Logs in Production
process.env.NODE_ENV === 'production' && console.log() === function() {};

// Establish Mongo Connection
db(server);

// Use HTTPLogger Middleware
process.env.NODE_ENV === 'development' && app.use(logger('dev'));

// Express Json Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/auth'));

module.exports = app;
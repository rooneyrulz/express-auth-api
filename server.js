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

// Establish Mongo Connection
db(server);

// Use HTTPLogger Middleware
app.use(logger('dev'));

// Express Json Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/auth'));

module.exports = app;
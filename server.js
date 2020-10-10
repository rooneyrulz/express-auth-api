import express from 'express';
import { createServer } from 'http';
import dotENV from 'dotenv';
import logger from 'morgan';
import 'colors';

// Mongo Connection
import db from './config/db.js';

// Configure dotENV
dotENV.config({ path: './config/config.env' });

const app = express();
const server = createServer(app);

// Establish Mongo Connection
db(server);

// Use HTTPLogger Middleware
app.use(logger('dev'));

app.use('/', (req, res, next) => res.send('It works!!'));
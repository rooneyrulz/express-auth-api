import express from 'express';
import { createServer } from 'http';
import dotENV from 'dotenv';
import logger from 'morgan';
import 'colors';

// Configure dotENV
dotENV.config({ path: './config/config.env' });

const app = express();
const server = createServer(app);

// Use HTTPLogger Middleware
app.use(logger('dev'));

app.use('/', (req, res, next) => res.send('It works!!'));

server.listen(process.env.PORT | 5000, () =>
    console.log(`server running on port ${process.env.PORT}!!`.yellow)
);
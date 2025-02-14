import path from 'path';

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({
        path: path.resolve(__dirname, "config", ".env")
    });
}

import express from 'express';
const app = express()
import v1Router from './routes/api/v1';
import { log } from 'console';
import cors from 'cors';
import connectDB from './config/db';
import morgan from 'morgan';

// Use morgan middleware for logging
app.use(morgan('dev'));

app.use(cors({
    origin: [process.env.FRONTEND_LOCAL_HOST, process.env.FRONTEND_DEPLOYMENT_HOST],
    credentials: true,
}));

connectDB()

// setting the Port number
const port = process.env.PORT || 3000

// setting express middlewares
app.use(express.json()); // for parsing the incomming JSON data
app.use(express.static(path.join(__dirname, 'public')));

// setting API router
app.use('/v1', v1Router);

// setting API Live page
app.get('/health', (req, res) => {
    res.status(200).send('OK');
})

app.listen(port, () => {
    console.log(`Product service listening on port ${port}`)
})

export default app;
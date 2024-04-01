import path from 'path';

if (!process.env.NODE_ENV) {
    require('dotenv').config()
}

import express from 'express';
const app = express()
import v1Router from './routes/api/v1';
import cors from 'cors';
import cookieParser from 'cookie-parser';
var cron = require('node-cron');
import { cleanupOrders } from './cron/cleanUnpaidOrders';
import morgan from 'morgan';

// Use morgan middleware for logging
app.use(morgan('dev'));

app.use(cors({
    origin: [process.env.FRONTEND_LOCAL_HOST, process.env.FRONTEND_DEPLOYMENT_HOST],
    credentials: true,
}));

app.use(cookieParser());

require("./models/order")
require("./models/orderItem")

// setting the Port number
const port = process.env.PORT || 3001

// setting express middlewares
app.use(express.json()); // for parsing the incomming JSON data
app.use(express.static(path.join(__dirname, 'public')));

// setting API router
app.use('/v1', v1Router);

// Schedule the cleanup process to run every 5 minutes (adjust as needed)
cron.schedule('*/5 * * * *', () => {
    cleanupOrders();
});

// setting API Live page
app.get('/health', (req, res) => {
    res.status(200).send('OK');
})


app.listen(port, () => {
    console.log(`Order service listening on port ${port}`)
})

export default app;
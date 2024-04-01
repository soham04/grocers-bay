import path from 'path';

if (!process.env.NODE_ENV) {
    require('dotenv').config({
        path: path.resolve(__dirname, 'config', '.env')
    })
}

import express from 'express';
const app = express()
import v1Router from './routes/api/v1';
import cors from 'cors';
import session from 'express-session'
// import passport from './config/passportJS';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

// import sgMail from '@sendgrid/mail';
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// import { sendEmail } from './utils/sendGridEmail';


// Use morgan middleware for logging
app.use(morgan('dev'));


app.use(cors({
    origin: [process.env.FRONTEND_LOCAL_HOST, process.env.FRONTEND_DEPLOYMENT_HOST],
    credentials: true,
}));

// app.use(cors());

app.use(cookieParser());


// require("./models/associations")

// setting the Port number
const port = process.env.PORT || 3002

// setting express middlewares
app.use(express.json()); // for parsing the incomming JSON data
app.use(express.static(path.join(__dirname, 'public')));

// setting API router
app.use('/v1', v1Router);

// setting API Live page
app.get('/health', (req, res) => {
    res.status(200).send('OK');
})

console.log(process.env.POSTGRES_HOST);


app.listen(port, () => {
    console.log(`User service listening on port ${port}`)
})

export default app;
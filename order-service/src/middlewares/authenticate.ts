import { NextFunction, Request, Response, response } from 'express';
import axios from 'axios';
// import { glogger } from '../../src/config/winston';
import { log } from 'winston';
import { error } from 'console';

// Define a custom interface to extend the Request object
export interface CustomRequest extends Request {
    userId?: string; // Define the userId property as optional
    verify?: boolean; // Define the userId property as optional
}

export async function verifyToken(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.token // req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Login to place order"
            })
        }

        const verificationResponse = await axios.post(`http://${process.env.USER_CLUSTERIP_SERVICE_HOST}:${process.env.USER_CLUSTERIP_SERVICE_PORT}/v1/verify/token`, { token });

        console.log(verificationResponse);



        console.log("hi");

        if (verificationResponse.status != 200) {
            return res.status(verificationResponse.status).json(verificationResponse.data)
        }

        req.userId = verificationResponse.data.data.id;
        req.verify = verificationResponse.data.data.verify;

        next()

    }
    catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Internal server Error.' });
    }
}
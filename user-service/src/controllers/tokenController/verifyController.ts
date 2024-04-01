import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { CustomerInput, Customer } from '../../models/customer';

interface DecodedToken {
    userId: string;
    email: string;
    role: string;
}

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.body.token; // Get the token from the request body
        if (!token) {
            // If token is not provided, send unauthorized response
            return res.status(401).json({
                status: false,
                errors: [{
                    message: 'Authorization token is missing.',
                    code: 'TOKEN_MISSING'
                }]
            });
        }

        // Verify JWT token
        const secretKey = process.env.JWT_KEY;
        const decodedToken = jwt.verify(token, secretKey) as DecodedToken;

        // Check if the user exists in the database
        const userId = decodedToken.userId;
        let user: CustomerInput;
        if (decodedToken.role === "customer") {
            user = await Customer.findByPk(userId);
        }

        if (!user) {
            return res.status(401).json({
                status: false,
                errors: [{
                    message: 'User not found.',
                    code: 'USER_NOT_FOUND'
                }]
            });
        }

        res.status(200).json({
            status: true,
            data: {
                id: userId,
                verify: user.verify
            }
        });

    } catch (error) {
        console.log("Erorr here : ", error);

        if (error instanceof JsonWebTokenError) {
            res.status(401).json({
                status: false,
                errors: [
                    {
                        message: 'Your session has expired. Please sign in again.',
                        code: 'SESSION_EXPIRED'
                    }
                ]
            });
        } else {
            console.error(error);

            res.status(500).json({ message: 'Internal server Error.' });
        }
    }
}


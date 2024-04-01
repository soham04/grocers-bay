// AuthController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Customer } from '../../models/customer'; // Import your User model from your database

// Function to verify JWT token and retrieve user details
export const verifyTokenAndGetUserDetails = async (req: Request, res: Response) => {


    try {
        // Get the token from the cookie
        const token = req.cookies.token;

        // console.log(req.headers);
        

        if (!token) {
            // If token is not provided, return unauthorized status
            res.clearCookie('token')
            return res.status(401).json({ isLoggedIn: false });
        }

        // Verify the token
        const decoded: any = jwt.verify(token, process.env.JWT_KEY!);

        // Fetch user details from the database using the user ID
        const user = await Customer.findByPk(decoded.userId);

        if (!user) {
            // If user is not found, return unauthorized status
            res.clearCookie('token')
            return res.status(401).json({ isLoggedIn: false });
        }

        // Return user details and isLoggedIn status
        return res.status(200).json({ isLoggedIn: true, user });
    } catch (error) {
        // If token is invalid or expired, return unauthorized status
        res.clearCookie('token')
        return res.status(401).json({ isLoggedIn: false });
    }
};

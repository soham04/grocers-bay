import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: { userId: string };
}

export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction) => {
    // Get the token from cookies

    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_KEY!) as { userId: string };

        // Add the user ID to the request object
        req.user = { userId: decoded.userId };

        next(); // Move to the next middleware
    } catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

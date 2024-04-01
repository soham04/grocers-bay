import { Request, Response } from 'express';

export const logout = (req: Request, res: Response) => {
    try {
        // Clear the token from cookies or any other storage mechanism
        res.clearCookie('token'); // If using cookies for authentication

        // Optionally, perform additional cleanup or logging out logic

        // Respond with success message
        res.status(200).json({ message: 'Successfully signed out' });
    } catch (error) {
        console.error('Error signing out:', error);
        res.status(500).json({ message: 'Failed to sign out' });
    }
};

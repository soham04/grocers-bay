import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Customer } from '../../../models/customer';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    console.log(email);

    console.log(password);
    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Check if the user exists
        const user = await Customer.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log(user);
        

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: "customer" },
            process.env.JWT_KEY!,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        const expTime = 1000 * 60 * 60

        // Respond with the token
        if (process.env.NODE_ENV) {
            res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true });
        } else {
            res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: false });
        }

        res.status(200).json({ token, expTime });

        // Update lastSignInTime
        await user.update({ lastSignInTime: new Date() });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

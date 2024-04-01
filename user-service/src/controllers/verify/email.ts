import { Request, Response } from 'express';
import { Customer } from '../../models/customer';

export const verifyEmail = async (req: Request, res: Response) => {
    const { uid, otp } = req.params;

    try {
        // Check if the customer with the provided UID exists
        const customer = await Customer.findOne({ where: { id: uid } });

        // If customer not found, return error
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // If OTP does not match, return error
        if (customer.OTP !== otp) {
            return res.status(400).json({ message: 'Invalid Link' });
        }

        // Update customer's verification status
        await Customer.update({ verify: true, OTP: null }, { where: { id: uid } });

        // Respond with success message
        return res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error('Error verifying email:', error);
        return res.status(500).json({ message: 'Failed to verify email' });
    }
};

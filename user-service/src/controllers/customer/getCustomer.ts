import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Customer } from '../../models/customer';
import { authenticateUser, AuthRequest } from '../middlewares/checkAuth';

// Controller to get customer details
export const getCustomerDetails = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const customerId: string = req.user.userId;

        // Fetch customer details from the database using the customer ID
        const customer = await Customer.findByPk(customerId);

        if (!customer) {
            res.status(404).json({ message: 'Customer not found' });
            return
        }

        // Send customer details in the response
        res.status(200).json(customer);
    } catch (error) {
        console.error('Error getting customer details:', error);
        res.status(500).json({ message: 'Failed to get customer details' });
    }
};

// ordersController.ts

import { Request, Response, response } from 'express';
import axios from 'axios';
import Order from '../../../src/models/order';
import OrderItem from '../../../src/models/orderItem';
import sequelize from '../../../src/config/db';
import { log } from 'console';

// Define a custom interface to extend the Request object
interface CustomRequest extends Request {
    userId?: string; // Define the userId property as optional
    verify?: boolean; // Define the userId property as optional
}

export async function createOrder(req: CustomRequest, res: Response) {
    try {
        // Extract cart and token from the request headers
        const cart = req.body;

        // Log the received cart for debugging purposes
        console.log('Received Cart:', cart);

        const userId = req.userId
        const isVerified = req.verify;

        if (!isVerified) {
            // If user is not verified, send unauthorized response
            return res.status(401).json({
                status: false,
                message: 'User is not authorized to create an order. Please verify your account first.'
            });
        }

        console.log(userId);

        console.log("till here ");

        const numbers = await getTotal(cart)

        const transaction = await sequelize.transaction();
        try {
            // Step 1: Create the order
            const order = await Order.create({
                user_id: userId,
                subtotal: numbers.subtotal,
                taxPercent: numbers.taxPercent,
                tax: numbers.tax,
                total: numbers.total,
            }, { transaction });

            console.log("till here ");
            console.log(cart);


            // Step 2: Create order items for each cart item
            const orderItemsPromises = cart.map(async (cartItem: { id: string; quantity: number; }) => {
                return OrderItem.create({
                    order_id: order.id,
                    product_id: cartItem.id,
                    quantity: cartItem.quantity,
                }, { transaction });
            });

            // Execute all order items creation in parallel
            await Promise.all(orderItemsPromises);

            // Commit the transaction if everything is successful
            await transaction.commit();

            // Respond to the frontend
            res.status(200).json({
                status: true,
                orderId: order.id
            });
        } catch (error) {
            // Handle errors during order creation
            // glogger.error('Error creating order:', error);
            await transaction.rollback(); // Rollback the transaction in case of an error
            res.status(500).json({ error: 'Internal server error' });
        }


    } catch (error) {
        console.error('Error creating order:', error);
        // glogger.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


async function getTotal(cart: [{ id: number, quantity: number }]) {

    try {
        const productApiUrl = `http://${process.env.PRODUCT_CLUSTERIP_SERVICE_HOST}:${process.env.PRODUCT_CLUSTERIP_SERVICE_PORT}/v1/cart/total`;

        const response = await axios.post(productApiUrl, cart)

        return response.data.message

    } catch (error) {
        // Handle errors (e.g., network issues, API errors)
        console.error('Error fetching total:', error);
        throw new Error('Unable to fetch total');
    }
}
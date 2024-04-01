import { Request, Response } from 'express';
import axios from 'axios';
import Order from '../../../src/models/order';
import OrderItem from '../../../src/models/orderItem';
import sequelize from '../../../src/config/db';
import { log } from 'winston';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// console.log(process.env.STRIPE_SECRET_KEY);

export const stripeWebHook = async (req: Request, res: Response) => {

    // console.log(req.headers);

    const sig = req.headers['stripe-signature'];

    // console.log(sig);


    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_ENDPOINT_SECRET);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const orderId = event.data.metadata.orderId
            const paymentIntentSucceeded = event.data.object;
            const payment_id = paymentIntentSucceeded.id
            const payment_done = true

            try {
                const order = await Order.findByPk(orderId);
                if (order) {
                    // Update payment ID for the order
                    await order.update({ payment_id, payment_done });
                    console.log(`Payment ID ${payment_id} added to order ${orderId}`);
                } else {
                    console.log(`Order with ID ${orderId} not found.`);
                }
            } catch (error) {
                console.error(`Error updating payment ID for order ${orderId}: ${error}`);
                res.status(500).send('Internal Server Error');
                return;
            }

            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send();
}
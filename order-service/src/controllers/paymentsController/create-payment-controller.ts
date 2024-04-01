import { Request, Response } from "express";
import Stripe from "stripe";
import Order from "../../../src/models/order";

// type PaymentRequest = {
//     customerId: string;
//     amount: number;
//     currency: string;
//     paymentMethodType: string;
//     ordernumber: string;
// };

export async function createPayment(req: Request, res: Response) {
    try {
        const { orderId } = req.body

        const order = await Order.findByPk(orderId)

        const amount = 50// order.total;
        const currency = 'usd'
        // const customerId = "xyz"
        // const paymentMethodType = "card"

        if (!process.env.STRIPE_SECRET_KEY) {
            return res.status(500).json({ message: "Please add Stripe API key" });
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            // apiVersion: '2023-08-16',
            typescript: true,
        });

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            // automatic_payment_methods: { enabled: true },
            // customer: customerId,
            // automatic_payment_methods: true,
            payment_method_types: ['card'],
            metadata: {
                "orderId": orderId
            },
        });

        const payment_id = paymentIntent.id

        console.log("Payment Id : ", payment_id);


        res.status(200).json({ client_secret: paymentIntent.client_secret });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

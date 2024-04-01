import { NextFunction, Request, Response } from "express";
import ProductModel, { ProductDocument } from "../../models/product"; // Import the Product model
import { glogger } from "../../../src/config/winston";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cart: { id: string; quantity: number }[] = req.body;
        glogger.info('Received request with cart:', cart);
        const taxPercent = 8.5

        let subTotal = 0;

        for (const item of cart) {
            glogger.info(`Processing item with ID: ${item.id}`);

            const product: ProductDocument | null = await ProductModel.findById(item.id);

            if (!product) {
                glogger.warn(`Product with ID ${item.id} not found.`);
                return res.status(404).json({
                    status: false,
                    message: `Product with ID ${item.id} not found.`,
                });
            }

            glogger.info(`Product price: ${product.price}, Quantity: ${item.quantity}`);

            subTotal += product.price * item.quantity; // Parse price to float if it's a string
        }

        glogger.info('Calculation completed. Sending response with total:', subTotal);

        const tax = (taxPercent * subTotal) / 100


        return res.status(200).json({
            status: true,
            message: {
                subtotal: subTotal,
                taxPercent: taxPercent,
                tax: tax,
                total: tax + subTotal
            }
        });
    } catch (err) {
        console.error(err);
        glogger.error('Error processing request:', err);
        res.status(500).json({
            status: false,
            message: 'Internal server error',
        });
    }
};

import { NextFunction, Request, Response } from "express";
import ProductModel, { ProductDocument } from "../../models/product"; // Import the Product model
import { glogger } from "../../config/winston";
import mongoose from "mongoose";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            glogger.warn(`Invalid product ID format: ${id}`);
            return res.status(400).json({
                status: false,
                message: 'Invalid product ID format',
            });
        }

        glogger.info(`Fetching product with ID: ${id}`);

        const product: ProductDocument | null = await ProductModel.findById(id)

        console.log(product);

        if (!product) {
            glogger.warn(`Product with ID ${id} not found.`);
            return res.status(404).json({
                status: false,
                message: 'Product not found',
            });
        }

        glogger.info(`Fetched product with ID: ${id}`);

        res.status(200).json({
            status: true,
            content: product,
        });
    } catch (err) {
        console.error(err);
        glogger.error('Error fetching product:', err);
        res.status(500).json({
            status: false,
            message: 'Internal server error',
        });
    }
};

import { NextFunction, Request, Response } from "express";
import ProductModel, { ProductDocument } from "../../models/product"; // Import the Product model
import { glogger } from "../../../src/config/winston";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 30;
        const skip = (page - 1) * limit;

        const products: ProductDocument[] = await ProductModel.find({})
            .skip(skip)
            .limit(limit);

        const count = await ProductModel.countDocuments();

        glogger.info(`Fetched ${products.length} products out of ${count}.`);

        const totalPages = Math.ceil(count / limit);

        res.status(200).json({
            status: true,
            content: {
                meta: {
                    total: count,
                    pages: totalPages,
                    page,
                },
                data: products,
            },
        });
    } catch (err) {
        console.error(err);
        glogger.error('Error fetching products:', err);
        res.status(500).json({
            status: false,
            message: 'Internal server error',
        });
    }
};

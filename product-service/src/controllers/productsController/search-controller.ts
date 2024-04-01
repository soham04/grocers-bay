import { NextFunction, Request, Response } from "express";
import ProductModel, { ProductDocument } from "../../models/product"; // Import the Product model
import { glogger } from "../../../src/config/winston";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchTerm = req.query.searchTerm as string; // Extract the search query from the query parameters
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 30;
        const skip = (page - 1) * limit;

        glogger.info(`Searching product with term: ${searchTerm}`);

        // Construct a regex pattern for case-insensitive search
        const regexPattern = new RegExp(searchTerm, 'i');

        const count = await ProductModel.countDocuments({
            $or: [
                { title: regexPattern }, // Case-insensitive search by product name
                { short_description: regexPattern }, // Case-insensitive search by product description
                { long_description: regexPattern } // Case-insensitive search by product description

            ]
        });

        const products: ProductDocument[] = await ProductModel.find({
            $or: [
                { title: regexPattern },
                { description: regexPattern }
            ]
        })
            .skip(skip)
            .limit(limit);

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
        glogger.error('Error searching product:', err);
        res.status(500).json({
            status: false,
            message: 'Internal server error',
        });
    }
};

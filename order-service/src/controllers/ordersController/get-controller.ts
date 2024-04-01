import { NextFunction, Request, Response } from "express";
import Order from "../../models/order";
import { CustomRequest } from "../../../src/middlewares/authenticate";

export async function getOrder(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id; // Accessing the id parameter from the URL
        console.log(id);
        

        // Now you can use the id variable to perform actions in your route handler
        const order = await Order.findOne({
            where: { id: id },
            include: [/* Include any associations you need here */],
            // attributes: ['id', 'title', 'image_path', 'description', 'sku', 'category_id', 'price']
        });

        if (!order) {
            return res.status(404).json({
                status: false,
                message: 'Order not found',
            });
        }

        res.status(200).json({
            status: true,
            content: order,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'Internal server error',
        });
    }
}

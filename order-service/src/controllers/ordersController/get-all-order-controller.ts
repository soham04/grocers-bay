import { NextFunction, Request, Response } from "express";
import Order from "../../models/order";
import { CustomRequest } from "../../../src/middlewares/authenticate";

export async function getAllOrders(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;
        const userId = req.userId;

        // console.log(userId);


        const { count, rows } = await Order.findAndCountAll({
            where: { user_id: userId },
            limit,
            offset,
            // include: [/* Include any associations you need here */],
            attributes: ['id'] // Adjust attributes accordingly
        });

        // console.log(rows);
        

        const totalPages = Math.ceil(count / limit);

        res.status(200).json({
            status: true,
            content: {
                meta: {
                    total: count,
                    pages: totalPages,
                    page,
                },
                data: rows,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'Internal server error',
        });
    }
};

// orderCleanup.js

import Order from "../../src/models/order";
import OrderItem from "../../src/models/orderItem";
import { Op } from "sequelize";
import moment from 'moment';


export async function cleanupOrders() {
    try {
        // Find orders where the condition is not met within 5 minutes
        const ordersToDelete = await Order.findAll({
            where: {
                payment_done: false,
                created_at: {
                    [Op.lt]: moment().subtract(5, 'minutes').toDate(), // Find orders created more than 5 minutes ago
                },
            },
        });

        // Delete associated order items for each order
        for (const order of ordersToDelete) {
            // Find associated order items
            const orderItems = await OrderItem.findAll({
                where: {
                    order_id: order.id,
                },
            });

            // Delete each associated order item
            for (const orderItem of orderItems) {
                await orderItem.destroy();
                console.log(`Order item ${orderItem.id} deleted`);
            }

            // Finally, delete the order itself
            await order.destroy();
            console.log(`Order ${order.id} deleted`);
        }
    } catch (error) {
        console.error('Error cleaning up orders:', error);
    }
}


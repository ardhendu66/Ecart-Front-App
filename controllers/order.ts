import type { NextApiRequest, NextApiResponse } from "next";
import OrderModel from "@/lib/Order";

// Get all Orders
export const getOrders = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { userId } = req.query;
        const orders = await OrderModel.find({userId: userId as string}).populate("products.productId");
        console.log("Orders: ", orders);        

        return orders ?
            res.status(200).json(orders) :
            res.status(400).json({ message: "No Orders found"});
    }
    catch(err: any) {
        console.error(err.message);
        return res.status(500).json({ message: "Orders fetching failed"});      
    }
}

// Create a Order
export const createOrder = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { userId, products, failed, amount_paid } = req.body;

        const order = await OrderModel.create({
            userId, products, failed, amount_paid,
        });

        return order ?
            res.status(201).json({ message: "Order created successfully ☘️"}) :
            res.status(400).json({ message: "Order not created"});
    }
    catch(err: any) {
        console.error(err.message);
        return res.status(500).json({ message: "Order creation failed"});      
    }
}

// Cancel a Order
export const cancelOrder = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { orderId } = req.query;

        const order = await OrderModel.findByIdAndUpdate({ orderId }, {
            $set: {
                failed: true,
            } 
        });

        return order ?
            res.status(200).json({ message: "Order cancelled successfully ☘️"}) :
            res.status(400).json({ message: "Either Order not found or not cancelled"});
    }
    catch(err: any) {
        console.error(err.message);
        return res.status(500).json({ message: "Order cancellation failed"});      
    }
}
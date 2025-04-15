import type { NextApiRequest, NextApiResponse } from "next";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import OrderModel from "@/lib/Order";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    try {
        if(req.method === "DELETE") {
            const { orderId } = req.query;

            const order = await OrderModel.findByIdAndDelete(orderId);
            console.log(order);            

            if(order) {
                res.status(200).json({
                    message: "Order deleted successfully",
                })
            }
            
            res.status(400).json({
                message: "Order not found",
            })
        } 

        res.status(405).json({
            message: "Method not allowed",
        })
    }
    catch(err: any) {
        return res.status(500).json(err.message);
    }
}
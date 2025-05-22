import type { NextApiRequest, NextApiResponse } from "next";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import { getOrders, createOrder, cancelOrder } from "@/controllers/order";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();

    if (req.method === "GET") {
        return getOrders(req, res);
    }
    else if (req.method === "POST") {
        return createOrder(req, res);
    } 
    else if (req.method === "PUT") {
        return cancelOrder(req, res);
    }
    console.log("Operation failed");

    return res.status(405).json({message: "Method not allowed"});
}
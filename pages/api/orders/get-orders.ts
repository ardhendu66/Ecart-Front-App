import OrderModel from "@/lib/Order";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import type { NextApiRequest } from "next";
import { NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    if (req.method === "GET") {
        try {
            const { userId } = req.query;
            const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 });
            return res.status(200).json({message: "Orders found", orders});
        }
        catch(err) {
            console.error(err);            
            return res.status(400).json({message: "Orders not found"});
        }
    }

    return res.status(405).json({message: "Method not allowed"});
}
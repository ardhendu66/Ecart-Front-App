import CartModel from "@/lib/Cart";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();

    if(req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { userId } = req.query;

        const existingCart = await CartModel.findOne({ userId });

        if(!existingCart) {
            return res.status(404).json({message: "User doesnot have a cart"});
        }

        return res.status(200).json(existingCart.products);
    }
    catch(err: any) {
        return res.status(500).json({message: "Error getting products from cart"});
    }
}
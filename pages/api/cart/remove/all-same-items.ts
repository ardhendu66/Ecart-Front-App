import type { NextApiRequest, NextApiResponse } from "next";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import CartModel from "@/lib/Cart";
import { Types } from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();

    if(req.method !== "DELETE") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { userId, productId } = req.query;
    
        const existingCart = await CartModel.findOne({ userId });
    
        if(!existingCart) {
            return res.status(404).json({message: "User doesnot have a cart"});
        }

        const updatedCart = await CartModel.findOneAndUpdate({userId}, {
            $pull: {
                products: productId
            }
        })

        if(updatedCart) {
            return res.status(202).json({message: "Item removed from cart"});
        }

        return res.status(400).json({message: "Cart not updated successfully"});
    }
    catch(err: any) {
        console.error(err);       
        return res.status(500).json({message: "Item not removed to Cart"});
    }  
}
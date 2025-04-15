import type { NextApiRequest, NextApiResponse } from "next";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import CartModel from "@/lib/Cart";

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

        const index = existingCart.products.findIndex(
            (id: string) => id.toString() === productId
        );

        if(index !== -1) {
            existingCart.products.splice(index, 1);
            const updatedCart = await existingCart.save();
            if(updatedCart) {   
                return res.status(202).json({message: "Item removed from cart"});
            }

            return res.status(400).json({message: "Item not removed from cart"});
        }

        return res.status(400).json({message: "Item not removed to cart"});
    }
    catch(err: any) {
        return res.status(500).json({message: "Item not removed to Cart"});
    }  
}
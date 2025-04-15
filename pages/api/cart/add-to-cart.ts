import type { NextApiRequest, NextApiResponse } from "next";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import CartModel from "@/lib/Cart";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();

    if(req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { userId, productId } = req.query;
    
        const existingCart = await CartModel.findOne({ userId });
    
        if(!existingCart) {
            const newCart = await CartModel.create({
                userId,
                products: [productId]
            })

            if(newCart) {
                return res.status(201).json({message: "Item added to cart"});
            }
    
            return res.status(400).json({message: "Item not added to cart"});
        }

        existingCart.products.push(productId);

        const updatedCart = await existingCart.save();

        if(updatedCart) {
            return res.status(200).json({message: "Item added to cart"});
        }

        return res.status(400).json({message: "Item not added to cart"});
    }
    catch(err: any) {
        return res.status(500).json({message: "Item not added to Cart"});
    }  
}
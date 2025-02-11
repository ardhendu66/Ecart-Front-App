import { NextApiRequest, NextApiResponse } from "next";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import Product from "@/lib/Product";

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    if(request.method === "GET") {
        try {
            if(request.query.id) {
                const products = await Product.find({category: request.query.id as string})
                    .populate('category');

                if(products) {
                    return res.status(200).json({products: products}); 
                }
                return res.status(205).json({message: "Products not found"}); 
            }

            const products = await Product.find({}, null, {sort: {updatedAt: -1}})
                .populate('category');

            if(products) {
                return res.status(200).json({products: products}); 
            }
            return res.status(205).json({message: "Products not found"}); 
        }
        catch(err: any) {
            console.error(err);            
            return res.status(500).json({message: err.message});
        }
    }
}
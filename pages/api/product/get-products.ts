import { NextApiRequest, NextApiResponse } from "next";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import Product from "@/lib/Product";

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    if(request.method === "GET") {
        try {
            const products = await Product.find({}, null, {sort: {updatedAt: -1}});
            return res.status(200).json({products: products});
        }
        catch(err: any) {
            console.error(err);            
            return res.status(500).json({message: err.message});
        }
    }
}
import { NextApiRequest, NextApiResponse } from "next";
import Product from "@/lib/Product";
import { ConnectionWithMongoose } from "@/lib/mongoose";

ConnectionWithMongoose();

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
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
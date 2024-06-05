import { NextApiRequest, NextApiResponse } from "next";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import Product from "@/lib/Product";

ConnectionWithMongoose();

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
    if(request.method === "GET") {
        try {
            const featuredId = '6633d11d4dc5a3f9c4eac9c9'
            const product = await Product.findById(featuredId);
            return res.status(200).json({product: product});
        }
        catch(err: any) {
            console.error(err);            
            return res.status(500).json({message: err.message});
        }
    }
}
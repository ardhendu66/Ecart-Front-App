import { NextApiRequest, NextApiResponse } from "next";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import Product from "@/lib/Product";

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    if(request.method === "GET" && request.query.id) {
        try {
            const product = await Product.findById(request.query.id).populate([{
                path: 'Category',
                strictPopulate: false,
            }])
            return res.status(200).json({product});
        }
        catch(err: any) {
            console.error(err);            
            return res.status(500).json(err.message);
        }
    }
}
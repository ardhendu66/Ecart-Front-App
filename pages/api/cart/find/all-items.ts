import { NextApiRequest, NextApiResponse } from "next";
import Product from "@/lib/Product";
import { ConnectionWithMongoose } from "@/lib/mongoose";

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    if(request.method === "POST") {
        try {
            const { ids } = request.body;
            const products = await Product.find({_id: {$in: ids}});
            res.status(200).json(products);
        }
        catch(err: any) {
            return res.status(500).json({message: err.message})
        }
    }
}
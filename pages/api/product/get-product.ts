import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import Product from "@/lib/Product";

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    if(request.method === "GET" && request.query.id) {
        try {
            const findWithId = new mongoose.Types.ObjectId(request.query.id as string);
            const product = await Product.findById(findWithId);
            return res.status(200).json({product});
        }
        catch(err: any) {
            console.error(err);            
            return res.status(200).json(err.message);
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
    maxDuration: 30,
}
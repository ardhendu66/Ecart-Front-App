import { NextApiRequest, NextApiResponse } from "next";
import Product from "@/lib/Product";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import { Types } from "mongoose";

ConnectionWithMongoose()
.then(() => {})

export default async function(request: NextApiRequest, res: NextApiResponse) {
    if(request.method === "POST") {
        try {
            const { ids } = request.body;
            const products = await Product.find({_id: {$in: ids}});
            console.log(products);
            res.status(200).json(products);
        }
        catch(err: any) {
            return res.status(500).json({message: err.message})
        }
    }
}
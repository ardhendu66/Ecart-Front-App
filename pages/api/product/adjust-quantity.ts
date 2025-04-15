import { NextApiRequest, NextApiResponse } from "next";
import Product from "@/lib/Product";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import { countObject } from "@/config/functions";

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    if(request.method === "POST") {
        try {
            const { ids }: {ids: string[]} = request.body;
            const object: Object = countObject(ids);
            Object.entries(object).map(async ([key, value]: [string, number]) => {
                await Product.findByIdAndUpdate({_id: key}, {
                    $inc: { amount: -value }
                })
            })
            return res.status(200).json({message: "Product_amount maintained 🙂"})
            // return res.status(202).json({message: "Amount maintainability failed 🙂"})
        }
        catch(err: any) {
            console.error(err);
            return res.status(200).json("Amount maintainability failed 🙂")
        }
    }
}
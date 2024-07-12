import { NextApiRequest, NextApiResponse } from "next";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import CategoryModel from "@/lib/Category";

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    if(request.method === "GET") {
        try {
            const categories = await CategoryModel.find();
            const array: any[] = [];
            categories.map(c => {
                if(!c.parent) {
                    array.push(c);
                }
            })
            return res.status(200).json(array);
        }
        catch(err: any) {
            return res.status(500).json({message: err.message});           
        }
    }
}
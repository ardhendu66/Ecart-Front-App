import { NextApiRequest, NextApiResponse } from "next";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import CategoryModel from "@/lib/Category";

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    if(request.method === "GET") {
        try {
            const categories = await CategoryModel.find();
            if(categories) {
                return res.status(200).json({
                    categories, 
                    message: "Categories found successfully"
                });
            }
            return res.status(205).json({message: "Categories not found"});
        }
        catch(err: any) {
            return res.status(500).json({message: err.message});           
        }
    }
}
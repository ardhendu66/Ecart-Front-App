import { NextApiRequest, NextApiResponse } from "next";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import Product from "@/lib/Product";

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();

    const { name } = request.query;
    // const decodedName = decodeURI(name as string);
    if(request.method === "GET" && name) {
        try {
            const product = await Product.findOne({name: (name as string).replaceAll('%20', ' ')}).populate([{
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
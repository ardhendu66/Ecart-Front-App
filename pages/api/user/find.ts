import type { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/lib/User";
import { ConnectionWithMongoose } from "@/lib/mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await ConnectionWithMongoose();

        if (req.method === "GET") {
            if(req.query.id) {
                const { id } = req.query;
                const user = await UserModel.findById(id).select("-password");
                // console.log(user);
                if(!user) {
                    return res.status(400).json({message: "User don't exist"});
                }
                return res.status(200).json(user);
            }
            else if(req.query.userId) {
                const { userId } = req.query;
                const user = await UserModel.findById(userId).select("-password");
                if(!user) {
                    return res.status(400).json({message: "User don't exist"});
                }
                return res.status(200).json(user);
            }
        }

        return res.status(405).json({message: 'Method not allowed'});
    } catch (err: any) {
        console.error(err.message);
        return res.status(500).json({message: err.message});
    }
}
import type { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/lib/User";
import { ConnectionWithMongoose } from "@/lib/mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await ConnectionWithMongoose();
        if (req.method === "GET" && req.query.id) {
            const user = await UserModel.findById(req.query.id);

            if(!user) {
                return res.status(400).json({message: "User not exist"});
            }

            return res.status(200).json(user.address);
        }
    } catch (err: any) {
        console.error(err.message);
        return res.status(500).json(err.message);
    }
}
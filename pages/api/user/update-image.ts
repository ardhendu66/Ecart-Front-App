import type { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/lib/User";
import { ConnectionWithMongoose } from "@/lib/mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await ConnectionWithMongoose();
        if (req.method === "PUT") {
            const { email, url } = req.body;

            const user = await UserModel.findOneAndUpdate({email}, {
                $set: { image: url }
            })
            if(user) {
                return res.status(202).json({ 
                    message: "Profile-Picture updated successfully" 
                });
            }

            return res.status(400).json({ message: "User doesn't exist" });
        }

        return res.status(400).json({message: "Something went wrong while creating address"});
    } catch (err: any) {
        console.error(err.message);
        return res.status(500).json(err.message);
    }
}
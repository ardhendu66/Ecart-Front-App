import type { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/lib/User";
import { ConnectionWithMongoose } from "@/lib/mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await ConnectionWithMongoose();
        if (req.method === "PUT") {
            const { id, field } = req.body;

            const user = await UserModel.findByIdAndUpdate(id, {
                $set: {
                    [field]: req.body[field]
                }
            });

            if(!user) {
                return res.status(400).json({message: "User not exist"});
            }

            return res.status(202).json({message: `${field} updated successfully`});
        }

        return res.status(400).json({message: `update operation failed`});
    } catch (err: any) {
        console.error(err.message);
        return res.status(500).json({message: err.message});
    }
}
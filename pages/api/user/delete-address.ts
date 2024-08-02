import type { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/lib/User";
import { ConnectionWithMongoose } from "@/lib/mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await ConnectionWithMongoose();
        if (req.method === "DELETE" && req.query.aid && req.query.uid) {
            const { aid, uid } = req.query;
            console.log(req.query.aid, req.query.uid);
            
            const user = await UserModel.findOne({
                "address._id": aid, _id: uid
            });

            if(!user) {
                return res.status(400).json({message: "Address not found"});
            }

            const deletedUser = await UserModel.findByIdAndUpdate(uid, {
                $unset: {
                    address: 1
                }
            })

            if(deletedUser) {
                return res.status(202).json({message: "Address deleted successfully"});
            }

            return res.status(400).json({message: "Address not found"});
        }
    } catch (err: any) {
        console.error(err.message);
        return res.status(500).json(err.message);
    }
}
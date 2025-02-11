import type { NextApiRequest, NextApiResponse } from "next";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import UserModel from "@/lib/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    try {
        const { userId, date } = req.query;
        const cur_hr = new Date().getHours();
        const past_hr = new Date(date as string).getHours();
        if(Math.abs(cur_hr - past_hr) <= 4) {
            const user = await UserModel.findByIdAndUpdate(userId, {
                $set: {
                    emailVerified: true
                }
            })
            if(user) {
                return res.status(200).json({message: "Email updated successfully"});
            }
            return res.status(400).json({
                message: "Email updation failed due to technical error"
            });
        }

        return res.status(400).json({message: "Verification process expired."})
    }
    catch(err: any) {
        console.error("Email not updated code with 500");
        return res.status(500).json("Email not updated code with 500");
    }
}
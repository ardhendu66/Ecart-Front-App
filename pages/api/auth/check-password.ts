import bcrypt from "bcryptjs";
import UserModel from "@/lib/User";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();

    if(req.method === 'POST') {
        try {
            const { userId, password } = req.body;
    
            if(!userId || !password) {
                throw new Error('password or userid is empty');
            }

            const existingUser = await UserModel.findById(userId);

            if(!existingUser) {
                return res.status(400).json({message: "User not found"});
            }

            const checkPassword = await bcrypt.compare(
                password as string, existingUser.password
            );

            if(checkPassword) {
                return res.status(200).json({message: "password matched"});
            }

            return res.status(400).json({message: "password matching failed"});
        }
        catch(err) {
            return res.status(500).json({message: "password matching failed"});
        }
    }

    return res.status(405).json({message: "Method not allowed"});
}
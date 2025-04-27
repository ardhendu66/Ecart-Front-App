import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import UserModel from "@/lib/User";
import { ConnectionWithMongoose } from "@/lib/mongoose";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();

    if (req.method === 'PUT') {
        try {
            const { userId, password } = req.body;

            if (!userId || !password) {
                res.status(400).json({ message: "password or userid is empty" });
                throw new Error('password or userid is empty');
            }

            const existingUser = await UserModel.findById(userId);

            if (!existingUser) {
                return res.status(400).json({ message: "User not found" });
            }

            const hashedPassword = await bcrypt.hash(password as string, 10);
            existingUser.password = hashedPassword;
            const updatedPassword = await existingUser.save();

            if(updatedPassword) {
                return res.status(202).json({ message: "Password changed successfully" });
            }

            return res.status(400).json({ 
                message: "Password not changed. Something went wrong" 
            });
        } 
        catch (err) {
            return res.status(500).json({ message: "Error changing password" });
        }
    }

    return res.status(405).json({ message: "Method not allowed" });
}
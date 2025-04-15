import type { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/lib/User";
import { ConnectionWithMongoose } from "@/lib/mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();

    if(req.method === 'DELETE') {
        try {
            const { userId }= req.query;

            const existingUser = await UserModel.findById(userId as string);
            console.log(existingUser);
        
            if(existingUser) {
                const deletedUser = await UserModel.deleteOne({_id: userId});
                
                if(deletedUser) {
                    return res.status(202).json({message: "User deleted successfully"});
                }
                
                return res.status(400).json({message: "User deletion failed"});
            }

            return res.status(404).json({message: "User not found"});
        }
        catch(err) {
            return res.status(500).json({message: "User deletion failed"});
        }
    }

    return res.status(405).json({message: "Method not allowed"});
}
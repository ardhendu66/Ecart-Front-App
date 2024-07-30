import type { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/lib/User";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    try {
        const { name, email, password, phoneNo } = req.body;
        if([name, email, password, phoneNo].some((f: string) => f?.trim() === "")) {
            return res.status(400).json({message: "All fields are required"});
        }
        
        const existedUser = await UserModel.findOne({email});
        if(existedUser) {
            return res.status(409).json({message: "User exists with this email id"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ 
            name, email, password: hashedPassword, phoneNo
        });
        if(!user) {
            return res.status(500).json({message: "Process during User-Registration failed"});
        }

        return res.status(201).json({message: "User created successfully"});
    }
    catch(err: any) {
        console.error(err.message);
        return res.status(500).json({message: err.message});
    }
}
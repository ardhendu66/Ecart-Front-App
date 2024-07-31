import type { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/lib/User";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import bcrypt from "bcryptjs";
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    try {
        const { name, email, password, phoneNo } = req.body;
        // const indexes = await UserModel.collection.indexes();
        // await UserModel.collection.dropIndex('username_1');     
        // console.log(indexes);   

        if([name, email, password, phoneNo].some((f: string) => f?.trim() === "")) {
            return res.status(400).json({message: "All fields are required"});
        }
        
        const existedUser = await UserModel.findOne({email});
        if(existedUser) {
            return res.status(409).json({message: "User exists with this email id"});
        }

        if(!passwordRegex.test(password)) {
            return res.status(405).json({
                message: "Password should contain minimum eight characters with at least one Capital letter, one small letter, one number and one special character"
            });
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
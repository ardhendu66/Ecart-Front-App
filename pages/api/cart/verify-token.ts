import type { NextApiRequest, NextApiResponse } from "next";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import jwt from "jsonwebtoken";
import { envVariables } from "@/config/config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    try {
        if(req.method === "POST") {
            const { token } = req.body;
            console.log(token);            
            
            if(!token) {
                console.log("Token not found: ", token);                
                return res.status(400).json({message: "Encoded_Token not found"});
            }

            const decodedToken = jwt.verify(token, envVariables.jwtSecret);
            if(!decodedToken) {
                return res.status(400).json({message: "Decoded_Token not found"});
            }

            //@ts-ignore
            if(decodedToken?.success === true) {
                return res.status(200).json({message: "Payment success", success: true});
            }
        }

        return res.status(405).json({message: "Method not allowed"});
    }
    catch(err: any) {
        return res.status(500).json(err.message);
    }
}
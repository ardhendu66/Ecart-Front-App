import type { NextApiRequest, NextApiResponse } from "next";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import jwt from "jsonwebtoken";
import { envVariables } from "@/config/config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    const { userId, token } = req.body;
    try {
        if(req.method === "POST") {
            console.log(token);            
            
            if(!token) {
                console.log("Token not found: ", token);               
                return res.status(400).json({message: "Please send a token for validation"});
            }

            const decodedToken = jwt.verify(token, envVariables.jwtSecret);
            console.log("DecodedToken: ", decodedToken);            

            if(!decodedToken) {
                //@ts-ignore
                if(decodedToken.userId !== userId) {
                    return res.status(400).json({
                        message: "User validation failed",
                        success: false,
                    })
                }

                return res.status(400).json({
                    message: "Invalid Token found while decoding", 
                    success: false
                });
            }

            //@ts-ignore
            if(decodedToken?.success === true && decodedToken?.userId === userId) {
                return res.status(200).json({
                    message: "Payment success",
                    success: true,
                    //@ts-ignore
                    orderId: decodedToken?.orderId
                });
            }
        }

        return res.status(405).json({message: "Method not allowed"});
    }
    catch(err) {
        const decodedToken = jwt.verify(token, envVariables.jwtSecret);
        return res.status(500).json({
            message: "Payment failed",
            success: false,
            //@ts-ignore
            orderId: decodedToken?.orderId
        });
    }
}
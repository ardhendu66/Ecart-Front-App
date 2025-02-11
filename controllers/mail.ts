import { NextApiRequest, NextApiResponse } from "next";
import { sendEmailThroughNodemailer } from "@/utils/mailer";
import { encodeData } from "@/utils/encode_decode";
import UserModel from "@/lib/User";

export async function mailerAction(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId, email, name } = req.query;
        const object: Object = {
            userId,
            email,
            name,
            date: new Date().toISOString()
        }
        const user = await UserModel.findByIdAndUpdate(userId, {
            $set: {
                verifyToken: new Date().toISOString()
            }
        })
        const response = await sendEmailThroughNodemailer(
            encodeData(object, "Token"), 
            email as string, name as string
        );
        if(response.accepted) {
            return res.status(200).json({message: "Email has been sent"});
        }
        else if(response.rejected) {
            return res.status(400).json({message: "Email-Transportation rejected"});
        }
        
        return res.status(400).json({
            message: "Error occurred during transmission of mail 😕"
        })
    }
    catch(err) {
        console.error("Transport of Email failed: ", err);
        return res.status(500).json({message: "Email-Transportation cancelled"})
    }
}
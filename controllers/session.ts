import type { NextApiRequest, NextApiResponse } from "next";
import SessionModel from "@/lib/PaymentSession";    

// find a valid session of payment
export const findSession = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed", valid: false });
    }

    try {
        const { userId } = req.query;

        const existingSession = await SessionModel.findOne({ userId });

        if(existingSession) {
            return res.status(200).json({message: "Valid Session found"});
        }

        return res.status(400).json({message: "Invalid Session"});
    } 
    catch(err: any) {
        console.error(err.message);
        return res.status(500).json({ message: "Valid session not found" });
    }
}

// create payment session
export const createSession = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { userId, walletId, price, mode, products } = req.body;

        const session = await SessionModel.create({
            userId, walletId, price, mode, products,
        });

        return session ?
            res.status(201).json({ message: "Payment-Session created."}) :
            res.status(400).json({ message: "Session not created"});
    }
    catch(err: any) {
        console.error(err.message);
        return res.status(500).json({ message: "Session creation failed"});      
    }
}
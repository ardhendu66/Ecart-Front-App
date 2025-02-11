import type { NextApiRequest, NextApiResponse } from "next";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import { createWalletPaymentSession, getWalletPaymentSession } from "@/controllers/wallet";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();

    if(req.method === "GET") {
        const paymentSession = getWalletPaymentSession(req, res);
        if(paymentSession) {
            return paymentSession;
        }
        return res.status(500).json({message: "Payment Session Invalid"});
    }
    else if(req.method === "POST") {
        const paymentSession = createWalletPaymentSession(req, res);
        if(paymentSession) {
            return paymentSession;
        }
        return res.status(500).json({message: "Payment Session creation failed"});
    }

    return res.status(405).json({message: "Method not allowed"});
}
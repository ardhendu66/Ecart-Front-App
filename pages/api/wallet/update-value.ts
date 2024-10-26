import type { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import WalletModel from "@/lib/Wallet";
import { ConnectionWithMongoose } from "@/lib/mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    try {
        if (req.method === "PUT") {
            const { userId, amount } = req.query;
            
            const wallet = await WalletModel.findOneAndUpdate({userId}, {
                $inc: { balance: Number(amount) },
                $push: { 
                    debit_credit: {
                        amount: Number(amount), 
                        type: "credit"
                    }
                }
            })

            if(wallet) {
                return res.status(200).json({message: "Wallet updated suceesfully"});
            }

            return res.status(400).json({message: "Wallet neither found nor updated"});
        }

        return res.status(405).json({ message: "Method not allowed" });
    } 
    catch(err) {
        console.error("wallet updation : ", err);
        return res.status(500).json({
            message: "Wallet updation after payment failed with 500 error-code" 
        });
    }
}
import type { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import WalletModel from "@/lib/Wallet";
import { ConnectionWithMongoose } from "@/lib/mongoose";

export default async function(req: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    if(req.method === "POST") {
        try {
            const wallet = new WalletModel({
                balance: 10, 
                debit_credit: [{amount: 10, type: "credit"}],
                isActive: true,
                userId: "66aa1d4e9e2355b77260513f"
            });
            await wallet.save();
            return res.status(201).json({message: "Wallet created successfully"});
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({message: "Wallet creation failed"});            
        }
    }

    return res.status(405).json({message: "Method not allowed"});
}
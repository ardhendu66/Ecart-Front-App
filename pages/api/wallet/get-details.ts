import type { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import WalletModel from "@/lib/Wallet";
import { ConnectionWithMongoose } from "@/lib/mongoose";

export default async function(req: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    if(req.method === "GET") {
        try {
            const { userId } = req.query;
            const wallet = await WalletModel.findOne({userId})
            return res.status(200).json({wallet, message: "Wallets have been found"});
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({message: "Wallet details not found"});            
        }
    }

    return res.status(405).json({message: "Method not allowed"});
}
import type { NextApiRequest, NextApiResponse } from "next";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import { 
    createUserWallet, 
    getUserWalletInfo, 
    addBalanceToWallet,
    deductBalanceFromWallet, 
} from "@/controllers/wallet";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();

    if(req.method === "GET") {
        return getUserWalletInfo(req, res);
    }
    else if(req.method === "POST") {
        return createUserWallet(req, res);
    }
    else if(req.method === "PUT") {
        if(req.query.type === "add") {
            return addBalanceToWallet(req, res);
        }
        else if(req.query.type === "deduct") {
            return deductBalanceFromWallet(req, res);
        }
        return res.status(200).json({message: "Wallet updation failed"});
    }
    console.log({message: "Wallet Operation failed."});    

    return res.status(405).json({message: "Method not allowed"});
}
import type { NextApiRequest, NextApiResponse } from "next";
import WalletModel from "@/lib/Wallet";
import WalletPaymentModel from "@/lib/WalletPayment";

interface RequestBody {
    userId: string,
    totalPrice: number,
    sessionId: string,
}

// Wallet details Operation
export async function getUserWalletInfo(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId } = req.query;
        const wallet = await WalletModel.findOne({userId});
        return res.status(200).json({wallet, message: "Wallets have been found"});
    }
    catch(err: any) {
        console.log("wallet info not found. Error-1");
        return res.status(500).json({message: "Wallet details not found"});            
    }
}

export async function createUserWallet(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId } = req.query;
        const wallet = new WalletModel({
            balance: 10, 
            debit_credit: [{amount: 10, type: "credit"}],
            isActive: true,
            userId
        });
        await wallet.save();
        return res.status(201).json({message: "Wallet created successfully"});
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({message: "Wallet creation failed"});            
    }
}

export async function addBalanceToWallet(req: NextApiRequest, res: NextApiResponse) {
    try {
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
    catch(err) {
        console.error("wallet updation : ", err);
        return res.status(500).json({
            message: "Wallet updation after payment failed with 500 error-code" 
        });
    }
}

export async function deductBalanceFromWallet(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId, amount } = req.query;

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            return res.status(400).json({ message: "Invalid amount provided" });
        }

        const wallet = await WalletModel.findOneAndUpdate({ userId }, {
            $inc: { balance: -Number(amount) },
            $push: {
                debit_credit: {
                    amount: Number(amount),
                    type: "debit",
                },
            },
        });

        if (wallet) {
            return res.status(200).json({ message: "Wallet updated successfully" });
        }

        return res.status(400).json({ message: "Wallet neither found nor updated" });
    } 
    catch(err) {
        console.error("wallet updation: ", err);
        return res.status(500).json({
            message: "Wallet updation after payment failed with 500 error-code",
        });
    }
}


// Wallet Payment Operation
export async function getWalletPaymentSession(req: NextApiRequest, res: NextApiResponse) {
    try {
        
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Payment Session not valid.Error-Code: 500" });
    }
}

export async function createWalletPaymentSession(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId, totalPrice, sessionId }: RequestBody = req.body;

        const paymentSession = await WalletPaymentModel.findOne({ userId, sessionId });

        if(paymentSession) {
            return res.status(400).json({ message: "Invalid Session", sessionId });
        }

        const paymentSessionV2 = await WalletPaymentModel.create({
            sessionId,
            userId,
            mode: "wallet",
            totalPrice,
            paymentCount: 0,
        })

        if(paymentSessionV2) {
            return res.status(201).json({message: "Payment Session created successfully."});
        }

        return res.status(400).json({message: "Payment Session expired."});
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({message: "Payment through wallet failed.ErrorCode:500"})
    }
}
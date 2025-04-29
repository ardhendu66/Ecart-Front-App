import type { NextApiRequest, NextApiResponse } from "next";
import WalletModel from "@/lib/Wallet";


// Find Wallet details
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

// Create Wallet for user
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

// Add balance to Wallet
export async function addBalanceToWallet(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId, amount } = req.query;

        if(Number(amount) <= 0) {
            return res.status(400).json({ message: "Amount should be greater than zero" });
        }

        if(Number(amount) > 100000) {
            return res.status(400).json({ message: "Amount should be less than 1,00,000" });
        }

        const existingWallet = await WalletModel.findOne({userId});

        if (!existingWallet) {
            return res.status(404).json({ message: "Wallet not found" });
        }

        if(existingWallet.balance + Number(amount) > 10000000) {
            return res.status(400).json({ 
                message: "Wallet balance should be less than 1,00,00,000" 
            });
        }
        
        const wallet = await WalletModel.findOneAndUpdate({userId}, {
            $inc: { 
                balance: Number(amount) 
            },
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

        return res.status(400).json({message: "Either Wallet not found or not updated"});
    } 
    catch(err) {
        console.error("wallet updation : ", err);
        return res.status(500).json({
            message: "Wallet updation after payment failed with 500 error-code" 
        });
    }
}

// Deduct balance from Wallet
export async function deductBalanceFromWallet(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId, amount } = req.query;

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            return res.status(400).json({ message: "Invalid amount provided" });
        }

        const existingWallet = await WalletModel.findOne({userId});

        if (!existingWallet) {
            return res.status(404).json({ message: "Wallet not found" });
        }

        if (existingWallet.balance < Number(amount)) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const wallet = await WalletModel.findOneAndUpdate({ userId }, {
            $inc: { 
                balance: -Number(amount) 
            },
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

        return res.status(400).json({ message: "Either Wallet not found or not being updated" });
    } 
    catch(err) {
        console.error("wallet updation: ", err);
        return res.status(500).json({
            message: "Wallet updation after payment failed with 500 error-code",
        });
    }
}
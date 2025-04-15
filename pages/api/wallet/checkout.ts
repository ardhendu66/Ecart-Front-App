import type { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import WalletModel from "@/lib/Wallet";
import { Stripe } from "stripe";
import { envVariables } from "@/config/config";
import { ConnectionWithMongoose } from "@/lib/mongoose";

const stripe = new Stripe(envVariables.stripeSecrectKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    try {
        if (req.method === "POST") {
            const { userId, price } = req.query;

            const parsedPrice = Number(price);
            if (isNaN(parsedPrice) || parsedPrice <= 0) {
                return res.status(400).json({ message: "Invalid price value." });
            }

            const paymentIntent = await stripe.paymentIntents.create({
                amount: parsedPrice * 100,
                currency: envVariables.currency,
                payment_method_types: ['card'],
            });

            return res.status(200).json({
                clientSecret: paymentIntent.client_secret,
            });
        }

        return res.status(405).json({ message: "Method not allowed" });
    } catch (err) {
        console.error("Error creating payment intent:", err);
        return res.status(500).json({ message: "payment failed with 500 error-code" });
    }
}
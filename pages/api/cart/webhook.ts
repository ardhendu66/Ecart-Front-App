import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import { Stripe } from "stripe";
import { envVariables } from "@/config/config";
const stripe = new Stripe(envVariables.stripeSecrectKey);

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    const sig = request.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(
            await buffer(request), 
            sig!, 
            envVariables.stripeWebhookSecret
        )
    }
    catch(err: any) {
        res.status(400).json(`Webhook-Error: ${err.message}`);
    }

    switch(event?.type) {
        case 'payment_intent.succeeded': {
            const paymentIntentSucceeded = event.data.object;
            console.log("Payment_Intent: ", paymentIntentSucceeded);
            break;
        }
        default: {
            console.log(`Unhandled event type ${event?.type}`);
            break;
        }
    }

    return res.status(200).json("Stripe_Webhook");
}

export const config = {
    api: {
        bodyParser: false,
    }
}

// jolly-defeat-swift-relent
// acct_1PQZquBYgnBIWi4V
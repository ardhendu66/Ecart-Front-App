import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import { Stripe } from "stripe";
import { envVariables } from "@/config/config";
const stripe = new Stripe(envVariables.stripeSecrectKey);

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
    const signature = request.headers['stripe-signature'];
    const buf = await buffer(request);
    let event: Stripe.Event;
    event = stripe.webhooks.constructEvent(
        buf.toString(),
        signature as string,
        envVariables.stripeWebhookSecret
    )
    console.log("event_object", event);
    switch(event?.type) {
        case 'payment_intent.succeeded': {
            const paymentIntentSucceeded = event.data.object;
            console.log("Payment_Intent: ", paymentIntentSucceeded);
            if(request.method === "POST") {
                return res.status(200).json({event: paymentIntentSucceeded});
            }
            break;
        }
        default: {
            console.log(`Unhandled event type ${event?.type}`);
            if(request.method === "POST") {
                return res.status(200).json({event: event.type});
            }
            break;
        }
    }
}

// jolly-defeat-swift-relent
// acct_1PQZquBYgnBIWi4V

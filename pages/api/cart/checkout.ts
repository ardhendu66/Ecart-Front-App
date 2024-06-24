import { NextApiRequest, NextApiResponse } from "next";
import Product from "@/lib/Product";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import Order from "@/lib/Order";
import { envVariables } from "@/config/config";
import { CartResponseBody } from "@/config/types";
import { Stripe } from "stripe";
import { countObject } from "@/config/functions";
const stripe = new Stripe(envVariables.stripeSecrectKey);

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    if(request.method === "POST") {
        try {
            const { 
                name, phoneNumber, email, city, pinCode, streetAddress, products
            }: CartResponseBody = request.body;
            const uniqueIds = Array.from(new Set(products));
            const idsWithFrequency: Object = countObject(products);
            const productInfos = await Product.find({_id: { $in: uniqueIds }});

            var items: any = [], orderedItems: any = [];
            Object.entries(idsWithFrequency).map(([key, value]) => {
                const pro = productInfos.find(p => p._id.toString() === key);
                items.push({
                    quantity: value,
                    price_data: {
                        currency: envVariables.currency,
                        product_data: {
                            name: pro.name,
                        },
                        unit_amount: pro.price*100
                    }
                })
                orderedItems.push({
                    quantity: value,
                    price_data: {
                        currency: envVariables.currency,
                        product_data: {
                            name: pro.name,
                        },
                        unit_amount: pro.price*value
                    }
                })
            })

            const orderDoc = await Order.create({
                items: orderedItems, name, phoneNumber, email, city, pinCode, streetAddress, paid: false,
            })

            const session = await stripe.checkout.sessions.create({
                line_items: items,
                mode: "payment",
                customer_email: email,
                currency: envVariables.currency,
                success_url: `${envVariables.domainUrl}/cart?action=success`,
                cancel_url: `${envVariables.domainUrl}/cart?action=cancelled`,
                metadata: { 
                    orderId: orderDoc._id.toString() 
                },
            })

            return res.status(200).json({ url: session.url! })
        }
        catch(err: any) {
            return res.status(200).json(err.message);
        }
    }
}
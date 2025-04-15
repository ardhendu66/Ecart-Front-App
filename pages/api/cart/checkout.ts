import { NextApiRequest, NextApiResponse } from "next";
import Product from "@/lib/Product";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import { envVariables } from "@/config/config";
import { Stripe } from "stripe";
import { countObject } from "@/config/functions";
import OrderModel from "@/lib/Order";
const stripe = new Stripe(envVariables.stripeSecrectKey);

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
    await ConnectionWithMongoose();
    try {
        if(request.method === "POST") {
            const { userId, email, products, subTotal } = request.body;
            
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

            const order = await OrderModel.create({
                userId, products, failed: false, amount_paid: subTotal
            })
            const session = await stripe.checkout.sessions.create({
                line_items: items,
                mode: "payment",
                customer_email: email,
                currency: envVariables.currency,
                success_url: `${envVariables.domainUrl}/cart/payment-verification?orderId=${order._id}&userId=${userId}`,
                cancel_url: `${envVariables.domainUrl}/cart/payment-failed?orderId=${order._id}&userId=${userId}`,
                metadata: {
                    _id: products[0]
                },
            })

            return res.status(200).json({ url: session.url!, orderId: order._id });
        }

        return res.status(405).json({message: "Method not allowed"});
    }
    catch(err: any) {
        return res.status(500).json(err.message);
    }
}
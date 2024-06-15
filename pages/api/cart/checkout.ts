import { NextApiRequest, NextApiResponse } from "next";
import Product from "@/lib/Product";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import Order from "@/lib/Order";
import { envVariables } from "@/config/config";
import { ResponseBody } from "@/components/Cart/Cartorder";
import { Stripe } from "stripe";
const stripe = new Stripe(envVariables.stripeSecrectKey);

ConnectionWithMongoose().then(() => {})

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
    if(request.method === "POST") {
        try {
            const { 
                name, phoneNumber, email, city, pinCode, streetAddress, products, subTotal
            }: ResponseBody = request.body;
            const uniqueIds = Array.from(new Set(products));
            const productInfos = await Product.find({_id: {$in: uniqueIds}});
        
            var items = [];
            for(const productId of uniqueIds) {
                const productInfo = productInfos.find(p => p._id.toString() === productId);
                const quantity = products.filter((id: string) => id === productId)?.length || 0;
                if(quantity > 0 && productInfo) {
                    items.push({
                        quantity,
                        price_data: {
                            currency: "INR",
                            product_data: {
                                name: productInfo.name,
                            },
                            // unit_amount: Number(quantity * productInfo.price),
                            unit_amount: subTotal * 100,
                        }
                    })
                }
            }

            const orderDoc = await Order.create({
                items, name, phoneNumber, email, city, pinCode, streetAddress, paid: false,
            })

            const session = await stripe.checkout.sessions.create({
                line_items: items,
                mode: "payment",
                customer_email: email,
                currency: "inr",
                success_url: `${envVariables.domainUrl}/cart?action=success`,
                cancel_url: `${envVariables.domainUrl}/cart?action=cancelled`,
                metadata: { 
                    orderId: orderDoc._id.toString() 
                },
            })

            return res.status(200).json({ url: session.url, receipt: session.return_url })
        }
        catch(err: any) {
            return res.status(200).json({message: err.message});
        }
    }
}
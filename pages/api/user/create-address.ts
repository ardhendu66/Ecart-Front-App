import type { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/lib/User";
import { ConnectionWithMongoose } from "@/lib/mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await ConnectionWithMongoose();
        if (req.method === "POST") {
            const { 
                id, name, pincode, address, locality, city, houseNo, landmark, state 
            } = req.body;
            console.log('Request body:', req.body);
            
            if (
                [id, name, pincode, address, locality, city, landmark, state]
                .some(f => !f || f.trim() === "")
            ) {
                throw new Error("Fill all the details carefully");
            }

            const existedUser = await UserModel.findById(id);
            if (!existedUser) {
                throw new Error("User doesn't exist. Please Register.");
            }

            const userAddress = {
                name, 
                pincode,
                address, 
                locality, 
                city_district_town: city, 
                houseNo, 
                landmark, 
                state
            };
            console.log('User address to be updated:', userAddress);

            const updatedUser = await UserModel.findByIdAndUpdate(id, {
                $set: {
                    address: userAddress
                }
            }, { new: true });

            if (updatedUser) {
                return res.status(201).json({ message: "Address saved successfully" });
            }

            return res.status(400).json({ message: "User doesn't exist" });
        }

        return res.status(400).json({message: "Something went wrong while creating address"});
    } catch (err: any) {
        console.error(err.message);
        return res.status(500).json(err.message);
    }
}

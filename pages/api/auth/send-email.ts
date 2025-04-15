import { mailerAction } from "@/controllers/mail";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        return mailerAction(req, res);
    }

    return res.status(405).json({message: "Method not allowed"});
}
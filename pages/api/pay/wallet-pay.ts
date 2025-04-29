import type { NextApiRequest, NextApiResponse } from "next";
import { findSession, createSession } from "@/controllers/session";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "GET") {
        return findSession(req, res);
    }
    else if(req.method === "POST") {
        return createSession(req, res);
    }
}
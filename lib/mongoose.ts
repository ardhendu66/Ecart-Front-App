import mongoose from "mongoose"
import { envVariables } from "@/config/config"

export const ConnectionWithMongoose = async () => {
    try {
        const response = await mongoose.connect(envVariables.mongodbUrl)
        if(response) {
            console.log('Database connected 😊');         
        }
        else {
            throw new Error("Database Connection error");
        }
    }
    catch(err: any) {
        console.error(err.message);
        throw new Error("Database Connection error");
    }
}
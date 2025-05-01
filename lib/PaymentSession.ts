import { Schema, model, models, Document, Types } from "mongoose";

interface PaymentSession extends Document {
    userId?: Types.ObjectId,
    walletId?: Types.ObjectId,
    price: number,
    mode: string,
    products: Types.ObjectId[],
    expireAt: Date,
}

const paymentSessionSchema: Schema<PaymentSession> = new Schema<PaymentSession>({
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    walletId: {
        type: Types.ObjectId,
        ref: "Wallet",
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 800000,
    },
    mode: {
        type: String,
        required: true,
        enum: ["wallet", "card"],
    },
    products: {
        type: [Types.ObjectId],
        ref: "Product",
        required: true,
    },
    expireAt: {
        type: Date,
        default: () => new Date(Date.now() + 4 * 60 * 1000), // 4 minutes from now
        expires: 0 // TTL index kicks in at the time in expireAt
    }
}, {
    timestamps: true,
});

const SessionModel = models?.PaymentSession || model('PaymentSession', paymentSessionSchema);

export default SessionModel;
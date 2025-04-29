import { Schema, model, models, Document, Types } from "mongoose";

interface PaymentSession extends Document {
    userId?: Types.ObjectId,
    walletId?: Types.ObjectId,
    price: number,
    mode: string,
    products: Types.ObjectId[],
    createdAt: Date,
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
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600, // Auto-delete after 600 seconds (10 minutes)
    }
}, {
    timestamps: true,
});

const SessionModel = models?.PaymentSession || model('PaymentSession', paymentSessionSchema);

export default SessionModel;
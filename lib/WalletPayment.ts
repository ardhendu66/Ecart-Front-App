import { Schema, models, model, Types, Document } from "mongoose";

interface WalletPayment extends Document {
    sessionId: string,
    userId?: string,
    mode: string,
    totalPrice: number,
    paymentCount: number,
}

const walletPaymentSchema: Schema<WalletPayment> = new Schema<WalletPayment>({
    sessionId: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    mode: {
        type: String,
        required: true,
        default: "wallet"
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentCount: {
        type: Number,
        required: true,
        default: 0,
    }
}, {
    timestamps: true,
});

const WalletPaymentModel = models?.WalletPayment || model('WalletPayment', walletPaymentSchema);

export default WalletPaymentModel;
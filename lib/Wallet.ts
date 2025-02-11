import { Schema, model, models, Document, Types } from "mongoose";

interface DebitCreditClass extends Document {
    amount: number,
    type: string,
}

const debitCreditSchema: Schema<DebitCreditClass> = new Schema<DebitCreditClass>({
    amount: {
        type: Number,
        required: true,
        default: 0,
    },
    type: {
        type: String,
        required: true,
        enum: ["credit", "debit"],
    }
}, {
    timestamps: true,
    _id: false,
});

interface WalletClass extends Document {
    balance: number,
    debit_credit?: DebitCreditClass[],
    isActive: boolean,
    userId?: Types.ObjectId,
}

const walletSchema: Schema<WalletClass> = new Schema<WalletClass>({
    balance: {
        type: Number,
        default: 10,
        validate: {
            validator: (value: number) => value >= 0 && value <= 600000,
            message: ({value}) => `${value} must be between 0 and 600,000`,
        },
    },
    debit_credit: {
        type: [debitCreditSchema],
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: Types.ObjectId,
        ref: "User",
        unique: true,
    },
}, {
    timestamps: true,
});

const WalletModel = models?.Wallet || model('Wallet', walletSchema);

export default WalletModel;
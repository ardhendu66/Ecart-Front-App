import { Schema, Document, models, model, Types } from "mongoose";

interface Order extends Document {
    userId?: Types.ObjectId,
    products?: Types.ObjectId[],
    failed: boolean,
    amount_paid: number,
}

const orderSchema: Schema<Order> = new Schema<Order>({
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [{
        type: Types.ObjectId,
        ref: "Product",
        required: true,
    }],
    failed: {
        type: Boolean,
        required: true,
    },
    amount_paid: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
})

const OrderModel = models?.Order || model('Order', orderSchema);

export default OrderModel;
import { Schema, Document, models, model, Types } from "mongoose";

interface OrderedProducts extends Document {
    productId?: Types.ObjectId,
    quantity: number,
    purchasedPrice: number,
}

interface Order extends Document {
    userId?: Types.ObjectId,
    products: OrderedProducts[],
    failed: boolean,
    amount_paid: number,
}

const orderedProductsSchema: Schema<OrderedProducts> = new Schema<OrderedProducts>({
    productId: {
        type: Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    purchasedPrice: {
        type: Number,
        required: true,
    }
}, {
    _id: false,
    timestamps: false,
});

const orderSchema: Schema<Order> = new Schema<Order>({
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: {
        type: [orderedProductsSchema],
        required: true,
    },
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
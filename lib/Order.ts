import { Schema, Document, models, model, Types } from "mongoose";

interface Order extends Document {
    name: string,
    phoneNo: string,
    email: string,
    city_district_town: string,
    pinCode: string,
    address: string,
    paid: boolean,
    userId?: Types.ObjectId,
    products?: Types.ObjectId[],
}

const orderSchema: Schema<Order> = new Schema<Order>({
    name: {
        type: String,
    },
    phoneNo: {
        type: String,
    },
    email: {
        type: String,
    },
    city_district_town: {
        type: String,
    },
    pinCode: {
        type: String,
    },
    address: {
        type: String,
    },
    paid: {
        type: Boolean,
    },
    userId: {
        type: Types.ObjectId,
    },
    products: [{
        type: Types.ObjectId,
    }],
}, {
    timestamps: true,
})

const Order = models?.Order || model('Order', orderSchema);

export default Order;
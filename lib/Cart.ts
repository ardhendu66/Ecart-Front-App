import { Schema, model, models, Document, Types } from "mongoose";

interface CartItemClass extends Document {
    userId?: string,
    products?: string[],
}

const cartItemSchema: Schema<CartItemClass> = new Schema<CartItemClass>({
    userId: {
        type: Types.ObjectId,
        required: true,
        ref: "User",
    },
    products: {
        type: [Types.ObjectId],
        ref: "Product",
    }
}, {
    timestamps: true,
});

const CartModel = models?.Cart || model('Cart', cartItemSchema);

export default CartModel;
import { Schema, Document, model, models, Types } from "mongoose";

interface ProductClass extends Document {
    name: string,
    category?: Types.ObjectId,
    images: string[],
    description: string,
    price: number,
    amount: number,
    categoryProperties: Object,
}

const productSchema: Schema<ProductClass> = new Schema<ProductClass>({
    name: {
        type: String,
        required: [true, "Product_name is required"],
    },
    category: {
        type: Types.ObjectId,
        ref: "Category"
    },
    images: {
        type: Array(String),
        required: [true, "Image source or image-link required"]
    },
    description: {
        type: String,
        required: [true, "Product_description is required"],
    },
    price: {
        type: Number,
        required: [true, "without Product_price product can't be added"]
    },
    amount: {
        type: Number,
        required: [true, "amount should be required"],
        min: [0, "amount cannot be negetive"]
    },
    categoryProperties: {
        type: Object
    },
})

const Product = models?.Product || model('Product', productSchema);

export default Product;
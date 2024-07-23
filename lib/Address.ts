import { Schema, model, models, Document } from "mongoose";

interface AddressClass extends Document {
    name: string,
    pincode: number,
    address: string,
    locality: string,
    city_district_town: string,
    houseNo?: string,
    landmark: string,
    state: string,
    country: string,
}

const addressSchema: Schema<AddressClass> = new Schema<AddressClass>({
    name: {
        type: String,
        required: [true, "Name is required!"],
        trim: true,
        minlength: [6, "Name must be of 6 characters"],
        maxlength: [80, "Name does not exceed 80 characters"],
    },
    pincode: {
        type: Number,
        required: true,
        validate: {
            validator: (value: number) => String(value).length === 6,
            message: ({value}: {value: number})  => `PINCODE-${value} does not contain 6 digits`
        }
    },
    locality: {
        type: String,
        required: true,
        minlength: [15, "AddressLine must be of 15 characters"],
        maxlength: [200, "AddressLine does not exceed 200 characters"]
    },
    address: {
        type: String,
        required: true,
        minlength: [30, "AddressLine must be of 30 characters"],
        maxlength: [500, "AddressLine does not exceed 500 characters"]
    },
    houseNo: {
        type: String,
        minlength: [5, "AddressLine must be of 5 characters"],
        maxlength: [40, "AddressLine does not exceed 40 characters"]
    },
    city_district_town: {
        type: String,
        required: true,
        minlength: [4, "City must be of 4 characters"],
        maxlength: [20, "City does not exceed 20 characters"]
    },
    landmark: {
        type: String,
        required: true,
        minlength: [6, "Landmark must be of 6 characters"],
        maxlength: [20, "State does not exceed 20 characters"]
    },
    state: {
        type: String,
        required: true,
        minlength: [5, "State must be of 5 characters"],
        maxlength: [20, "State does not exceed 20 characters"]
    },
    country: {
        type: String,
        required: true,
        enum: ['India'],
        default: "India"
    },
}, {
    timestamps: true,
})

const AddressModel = models?.Address || model('Address', addressSchema);

export default AddressModel;
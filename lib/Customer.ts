import { Schema, model, models, Document } from "mongoose";

interface CustomerClass extends Document {
    name: string, 
    email: string,
    password: string,
    phoneNo: string,
    image: string,
    emailVerified: boolean,
    verifyToken: string,
    forgotPasswordToken: string,
    verifyTokenExpiry: Date,
    forgotPasswordTokenExpiry: Date,
    addressLine1?: string,
    addressLine2?: string,
    city?: string,
    pincode?: number,
    street?: string,
    landmark?: string,
}

const customerSchema: Schema<CustomerClass> = new Schema<CustomerClass>({
    name: {
        type: String,
        required: [true, "Name is required!"],
        trim: true,
        minlength: [6, "Name must be of 6 characters"],
        maxlength: [80, "Name does not exceed 80 characters"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator(value: string) {
                if(!value.includes("@") || value.length < 6) {
                    return false;
                }
                return true;
            },
            message({value}) {
                return `EmailId-${value} is not valid`
            }
        },
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        trim: true,
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator(value: string) {
                if(value.length !== 10 || 
                    value.startsWith('1') || 
                    value.startsWith('2') || 
                    value.startsWith("3")
                ) {
                    return value;
                }
            },
            message({value}) {
                return `PhoneNo-${value} is not valid`
            }
        },
    },
    image: {
        type: String,
        required: [true, "Image is required"],
        trim: true,
        default: "https://res.cloudinary.com/next-ecom-cloud/image/upload/v1717239604/pexels-pixabay-220429_bngcul.jpg"
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    verifyToken: {
        type: String,
    },
    forgotPasswordToken: {
        type: String,
    },
    verifyTokenExpiry: {
        type: Date,
        default: new Date(new Date().setHours(new Date().getHours() + 5)),
    },
    forgotPasswordTokenExpiry: {
        type: Date,
        default: new Date(new Date().setMinutes(new Date().getMinutes() + 30)),
    },
    addressLine1: {
        type: String,
        minlength: [10, "AddressLine must be of 10 characters"],
        maxlength: [100, "AddressLine does not exceed 100 characters"]
    },
    addressLine2: {
        type: String,
        minlength: [10, "AddressLine must be of 10 characters"],
        maxlength: [100, "AddressLine does not exceed 100 characters"]
    },
    city: {
        type: String,
        minlength: [4, "AddressLine must be of 4 characters"],
        maxlength: [20, "AddressLine does not exceed 20 characters"]
    },
    pincode: {
        type: Number,
        validate: {
            validator(value: number) {
                if(String(value).length === 6) {
                    return true;
                }
                return false;
            },
            message({value}) {
                return `PINCODE-${value} does not contain 6 digits`;
            }
        }
    },
    street: {
        type: String,
        minlength: [6, "Street Address must be of 6 characters"],
        maxlength: [20, "Street Address does not exceed 20 characters"]
    },
    landmark: {
        type: String,
        minlength: [6, "Landmark must be of 6 characters"],
        maxlength: [20, "AddressLine does not exceed 20 characters"]
    }
}, {
    timestamps: true,
})

const Customer = models?.Customer || model('Customer', customerSchema);

export default Customer;
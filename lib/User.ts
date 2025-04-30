import { Schema, model, models, Document, Types } from "mongoose";
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

interface AddressClass extends Document {
    name: string,
    pincode: string,
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
        required: true,
        trim: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    locality: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    houseNo: {
        type: String,
    },
    city_district_town: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
        enum: ['India'],
        default: "India"
    },
})

interface UserProducts extends Document {
    ordered?: Types.ObjectId[],
    cancelled?: Types.ObjectId[]
}

const userProductSchema: Schema<UserProducts> = new Schema<UserProducts>({
    ordered: [{
        type: Types.ObjectId,
        ref: "Product"
    }],
    cancelled: [{
        type: Types.ObjectId,
        ref: "Product"
    }]
}, {
    _id: false
})

interface UserClass extends Document {
    name: string, 
    email: string,
    password: string,
    phoneNo: string,
    image: string,
    emailVerified: boolean,
    verifyToken?: string,
    forgotPasswordToken?: string,
    address?: AddressClass,
    products?: UserProducts,
}

const userSchema: Schema<UserClass> = new Schema<UserClass>({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, "Name must be of 6 characters"],
        maxlength: [80, "Name does not exceed 80 characters"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator(value: string) {
                passwordRegex.test(value)
            },
            message: ({value}) => `Password validation failed`
        },
        trim: true,
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator(value: string) {
                if(value.length !== 10 || 
                    value.startsWith('0') ||
                    value.startsWith('1') || 
                    value.startsWith('2') || 
                    value.startsWith("3") ||
                    value.startsWith("4") ||
                    value.startsWith("5")
                ) {
                    return false;
                }
                return true;
            },
            message({value}) {
                return `Phone_Number must consist 10 digits and doesn't start with any digit less than 6`
            }
        },
    },
    image: {
        type: String,
        required: true,
        trim: true,
        default: "https://res.cloudinary.com/next-ecom-cloud/image/upload/v1722359725/profile_gspnec.jpg",
    },
    emailVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    verifyToken: {
        type: String,
    },
    forgotPasswordToken: {
        type: String,
    },
    address: {
        type: addressSchema,
    },
    products: {
        type: userProductSchema,
    }
}, {
    timestamps: true,
})

const UserModel = models?.User || model('User', userSchema);

export default UserModel;

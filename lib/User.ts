import { Schema, model, models, Document, Types } from "mongoose";
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

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
    verifyTokenExpiry?: Date,
    forgotPasswordTokenExpiry?: Date,
    address?: Types.ObjectId[],
    products?: UserProducts,
}

const userSchema: Schema<UserClass> = new Schema<UserClass>({
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
        lowercase: true,
        validate: {
            validator: (value: string) => emailRegex.test(value),
            message: ({value}) => `EmailId-${value} is not valid`
        },
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        validate: {
            validator: (value: string) => passwordRegex.test(value),
            message: ({value}) => `Password should contain minimum eight characters with one letter, one number and one special character`
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
                return `${value} as phoneNo is not valid`
            }
        },
    },
    image: {
        type: String,
        required: [true, "Image is required"],
        trim: true,
        default: "https://res.cloudinary.com/next-ecom-cloud/image/upload/v1722334201/pexels-blitzboy-1040880_mljgok.jpg",
    },
    emailVerified: {
        type: Boolean,
        required: [true, "Email verification is mandatory"],
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
    address: [{
        type: Types.ObjectId,
        ref: "Address"
    }],
    products: {
        type: userProductSchema,
    }
}, {
    timestamps: true,
})

const UserModel = models?.User || model('User', userSchema);

export default UserModel;
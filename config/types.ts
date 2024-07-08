import { Dispatch, SetStateAction } from "react";

export interface Product {
    _id: string,
    name: string,
    images: string[],
    description: string,
    price: number,
    discountPercentage: number,
    amount: number,
    __v: number,
    category?: string,
    categoryProperties: Object,
    createdAt: Date,
    updatedAt: Date,
    seller: string,
    ratingAndReview?: {
        customerId?: {
            _id: string,
            name: string,
            email: string,
            phoneNo: string,
            __v: number,
        },
        rating: number,
        review?: string
    }
}

export interface CartResponseBody {
    name: string,
    phoneNumber: string,
    email: string,
    city: string,
    pinCode: string,
    streetAddress: string,
    products: string[],
}

export interface CartOrderProps {
    name: string, 
    setName: Dispatch<SetStateAction<string>>, 
    phoneNumber: string, 
    setPhoneNumber: Dispatch<SetStateAction<string>>, 
    email: string, 
    setEmail: Dispatch<SetStateAction<string>>,
    city: string, 
    setCity: Dispatch<SetStateAction<string>>, 
    pinCode: string, 
    setPinCode: Dispatch<SetStateAction<string>>, 
    streetAddress: string, 
    setStreetAddress: Dispatch<SetStateAction<string>>,
    subTotal: number,
}
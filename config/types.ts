import { Dispatch, SetStateAction } from "react";

export interface Product {
    _id: string,
    name: string,
    images: string[],
    description: string,
    price: number,
    amount: number,
    category?: '',
    categoryProperties: Object,
    createdAt: Date,
    updatedAt: Date,
    __v: number,
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
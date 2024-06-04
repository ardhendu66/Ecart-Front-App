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
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { CartContext, CartContextType } from "@/Context/CartContext";
import Header from "@/components/Header";
import axios from "axios";
import { Product } from "@/config/types";

export default function Cart() {
    const { cartProducts } = useContext(CartContext) as CartContextType;
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        async function fetchProducts() {
            const res = await axios.post('/api/cart/get-products', { ids: cartProducts })
            console.log(cartProducts);            
            setProducts(res.data);
            console.log("render: ", res.data);        
        }
        fetchProducts();
    }, [cartProducts])

    return(
        <main className="w-screen min-h-screen bg-gray-300">
            <Header />
            <div className="flex justify-between gap-2 mt-6">
                <div className=" flex items-center justify-center w-2/3 p-4">
                    <div className="pl-9 bg-white w-[70%] rounded-md">
                    {
                        cartProducts.length === 0
                            ?
                        <div className="flex flex-col items-center justify-center p-8">
                            <span className="text-4xl font-medium h-20 italic tracking-wide">
                                Your Cart is Empty
                            </span>
                            <Link href={'/'} className="bg-black text-white py-2 px-4 rounded-md">
                                Go Back to Shopping
                            </Link>
                        </div>
                            : 
                        <div className="w-full flex flex-col p-8">
                            <span className="text-4xl font-bold h-20">
                                Cart
                            </span>
                            <div className="w-full flex gap-2">
                                <div className="w-1/3 font-bold">Product</div>
                                <div className="w-1/3 font-bold">Quantity</div>
                                <div className="w-1/3 font-bold">Price</div>
                            </div>
                        </div>
                    }
                    </div>
                </div>
                <div className="flex items-center justify-center w-1/3 p-4">
                    <div className="flex flex-col items-center justify-center bg-white w-[80%] p-4 rounded-md">
                        <div className="text-2xl font-bold mb-2">
                            Order Information
                        </div>
                        <input 
                            type="text" 
                            placeholder="Address Line-1" 
                            className="border-black border p-1 px-2 rounded-sm my-2"
                        />
                        <input 
                            type="text" 
                            placeholder="Address Line-2" 
                            className="border-black border p-1 px-2 rounded-sm mb-2"
                        />
                        <button className="w-[76%] bg-black text-white px-4 py-[5px] rounded-md my-2 text-lg font-medium">Conitnue to Payment</button>
                    </div>
                </div>
            </div>
        </main>
    )
}
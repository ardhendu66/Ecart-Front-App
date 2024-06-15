import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Product } from "@/config/types";
import { MdShoppingCart } from "react-icons/md";
import { PiCurrencyInrBold } from "react-icons/pi";
import { CartContext, CartContextType } from "@/Context/CartContext";

export default function NewProducts() {
    const [productArray, setProductArray] = useState<Product[] | null>(null);
    const { addProductToCart } = useContext(CartContext) as CartContextType;

    useEffect(() => {
        async function fetchProductArray() {
            try {
                const res = await axios.get('/api/product/get-products')                
                setProductArray(res.data.products);
            }
            catch(err: any) {
                throw new Error("Something went wrong");
            }
        }
        fetchProductArray();
    }, [])


    return (
        <div 
            className="w-[99.2%] grid lg:grid-cols-4 md:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 my-10"
        >{
            productArray && productArray?.map((product: Product) => (
                <div  
                    key={product._id} 
                    className="relative flex flex-col items-center bg-white cols-span-1 gap-3 p-6 rounded-xl m-4 shadow-sm"
                >
                    <Link href={`/products/${product._id}`} 
                        className="relative w-full max-h-60 border border-gray-300 rounded-sm p-5"
                    >
                        <Image 
                            src={product.images[0]}
                            alt="error"
                            width={100}
                            height={100}
                            className="w-full h-full rounded-sm"
                        />
                    </Link>
                    <div className="flex flex-col w-full font-medium text-wrap">
                        <div 
                            className="w-full p-2 text-gray-600 text-lg rounded-md capitalize font-normal"
                        >
                            {product.name}
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-center justify-center">
                                <PiCurrencyInrBold 
                                    className="w-[20px] h-[20px] text-gray-500 -mr-[2px]"
                                />
                                <span className=" text-gray-900 text-lg font-extrabold">
                                    {product.price}
                                </span>
                            </div>
                            <button 
                                className="bg-transparent border-yellow-500 text-yellow-500  px-4 py-2 rounded-md border p-1 flex items-center justify-center mb-1 w-1/2"
                                onClick={() => addProductToCart(product._id)}
                            >
                                <MdShoppingCart 
                                    className="w-6 h-6 mr-2"
                                />
                                <span className="uppercase">
                                    Add
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            ))
        }
        </div>
    )
}
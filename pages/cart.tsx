import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CartContext, CartContextType } from "@/Context/CartContext";
import Header from "@/components/Header";
import axios from "axios";
import { Product } from "@/config/types";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { moneyComaSeperator } from "@/config/functions";

export default function Cart() {
    const { 
        cartProducts, addProductToCart, removeProductFromCart, removeCertainProduct 
    } = useContext(CartContext) as CartContextType;
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        async function fetchProducts() {
            const res = await axios.post('/api/cart/get-products', {
                ids: cartProducts 
            })          
            setProducts(res.data);
            console.log("render cart products");        
        }
        fetchProducts();
        
    }, [cartProducts])

    var subTotalPrice = 0;
    for(const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        subTotalPrice += price;
    }
    console.log("Subtotal: ", subTotalPrice);

    return(
        <main className="w-[98.72vw] min-h-screen bg-gray-300">
            <Header />
            <div className="flex items-start justify-between gap-1 mt-6">
                <div className="flex items-center justify-center w-2/3 p-4">
                    <div className="p-4 bg-white w-[95%] rounded-md">
                    {
                        cartProducts.length === 0
                            ?
                        <div className="flex flex-col items-center justify-center p-8">
                            <span className="text-4xl font-medium h-20 italic tracking-wide">
                                Your Cart is Empty
                            </span>
                            <Link 
                                href={'/'} 
                                className="bg-black text-white py-2 px-4 rounded-md"
                            >
                                Go Back to Shopping
                            </Link>
                        </div>
                            : 
                        <div className="w-full p-8 pt-2">
                            <h2 className="text-5xl text-left font-medium mb-10">
                                Shopping Cart
                            </h2>
                            <div className="mt-3">
                            {
                                products?.map(product => (
                                    <div 
                                        key={product._id}
                                        className="flex mb-5 bg-gray-100 border-y-[1.3px] p-4 h-[230px] rounded-sm" 
                                    >
                                        <div className="w-1/3 text-center h-full rounded-xl">
                                            <div className="h-full rounded-xl">
                                                <Image 
                                                    src={product.images[0]}
                                                    alt="error"
                                                    width={100}
                                                    height={100}
                                                    className="w-full h-full rounded-xl"
                                                />
                                            </div>
                                        </div>
                                        <div className="ml-5 w-[56%] text-start">
                                            <div 
                                                className="text-lg font-semibold mb-[6px]"
                                            >
                                                {product.name}
                                            </div>
                                            <div 
                                                className="text-xs font-thin text-gray-500 mb-[6px]"
                                            >
                                                {product.description.substring(0, 150)}
                                            </div>
                                            <div 
                                                className="text-xs text-gray-400 mb-[6px]"
                                            >
                                                Sold by: Vensar Tex
                                            </div>
                                            <div className="flex justify-start text-md font-medium">
                                                <span className="mt-1">Qty:</span> 
                                                <CiCircleMinus 
                                                    className="ml-2 w-8 h-8 cursor-pointer" 
                                                    onClick={() => 
                                                        removeProductFromCart(product._id)
                                                    }
                                                />
                                                <div className="flex items-center justify-center border-black border-[1.5px] ml-1 rounded-md w-12 mr-1">{ cartProducts.filter(
                                                    id => id === product._id
                                                ).length }</div>
                                                <CiCirclePlus 
                                                    className="w-8 h-8 cursor-pointer" 
                                                    onClick={() => addProductToCart(product._id)}
                                                />
                                                <div className={`flex items-center justify-center px-1 h-[20px] border-[1.3px] border-red-500 text-red-500 text-xs text-[10px] font-bold rounded-[4px] mt-1 ml-2 ${product.amount - cartProducts.filter(id => id === product._id).length >= 100 && "hidden"} `}>
                                                {
                                                    product.amount - cartProducts.filter(id => id === product._id).length < 100 && `${product.amount - cartProducts.filter(id => id === product._id).length} left`
                                                }
                                                </div>
                                            </div>
                                            <div className="mt-[6px] text-sm">
                                                <span className="mr-2 line-through text-gray-400">₹{moneyComaSeperator(product.price * 1.53)}</span>
                                                <span className="mr-3 font-[600] text-gray-500">₹{moneyComaSeperator(product.price)}</span>
                                                <span className="text-green-600 font-semibold">53% OFF</span>
                                            </div>
                                            <div className="text-xs mt-[6px]">
                                                <span className="font-semibold mr-1">
                                                    14 days
                                                </span>
                                                <span>return available</span>
                                            </div>
                                        </div>
                                        <div className="w-[0.7%]">
                                            <RiDeleteBin6Line
                                                className="w-10 h-10 text-red-500 cursor-pointer -mt-2 ml-3" 
                                                onClick={() => removeCertainProduct(product._id)}
                                            />
                                        </div>
                                    </div>
                                ))
                            }
                            </div>
                            <div className="text-xl text-end border-black border-t-[1.5px] pt-2">
                                <span className="font-medium mr-2">
                                    Subtotal:
                                </span>
                                <span className="text-sky-900 font-semibold tracking-tighter">
                                    ₹{moneyComaSeperator(subTotalPrice)}
                                </span>
                            </div>
                        </div>
                    }
                    </div>
                </div>
                <div className="flex items-center justify-center w-1/3 p-4">
                    <form 
                        className="flex flex-col items-center justify-center bg-white w-full py-6 px-8 rounded-md"
                    >
                        <h2 className="text-2xl font-bold mb-2">
                            Order Information
                        </h2>
                        <input 
                            type="text" 
                            placeholder="Name" 
                            className="w-full border-black border p-1 px-2 rounded-sm mt-2 mb-[2[px] outline-none font-medium"
                        />
                        <div className="flex gap-2">
                            <input 
                                type="text"
                                className="w-[18%] border-black border p-1 px-2 rounded-sm my-2 outline-none font-medium" 
                                value={'+91'}
                                disabled
                            />
                            <input 
                                type="text"
                                placeholder="Phone number" 
                                className="w-full border-black border p-1 px-2 rounded-sm my-2 outline-none font-medium"
                            />
                        </div>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className="w-full border-black border p-1 px-2 rounded-sm mb-2 outline-none font-medium"
                        />
                        <div className="flex gap-1">
                            <input 
                                type="text" 
                                placeholder="City" 
                                className="w-full border-black border p-1 px-2 rounded-sm mb-2 outline-none font-medium"
                            />
                            <input 
                                type="text" 
                                placeholder="PIN Code" 
                                className="w-full border-black border p-1 px-2 rounded-sm mb-2 outline-none font-medium"
                            />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Street Address" 
                            className="w-full border-black border p-1 px-2 rounded-sm mb-2 outline-none font-medium"
                        />
                        <button 
                            type="submit"
                            className="w-full bg-black text-white px-4 py-2 rounded-md my-2 text-md font-medium"
                        >Conitnue to Payment</button>
                    </form>
                </div>
            </div>
        </main>
    )
}
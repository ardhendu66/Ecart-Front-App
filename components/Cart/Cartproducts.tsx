import Image from "next/image"
import { useContext } from "react"
import { Product } from "@/config/types"
import { CartContext, CartContextType } from "@/Context/CartContext"
import { moneyComaSeperator } from "@/config/functions"
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
    products: Product[],
}

export default function Cartproducts({products}: Props) {
    const { 
        cartProducts, addProductToCart, removeProductFromCart, removeCertainProduct 
    } = useContext(CartContext) as CartContextType;

    return (
        <div className="mt-3">
        {
            products?.map(product => (
                <div key={product._id}
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
                        <div className="text-lg font-semibold mb-[6px]">
                            {product.name}
                        </div>
                        <div className="text-xs font-thin text-gray-500 mb-[6px]">
                            {product.description.substring(0, 150)}
                        </div>
                        <div className="text-xs text-gray-400 mb-[6px]">
                            Sold by: Vensar Tex
                        </div>
                        <div className="flex justify-start text-md font-medium">
                            <span className="mt-1">Qty: </span> 
                            <CiCircleMinus 
                                className="ml-2 w-8 h-8 cursor-pointer" 
                                onClick={() => 
                                    removeProductFromCart(product._id)
                                }
                            />
                            <div className="flex items-center justify-center border-black border-[1.5px] ml-1 rounded-md w-12 mr-1">
                                { cartProducts.filter(id => id === product._id).length }
                            </div>
                            <CiCirclePlus 
                                className="w-8 h-8 cursor-pointer" 
                                onClick={() => addProductToCart(product._id)}
                            />
                            <div 
                                className={`flex items-center justify-center px-1 h-[20px] border-[1.3px] border-red-500 text-red-500 text-xs text-[10px] font-bold rounded-[4px] mt-1 ml-2 ${product.amount - cartProducts.filter(id => id === product._id).length >= 100 && "hidden"} `}
                            >
                            {
                                product.amount - cartProducts.filter(id => id === product._id).length < 100 && `${product.amount - cartProducts.filter(id => id === product._id).length} left`
                            }
                            </div>
                        </div>
                        <div className="mt-[6px] text-sm">
                            <span className="mr-2 line-through text-gray-400">
                                ₹{moneyComaSeperator(product.price * 1.53)}
                            </span>
                            <span className="mr-3 font-[600] text-gray-500">
                                ₹{moneyComaSeperator(product.price)}
                            </span>
                            <span className="text-green-600 font-semibold">
                                53% OFF
                            </span>
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
    )
}
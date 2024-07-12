import Image from "next/image"
import { useContext } from "react"
import { Product } from "@/config/types"
import { loaderColor } from "@/config/config"
import { CartContext, CartContextType } from "@/Context/CartContext"
import { moneyComaSeperator } from "@/config/functions"
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { ClipLoader } from "react-spinners"

interface Props {
    products: Product[],
    loading: boolean,
}

const Cartproducts = ({products, loading}: Props) => {
    const { 
        cartProducts, addProductToCart, removeProductFromCart, removeCertainProduct 
    } = useContext(CartContext) as CartContextType;

    return (
        <div className={`mt-3 ${loading && "text-center"}`}>
        {
            loading 
                ?
            <ClipLoader
                size={70}
                color={loaderColor}
            />
                :
            products.length > 0
                ?
            products?.map(product => (
                <div key={product._id}
                    className="flex mb-5 bg-gray-100 border-y-[1.3px] p-4 h-[230px] rounded-sm" 
                >
                    <div className="w-1/3 text-center h-full rounded-xl">
                        <div className="h-full rounded-xl">
                            <Image 
                                src={product.images[1]}
                                alt="error"
                                width={100}
                                height={100}
                                priority
                                className="w-full h-full rounded-xl"
                            />
                        </div>
                    </div>
                    <div className="ml-5 w-[56%] text-start">
                        <div className="text-lg font-semibold mb-[6px]">
                            {product.name}
                        </div>
                        <div className="text-xs font-thin text-gray-500 mb-[6px]">
                            {product.description.substring(0, 150)}...
                        </div>
                        <div className="text-xs text-gray-400 mb-[6px]">
                            Sold by: {product.seller}
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
                                className={`flex items-center justify-center px-1 h-[20px] border-[1.3px] border-red-500 text-red-500 text-xs rounded-[4px] mt-1 ml-2 ${product.amount - cartProducts.filter(id => id === product._id).length >= 100 && "hidden"} `}
                            >
                            {
                                product.amount - cartProducts.filter(id => id === product._id).length < 100 && `${product.amount - cartProducts.filter(id => id === product._id).length} left`
                            }
                            </div>
                        </div>
                        <div className="mt-[6px] text-sm">
                            <span className="mr-2 line-through text-gray-400">
                                ₹{moneyComaSeperator(Math.floor(
                                    product.price*(100+product.discountPercentage)/100
                                ))}
                            </span>
                            <span className="mr-3 font-[600] text-gray-500 text-lg">
                                ₹{moneyComaSeperator(product.price)}
                            </span>
                            <span className="text-green-600">
                                {product.discountPercentage}% OFF
                            </span>
                        </div>
                        <div className="text-xs mt-[6px]">
                            <span className="font-semibold mr-1">
                                14 days
                            </span>
                            <span>return available</span>
                        </div>
                    </div>
                    <div className="w-[11%]">
                        <button
                            className=" bg-transparent p-2 -mt-2 rounded-md border-[1.5px] border-red-500 tracking-tighter text-red-500" 
                            onClick={() => removeCertainProduct(product._id)}
                        >Remove</button>
                    </div>
                </div>
            ))
                :
            <div className="text-xl font-semibold">No products found.</div>
        }
        </div>
    )
}

export default Cartproducts;
import Link from "next/link";
import { Product } from "@/config/types";
import { moneyComaSeperator } from "@/config/functions";
import { MdShoppingCart } from "react-icons/md";

interface Props {
    products: Product[],
    addProductToCart: (p: string) => void,
}

export default function ProductsList({products, addProductToCart}: Props) {
    return (
        <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-10 max-sm:gap-x-14 px-4 mx-7">
        {
            products?.map((product: Product) => (
                <div  
                    key={product._id} 
                    className="cols-span-1 bg-gray-300 flex flex-col items-center justify-center gap-3 shadow-md rounded-[4px] overflow-hidden border border-gray-300 pb-1"
                >
                    <Link href={`/products/${product._id}`} 
                        className="w-full"
                    >
                        <img 
                            src={product.images[0]}
                            alt="error"
                            className={`w-full h-[200px] hover:scale-110 hover:transition-all
                            duration-300 ${!product.subCategory?.includes("Apple") && "py-7 px-16"}`}
                        />
                    </Link>
                    <div className="bg-white flex flex-col w-full font-medium text-wrap py-4">
                        <div className="w-full text-gray-600 rounded-md capitalize font-normal mb-2 px-5">
                            {product.name.length <= 20 ? product.name 
                            : `${product.name.    substring(0, 19)}...`}
                        </div>
                        <div className="flex items-center justify-start gap-3 px-5">
                            <span className="italic text-gray-500 text-xs line-through">
                                ₹{moneyComaSeperator(Math.floor(
                                    product.price*(100+product.discountPercentage)/100
                                ))}
                            </span>
                            <span className="italic text-gray-900 text-lg font-extrabold">
                                ₹{moneyComaSeperator(product.price)}
                            </span>
                            <span className="text-sm text-green-600">
                                {product.discountPercentage}%off
                            </span>
                        </div>
                        <div className="px-4">
                            <button 
                                className="bg-slate-200 px-4 py-2 p-1 flex items-center justify-center mb-1 w-full mt-2 rounded-[2rem] hover:bg-slate-300"
                                onClick={() => addProductToCart(product._id)}
                            >
                                <MdShoppingCart 
                                    className="w-6 h-6 mr-2"
                                />
                                <span className="uppercase">
                                    Add To Cart
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
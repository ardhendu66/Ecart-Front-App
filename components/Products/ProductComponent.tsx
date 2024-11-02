import Link from "next/link";
import { Product } from "@/config/types";
import { moneyComaSeperator } from "@/config/functions";
import { MdShoppingCart } from "react-icons/md";

interface Props {
    products: Product[],
    addProductToCart: (p: string) => void,
}

export default function ProductsList({products, addProductToCart}: Props) {
    // console.log(products);
    
    return (
        <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-10 max-sm:gap-x-14 px-4 mx-7">
        {
            products?.map((product: Product) => (
                <div  
                    key={product._id} 
                    className="cols-span-1 bg-white flex flex-col items-center justify-center gap-3 shadow-md rounded-[4px] overflow-hidden border border-gray-300 pb-1"
                >
                    <Link href={`/products/${product._id}`} target="_blank" 
                        className="w-full"
                    >
                        <img 
                            src={product.images[0]}
                            alt="error"
                            className={`w-full h-[150px] max-sm:h-[150px] hover:scale-110 hover:transition-all duration-300 ${!product.subCategory?.includes("Apple") && "py-7 px-16"}`}
                        />
                    </Link>
                    <div className="bg-gray-300 flex flex-col w-full text-wrap py-2">
                        <div className="w-full rounded-md capitalize font-bold px-5 text-sm text-wrap">
                            {product.name.length <= 50 ? product.name 
                            : `${product.name.substring(0, 49)}...`}
                        </div>
                        <div className="flex items-center justify-start gap-3 px-5">
                            <span className="italic text-gray-500 text-xs line-through">
                                ₹{moneyComaSeperator(Math.floor(
                                    product.price*(100+product.discountPercentage)/100
                                ))}
                            </span>
                            <span className="italic text-gray-900 text-sm font-extrabold">
                                ₹{moneyComaSeperator(product.price)}
                            </span>
                            <span className="text-sm text-green-600">
                                {product.discountPercentage}%off
                            </span>
                        </div>
                        <div className="px-4">
                            <button 
                                className="bg-white border-yellow-600 border-[1.6px] mt-1 px-4 py-2 p-1 flex items-center justify-center mb-1 w-full rounded-[2rem] hover:bg-gray-100"
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
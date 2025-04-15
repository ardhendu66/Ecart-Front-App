import Link from "next/link";
import { Product } from "@/config/types";
import { moneyComaSeperator } from "@/config/functions";
import { MdShoppingCart } from "react-icons/md";

interface Props {
    products: Product[],
    addProductToCart: (p: string) => void,
}

export default function SearchedProducts({products, addProductToCart}: Props) {
    return (
        <div className="grid grid-cols-4 gap-6 px-4">
        {
            products?.map((product: Product) => (
                <div  
                    key={product._id} 
                    className="cols-span-1 bg-gray-300 flex flex-col items-center justify-center gap-3 shadow-md rounded-[4px] overflow-hidden border border-gray-300"
                >
                    <Link href={`/products/${product._id}`} 
                        className="w-full max-h-52"
                    >
                        <img 
                            src={'https://res.cloudinary.com/next-ecom-cloud/image/upload/v1717869277/mac-pro_oimbit.png'}
                            alt="error"
                            className="w-full h-full"
                        />
                    </Link>
                    <div className="bg-white flex flex-col w-full font-medium text-wrap px-3 py-2">
                        <div 
                            className="w-full text-gray-600 rounded-md capitalize font-normal mb-2"
                        >
                        {
                            product.name.length <= 28
                                ?
                            product.name
                                :
                            `${product.name.substring(0, 27)}...`
                        }
                        </div>
                        <div>
                            <div className="flex items-center justify-start gap-3">
                                <span 
                                    className="italic text-gray-500 text-xs line-through"
                                >
                                    ₹{moneyComaSeperator(Math.floor(
                                        product.price*(100+product.discountPercentage)/100
                                    ))}
                                </span>
                                <span 
                                    className="italic text-gray-900 text-lg font-extrabold"
                                >
                                    ₹{moneyComaSeperator(product.price)}
                                </span>
                                <span className="text-sm text-green-600">
                                    {product.discountPercentage}%off
                                </span>
                            </div>
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
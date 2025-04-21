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
        <div className="grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-1 sm:gap-x-4 sm:gap-y-8 max-sm:gap-4 max-sm:gap-x-14 px-4 mx-7">
        {
            products?.map((product: Product) => (
                <Link 
                    href={`/products/${product._id}`} 
                    target="_blank" 
                    key={product._id} 
                    className="cols-span-1 bg-gray-300 flex flex-col items-center justify-center gap-y-3 shadow-sm rounded-sm overflow-hidden border border-gray-300"
                >
                    <div className="w-full bg-white">
                        <img 
                            src={product.images[0]}
                            alt="error"
                            className={`w-full h-[120px] max-sm:h-[130px] hover:scale-110 hover:transition-all duration-300 ${!product.subCategory?.includes("Apple") && "py-7 px-16"}`}
                        />
                    </div>
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
                    </div>
                </Link>
            ))
        }
        </div>
    )
}
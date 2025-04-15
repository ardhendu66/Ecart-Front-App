import { useContext } from "react";
import { Product } from "@/config/types";
import { CartContext, CartContextType } from "@/Context/CartContext";
import { moneyComaSeperator } from "@/config/functions";
import { ClipLoader } from "react-spinners";
import { MdShoppingCart } from "react-icons/md";

export default function ProductCardInfo({product}: {product: Product}) {
    const { addProductToCart } = useContext(CartContext) as CartContextType;

    return (
        <div className="bg-white px-5 pb-3">
            <div className="flex flex-col w-full font-medium text-wrap h-32">
                <div
                    className="w-full text-gray-600 rounded-md capitalize font-normal mt-4 mb-2"
                >
                    {
                        product.name.length <= 20
                            ?
                        product.name
                            :
                        `${product.name.substring(0, 19)}...`
                    }
                </div>
                <div>
                    <div className="flex items-center justify-start gap-3">
                        <span
                            className="italic text-gray-500 text-xs line-through"
                        >
                            ₹{moneyComaSeperator(Math.floor(
                                product.price * (100 + product.discountPercentage) / 100
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
                        className="bg-slate-200  px-4 py-2 p-1 flex items-center justify-center mb-1 w-full mt-2 rounded-[2rem] hover:bg-slate-300"
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
    )
}
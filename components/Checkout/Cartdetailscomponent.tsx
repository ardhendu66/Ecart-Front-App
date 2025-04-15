import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { User } from "@/Context/UserDetails";
import { CartContext, CartContextType } from "@/Context/CartContext";
import { Product } from "@/config/types";
import { Tooltip } from "react-tooltip";
import { IoCheckmarkOutline } from "react-icons/io5";
import { moneyComaSeperator } from "@/config/functions";

interface CheckoutComponentProps {
    userDetails: User;
    view: number;
}

export default function CheckoutCartDetailsComp(
    { userDetails, view }: CheckoutComponentProps) 
{
    const { cartProducts } = useContext(CartContext) as CartContextType;
    const [products, setProducts] = useState<Product[]>([]);
    const router = useRouter();

    const fetchCartProducts = () => {
        axios.post('/api/cart/find/all-items', {
            ids: cartProducts
        })
            .then(res => setProducts(res.data))
            .catch((err: AxiosError) => {
                console.error({
                    message: err.message,
                    name: err.name,
                    response: err.response?.data,
                    statusCode: err.response?.status || err.status
                })
                console.error(err.toJSON());
            })
    }

    useEffect(() => {
        fetchCartProducts();
    }, [cartProducts])

    return (
        <div className={`bg-white ${view === 3 && "border-blue-600 border-2 rounded"} shadow-sm shadow-gray-400 rounded-sm w-full my-5`}>

            {/* Headline */}
            <div className={`flex items-center gap-x-2 p-5 ${view === 3 && "bg-blue-600 text-white py-3 px-5"}`}>
                <div className={`p-1 px-2 bg-gray-200 text-blue-700 text-xs font-semibold rounded mr-2`}>3</div>
                <div className="uppercase font-semibold tracking-wider text-lg">
                    ORDER SUMMARY
                </div>
                <IoCheckmarkOutline
                    className={`w-6 h-6 mb-1 text-green-600 ${(view === 3 || view < 3) && "hidden"}`}
                />
            </div>

            {/* Cart Products section */}
            <div className={`${view === 3 ? "py-3 pl-6 sm:pl-14 pr-4" : "-mt-3 mb-4 hidden"} pl-14 pr-2 max-h-[300px] overflow-y-scroll shadow-[inset_0_10px_16px_-6px_rgba(0,0,0,0.26),inset_0_-8px_12px_-6px_rgba(0,0,0,0.22)]`}>
                {
                    products.map(product => (
                        <div key={product?._id} className="relative pl-6 sm:pl-8 my-4">

                            {/* Vertical line with circles - super close to content */}
                            <div className="absolute left-1 sm:left-2 top-0 h-full flex flex-col items-center z-0">
                                <div className="w-2 h-2 bg-gray-400 rounded-full z-10" />
                                <div className="w-px flex-1 bg-gray-400" />
                                <div className="w-2 h-2 bg-gray-400 rounded-full z-10" />
                            </div>

                            {/* Product content */}
                            <div className="flex gap-x-3 py-2">
                                <img
                                    src={product?.images[0]}
                                    alt="product"
                                    className="w-16 h-16 object-cover"
                                />

                                <div className="flex flex-col">
                                    <div className="text-gray-500 text-sm sm:text-base">
                                        {product?.name}
                                    </div>

                                    <div className="flex flex-wrap items-center text-sm sm:text-base">
                                        <span className="line-through text-gray-400 mr-2">
                                            ₹{moneyComaSeperator(Math.floor(product?.price * (100 + product?.discountPercentage) / 100))}
                                        </span>
                                        <span className="font-bold text-gray-800 mr-2">
                                            ₹{moneyComaSeperator(product?.price)}
                                        </span>
                                        <span className="font-semibold text-green-600">
                                            {Math.floor(product?.discountPercentage)}% OFF
                                        </span>
                                    </div>

                                    <div className="mt-1">
                                        <span className="font-mono mr-1">Qty.</span>
                                        <span className="text-base font-bold">
                                            {cartProducts.filter(id => id === product?._id).length}
                                        </span>
                                    </div>

                                    <div className="mt-0.5">
                                        <span className="font-mono mr-1">Total.</span>
                                        <span className="text-base font-bold">
                                            ₹{moneyComaSeperator(
                                                product?.price * cartProducts.filter(
                                                    id => id === product?._id
                                                ).length
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Buttons */}
            <div className={`flex max-sm:flex-wrap gap-x-6 p-5 pl-10 ${view !== 3 && "hidden"}`}>
                <button
                    type="button"
                    className={`${view !== 3 && "hidden"} my-2 uppercase py-3 px-10 bg-orange-600 font-semibold text-white tracking-wider rounded-sm`}
                    onClick={() => router.push("/cart/checkout?view=4")}
                >
                    Place Order
                </button>
                <button
                    type="button"
                    className={`${view !== 3 && "hidden"} my-2 uppercase py-3 px-10 bg-blue-600 font-semibold text-white tracking-wider rounded-sm`}
                    onClick={() => router.push("/cart")}
                >
                    Change item
                </button>
            </div>
        </div>
    )
}
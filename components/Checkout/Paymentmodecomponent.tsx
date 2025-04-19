import { useContext, useState, useEffect } from "react";
import Link from "next/link";
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

export default function CheckoutPaymentModeComp(
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
        <div className={`bg-white ${view === 4 && "border-blue-600 border-2 rounded"} shadow-sm shadow-gray-400 rounded-sm w-full my-5`}>

            {/* Headline */}
            <div className={`flex items-center gap-x-2 p-5 ${view === 4 && "bg-blue-600 text-white py-3 px-5 shadow-sm shadow-gray-400"}`}>
                <div className={`p-1 px-2 bg-gray-200 text-blue-700 text-xs font-semibold rounded mr-2`}>4</div>
                <div className="uppercase font-semibold tracking-wider text-lg">
                    payment mode
                </div>
                <IoCheckmarkOutline className={
                        `w-6 h-6 mb-1 text-green-600 ${(view === 4 || view < 4) && "hidden"}`
                    }
                />
            </div>

                
            <div>

            </div>

            {/* Buttons */}
            <div className={`flex gap-x-6 p-5 pl-10 ${view !== 4 && "hidden"}`}>
                <button
                    type="button"
                    className={`${view !== 4 && "hidden"} my-2 uppercase py-3 px-10 bg-orange-600 font-semibold text-white tracking-wider rounded-sm`}
                    onClick={() => router.push("/cart/checkout?view=4")}
                >
                    Place Order
                </button>
                {/* <button
                    type="button"
                    className={`${view !== 4 && "hidden"} my-2 uppercase py-3 px-10 bg-blue-600 font-semibold text-white tracking-wider rounded-sm`}
                    onClick={() => router.push("/cart")}
                >
                    Change item
                </button> */}
            </div>
        </div>
    )
}
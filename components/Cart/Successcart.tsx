import Link from "next/link";
import { HiCheckBadge } from "react-icons/hi2";

export default function Successcart() {
    return (
        <div className="flex flex-col p-8">
            <span className="text-start font-medium">
                <div className="flex text-3xl font-semibold mb-5">
                    Thanks for your Order! 🙂
                </div>
                <div className="text-lg flex">
                    Order successfull.
                    <HiCheckBadge className="w-6 h-6 text-green-600 ml-1" />
                </div>
                <p className="text-md text-sky-600">
                    An email has been sent regarding on this order.
                </p>
                <p className="text-md text-sky-600">
                    Clear your cart going to cart page, if you don't want to purchase the same products.
                </p>
            </span>
            <Link 
                href={'/orders'} 
                className="flex justify-center bg-black text-white text-lg font-semibold p-2 rounded-md w-1/3 mt-6"
            >
                Orders Page
            </Link>
        </div>
    )
}
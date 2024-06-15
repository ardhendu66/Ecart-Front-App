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
                <p className="text-lg">An email has been sent regarding on this order.</p>
            </span>
            <Link 
                href={'/'} 
                className="flex justify-center bg-black text-white py-2 px-4 rounded-md w-1/3 mt-6"
            >
                Go to Orders Page
            </Link>
        </div>
    )
}
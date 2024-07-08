import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function Emptycart() {
    return (
        <div className="w-full flex flex-col items-center justify-center p-8">
            <span className="text-5xl font-medium h-20 tracking-wide mb-20">
                Empty Cart
            </span>
            <Link 
                href={'/'} 
                className="flex bg-black text-white py-2 px-4 rounded-md"
            >
                <FaArrowLeftLong className="mr-3 w-6 h-6" />
                Go Back to Shopping
            </Link>
        </div>
    )
}
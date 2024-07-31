import { useContext, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { CartContextType, CartContext } from "@/Context/CartContext";
import ProfileDropdown from "@/components/profile/Dropdown";
import { IoMdCart } from "react-icons/io";
import { FaBars } from "react-icons/fa6";

export default function NormalHeaderWhileNoSession(
    { urlPath, setCollapseNavbar }: {
        urlPath: string, setCollapseNavbar: Dispatch<SetStateAction<boolean>>
    }
) {
    const { cartProducts } = useContext(CartContext) as CartContextType;

    return <>
        <div className="col-span-2 text-3xl text-center m-2">
            <Link 
                href={'/'} 
                className="w-1/2">
                Ecomstore
            </Link>
        </div>
        <nav className="col-span-4 flex justify-center text-gray-500 text-xl font-normal">
            <Link 
                href={'/'} 
                className="p-2 lg:m-2 md:mx-1 md:my-2"
            >
                Home
            </Link>
            <Link 
                href={'/products'} 
                className="p-2 lg:m-2 md:mx-1 md:my-2"
            >
                Products
            </Link>
            <Link 
                href={'/cart'} 
                className="flex justify-start text-gray-300 p-2"
            >
                <IoMdCart 
                    className={`w-[50px] h-[36px] ${!cartProducts.length ? "text-slate-500" : "text-red-600"}`}
                />
                <span 
                    className={`${!cartProducts.length && "hidden"} flex items-center justify-center w-7 h-7 bg-sky-600 text-white rounded-full -ml-4 -mt-2`}
                >
                    {cartProducts.length}
                </span>
                <span className="text-slate-500 mt-1">Cart</span>
            </Link>
        </nav>
        <span className="col-span-1 flex items-center justify-between">
            <Link
                href={`/auth/login?url=${urlPath}`}
                className="flex items-center justify-center font-semibold border-[1.6px] border-gray-500 lg:px-6 md:px-3 text-lg rounded-[4px] h-[44px] hover:bg-gray-200"
            >
                Log in
            </Link>
            <span className="mt-2 mr-2 md:hidden">
                <FaBars 
                    className="w-8 h-8 hover:cursor-pointer"
                    onClick={() => setCollapseNavbar(prev => !prev)}
                />
            </span>
        </span>
    </>
}
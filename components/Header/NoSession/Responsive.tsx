import { useContext, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { CartContextType, CartContext } from "@/Context/CartContext";
import ProfileDropdown from "@/components/profile/Dropdown";
import { IoMdCart } from "react-icons/io";
import { FaBars } from "react-icons/fa6";

export default function ResponsiveHeaderWhileNoSession(
    { collapseNavbar, setCollapseNavbar }: {
        collapseNavbar: boolean, setCollapseNavbar: Dispatch<SetStateAction<boolean>>
    }
) {
    const { cartProducts } = useContext(CartContext) as CartContextType;

    return <>
        <div className="text-3xl text-center m-2">
            <Link href={'/'} className="w-1/2 max-sm:w-1/3">
                Ecomm_Giant
            </Link>
        </div>
        <nav className={`flex flex-col items-center ${collapseNavbar && "hidden"} text-xl font-normal`}>
            <Link href={'/'} className="p-2 m-2">
                Home
            </Link>
            <Link href={'/products'} className="p-2 m-2">
                Products
            </Link>
            <Link href={'/cart'} className="flex justify-start p-2 m-2">
                <IoMdCart 
                    className="w-[50px] h-[36px] text-yellow-500"
                />
                <span className={`${!cartProducts.length && "hidden"} flex items-center justify-center w-7 h-7 bg-sky-600 text-white rounded-full -ml-4 -mt-2`}>
                    {cartProducts.length}
                </span>
                <span className="text-slate-500 mt-1">Cart</span>
            </Link>
        </nav>
        <div className="text-center mb-2">
            <Link 
                href={`/auth/login`}
                className="flex items-center justify-center m-1 py-2 px-6 text-lg font-semibold rounded-[4px] border-[1.6px] border-gray-500 hover:bg-gray-200"
            >
                Log in
            </Link>
        </div>
        <span className="absolute top-2 right-2 max-sm:right-3">
            <FaBars 
                className="w-8 h-8 hover:cursor-pointer"
                onClick={() => setCollapseNavbar(prev => !prev)}
            />
        </span>
    </>
}
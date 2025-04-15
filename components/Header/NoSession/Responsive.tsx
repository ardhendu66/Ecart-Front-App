import { useContext, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { CartContextType, CartContext } from "@/Context/CartContext";
import { IoMdCart } from "react-icons/io";
import { FaBars } from "react-icons/fa6";

export default function ResponsiveHeaderWhileNoSession(
    { collapseNavbar, setCollapseNavbar }: {
        collapseNavbar: boolean,
        setCollapseNavbar: Dispatch<SetStateAction<boolean>>
    }
) {
    const { cartProducts } = useContext(CartContext) as CartContextType;

    return (
        <div
            className={`flex items-center ${!collapseNavbar ? "flex-col" : "justify-between max-sm:gap-x-[2px]"} sm:gap-x-2 sm:gap-y-[2px]`}
        >
            <div
                className={`mt-2 ml-1 ${!collapseNavbar && "absolute top-2 left-2"} border-[0.6px] border-white rounded p-1 w-12 h-12`}
            >
                <FaBars
                    className="w-10 h-10 hover:cursor-pointer"
                    onClick={() => setCollapseNavbar(prev => !prev)}
                />
            </div>
            <div className={`text-3xl text-center ml-2 ${!collapseNavbar && "mt-3"}`}>
                <Link href={'/'} className="text-4xl">
                    Ecomstore
                </Link>
            </div>
            <div
                className={`flex items-center justify-center mt-1 ${!collapseNavbar && "w-full"}`}
            >
                <Link
                    href={`/auth/login`}
                    className={`flex items-center justify-center m-1 py-2 px-6 text-lg font-semibold rounded-[4px] text-gray-600 bg-yellow-500 hover:bg-yellow-400 shadow-md w-32 h-10 max-sm:w-20`}
                >
                    Log_in
                </Link>
            </div>
            <nav className={`flex flex-col items-center text-xl font-normal ${collapseNavbar && "hide-nav"}`}>
                <Link href={'/cart'} className="flex justify-start p-2 m-2">
                    <IoMdCart className="w-[50px] h-[36px] text-white" />
                    <span className={`${!cartProducts.length && "hidden"} flex items-center justify-center w-7 h-7 bg-yellow-600 text-white rounded-full -ml-4 -mt-2`}>
                        {cartProducts.length}
                    </span>
                </Link>
            </nav>
        </div>
    )
}
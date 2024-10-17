import { useContext, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { CartContextType, CartContext } from "@/Context/CartContext";
import ProfileDropdown from "@/components/profile/Dropdown";
import { IoMdCart } from "react-icons/io";
import { FaBars } from "react-icons/fa6";

interface NavbarProps {
    collapseNavbar: boolean, 
    setCollapseNavbar: Dispatch<SetStateAction<boolean>>
}

export default function ResponsiveHeaderWhileSession(
    { collapseNavbar, setCollapseNavbar } : NavbarProps
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
            <div className="text-3xl text-center m-2">
                <Link href={'/'} className="w-1/2 max-sm:w-1/3 text-4xl">
                    Ecomstore
                </Link>
            </div>
            <nav 
                className={`flex flex-col items-center text-xl font-normal`}
            >
                <Link href={'/cart'} className="flex justify-start p-2 m-2">
                    <IoMdCart 
                        className="w-[50px] h-[36px] text-white"
                    />
                    <span className={`${!cartProducts.length && "hidden"} flex items-center justify-center w-7 h-7 bg-yellow-600 text-white rounded-full -ml-4 -mt-2`}>
                        {cartProducts.length}
                    </span>
                    <span className="text-white mt-1">
                        Cart
                    </span>
                </Link>
            </nav>
            <span className="col-span-1 flex items-center justify-between">
                <ProfileDropdown />
            </span>
        </div>
    )
}
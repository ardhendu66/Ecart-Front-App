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
    { collapseNavbar, setCollapseNavbar }: NavbarProps
) {
    const { cartProducts } = useContext(CartContext) as CartContextType;

    return (
        <div className={`flex flex-col gap-3 px-4 ${collapseNavbar ? "items-center" : ""}`}>
            <div className="flex items-center justify-between w-full">
                <div className="p-2 border border-white rounded-md hover:bg-white/10 transition">
                    <FaBars
                        className="w-7 h-7 text-white cursor-pointer"
                        onClick={() => setCollapseNavbar(prev => !prev)}
                    />
                </div>
                <div>
                    <Link 
                        href="/" 
                        className="text-white text-2xl font-bold tracking-wide hover:text-yellow-300 transition"
                    >
                        Ecomstore
                    </Link>
                    <div>
                        {!collapseNavbar && (
                            <nav className="w-full flex flex-col gap-4 mt-2 mb-3">
                                <Link 
                                    href="/cart" 
                                    className="relative flex items-center gap-2 text-white hover:text-yellow-300 transition"
                                >
                                    <IoMdCart className="w-10 h-10" />
                                    {!!cartProducts.length && (
                                        <span 
                                            className="absolute -top-2 left-6 w-6 h-6 text-sm flex items-center justify-center bg-yellow-600 text-white rounded-full"
                                        >
                                            {cartProducts.length}
                                        </span>
                                    )}
                                    <span className="text-xl font-semibold">Cart</span>
                                </Link>
                            </nav>
                        )}
                    </div>
                </div>
                <ProfileDropdown />
            </div>
        </div>
    );
}  
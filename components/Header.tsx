import { CartContextType, CartContext } from "@/Context/CartContext";
import Link from "next/link";
import { useContext, useState } from "react";
import { IoMdCart } from "react-icons/io";
import { FaBars } from "react-icons/fa6";

export default function Header() {
    const { cartProducts } = useContext(CartContext) as CartContextType;
    const [collapseNavbar, setCollapseNavbar] = useState(true);  

    return (
        <>
            <header 
                className={`grid grid-cols-7 bg-slate-800 text-white max-md:hidden`}
            >
                <div className="col-span-2 text-3xl text-center m-2">
                    <Link 
                        href={'/'} 
                        className="w-1/2">
                        Ecommerce
                    </Link>
                </div>
                <nav className="col-span-4 flex justify-center">
                    <Link 
                        href={'/'} 
                        className="text-gray-300 p-2 lg:m-2 md:mx-1 md:my-2"
                    >
                        Home
                    </Link>
                    <Link 
                        href={'/products'} 
                        className="text-gray-300 p-2 lg:m-2 md:mx-1 md:my-2"
                    >
                        Products
                    </Link>
                    <Link 
                        href={'/categories'} 
                        className="text-gray-300 p-2 lg:m-2 md:mx-1 md:my-2"
                    >
                        Categories
                    </Link>
                    <Link 
                        href={'/account'} 
                        className="text-gray-300 p-2 lg:m-2 md:mx-1 md:my-2"
                    >
                        Account
                    </Link>
                    <Link 
                        href={'/cart'} 
                        className="flex justify-start text-gray-300 p-2 lg:m-2 md:mx-1 md:my-2"
                    >
                        <IoMdCart 
                            className="w-[50px] h-[36px] text-yellow-500"
                        />
                        <span 
                            className={`${!cartProducts.length && "hidden"} flex items-center justify-center w-7 h-7 bg-sky-600 text-white rounded-full -ml-4 -mt-2`}
                        >
                            {cartProducts.length}
                        </span>
                    </Link>
                </nav>
                <span className="col-span-1 flex justify-between">
                    <button 
                        className="bg-blue-700 text-white font-semibold m-1 lg:px-6 md:px-3 text-lg rounded-[4px] h-[44px] mt-2"
                    >
                        Log in
                    </button>
                    <span className="mt-2 mr-2 md:hidden">
                        <FaBars 
                            className="w-8 h-8 hover:cursor-pointer"
                            onClick={() => setCollapseNavbar(!collapseNavbar)}
                        />
                    </span>
                </span>
            </header>

            <header 
                className={`flex ${!collapseNavbar ? "flex-col" : "justify-around max-sm:justify-start"} bg-slate-800 text-white md:hidden transition-all`}
            >
                <div className="text-3xl text-center m-2">
                    <Link href={'/'} className="w-1/2 max-sm:w-1/3">
                        Ecommerce
                    </Link>
                </div>
                <nav className={`flex flex-col items-center ${collapseNavbar && "hidden"}`}>
                    <Link href={'/'} className="text-gray-300 p-2 m-2">
                        Home
                    </Link>
                    <Link href={'/products'} className="text-gray-300 p-2 m-2">
                        Products
                    </Link>
                    <Link href={'/categories'} className="text-gray-300 p-2 m-2">
                        Categories
                    </Link>
                    <Link href={'/account'} className="text-gray-300 p-2 m-2">
                        Account
                    </Link>
                    <Link href={'/cart'} className="flex justify-start text-gray-300 p-2 m-2">
                        <IoMdCart 
                            className="w-[50px] h-[36px] text-yellow-500"
                        />
                        <span className={`${!cartProducts.length && "hidden"} flex items-center justify-center w-7 h-7 bg-sky-600 text-white rounded-full -ml-4 -mt-2`}>
                            {cartProducts.length}
                        </span>
                    </Link>
                </nav>
                <div className="text-center mb-2">
                    <button 
                        className="bg-blue-700 text-white m-1 py-2 px-6 text-lg font-semibold rounded-[4px]"
                    >
                        Log in
                    </button>
                </div>
                <span className="absolute top-2 right-2 max-sm:right-3">
                    <FaBars 
                        className="w-8 h-8 hover:cursor-pointer"
                        onClick={() => setCollapseNavbar(!collapseNavbar)}
                    />
                </span>
            </header>
        </>
    )
}
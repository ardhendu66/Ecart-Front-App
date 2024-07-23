import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CartContextType, CartContext } from "@/Context/CartContext";
import { IoMdCart } from "react-icons/io";
import { FaBars } from "react-icons/fa6";

export default function Header() {
    const { cartProducts } = useContext(CartContext) as CartContextType;
    const [collapseNavbar, setCollapseNavbar] = useState(true);
    const [urlPath, setUrlPath] = useState("")
    const { status } = useSession();

    useEffect(() => {
        const url = localStorage.getItem("path");
        setUrlPath(prev => url as string);
    }, [])

    if(status === "authenticated") {
        <>
            <header 
                className={`grid grid-cols-7 bg-white text-black font-semibold max-md:hidden shadow-md py-2`}
            >
                <div className="col-span-2 text-3xl text-center m-2">
                    <Link 
                        href={'/'} 
                        className="w-1/2">
                        Ecomstore
                    </Link>
                </div>
                <nav className="col-span-4 flex justify-center text-gray-500">
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
                        href={'/account'} 
                        className="p-2 lg:m-2 md:mx-1 md:my-2"
                    >
                        Account
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
                    </Link>
                </nav>
                <span className="col-span-1 flex items-center justify-between">
                    <div
                        className="font-semibold border-2 border-gray-600 lg:px-6 md:px-3 text-lg rounded-[4px] h-[44px]"
                    >
                        Logged in
                    </div>
                    <span className="mt-2 mr-2 md:hidden">
                        <FaBars 
                            className="w-8 h-8 hover:cursor-pointer"
                            onClick={() => setCollapseNavbar(!collapseNavbar)}
                        />
                    </span>
                </span>
            </header>

            <header 
                className={`flex ${!collapseNavbar ? "flex-col" : "justify-around max-sm:justify-start"} bg-white text-black font-semibold md:hidden transition-all`}
            >
                <div className="text-3xl text-center m-2">
                    <Link href={'/'} className="w-1/2 max-sm:w-1/3">
                        Ecomm_Giant
                    </Link>
                </div>
                <nav className={`flex flex-col items-center ${collapseNavbar && "hidden"}`}>
                    <Link href={'/'} className="p-2 m-2">
                        Home
                    </Link>
                    <Link href={'/products'} className="p-2 m-2">
                        Products
                    </Link>
                    <Link href={'/account'} className="p-2 m-2">
                        Account
                    </Link>
                    <Link href={'/cart'} className="flex justify-start p-2 m-2">
                        <IoMdCart 
                            className="w-[50px] h-[36px] text-yellow-500"
                        />
                        <span className={`${!cartProducts.length && "hidden"} flex items-center justify-center w-7 h-7 bg-sky-600 text-white rounded-full -ml-4 -mt-2`}>
                            {cartProducts.length}
                        </span>
                    </Link>
                </nav>
                <div className="text-center mb-2">
                    <div 
                        className="bg-blue-700 text-white m-1 py-2 px-6 text-lg font-semibold rounded-[4px]"
                    >
                        Logged in
                    </div>
                </div>
                <span className="absolute top-2 right-2 max-sm:right-3">
                    <FaBars 
                        className="w-8 h-8 hover:cursor-pointer"
                        onClick={() => setCollapseNavbar(!collapseNavbar)}
                    />
                </span>
            </header>
        </>
    }

    return (
        <>
            <header 
                className={`grid grid-cols-7 bg-white text-black font-semibold max-md:hidden shadow-md py-2`}
            >
                <div className="col-span-2 text-3xl text-center m-2">
                    <Link 
                        href={'/'} 
                        className="w-1/2">
                        Ecomstore
                    </Link>
                </div>
                <nav className="col-span-4 flex justify-center text-gray-500">
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
                        href={'/account'} 
                        className="p-2 lg:m-2 md:mx-1 md:my-2"
                    >
                        Account
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
                            onClick={() => setCollapseNavbar(!collapseNavbar)}
                        />
                    </span>
                </span>
            </header>

            <header 
                className={`flex ${!collapseNavbar ? "flex-col" : "justify-around max-sm:justify-start"} bg-white text-black font-semibold md:hidden transition-all`}
            >
                <div className="text-3xl text-center m-2">
                    <Link href={'/'} className="w-1/2 max-sm:w-1/3">
                        Ecomm_Giant
                    </Link>
                </div>
                <nav className={`flex flex-col items-center ${collapseNavbar && "hidden"}`}>
                    <Link href={'/'} className="p-2 m-2">
                        Home
                    </Link>
                    <Link href={'/products'} className="p-2 m-2">
                        Products
                    </Link>
                    <Link href={'/account'} className="p-2 m-2">
                        Account
                    </Link>
                    <Link href={'/cart'} className="flex justify-start p-2 m-2">
                        <IoMdCart 
                            className="w-[50px] h-[36px] text-yellow-500"
                        />
                        <span className={`${!cartProducts.length && "hidden"} flex items-center justify-center w-7 h-7 bg-sky-600 text-white rounded-full -ml-4 -mt-2`}>
                            {cartProducts.length}
                        </span>
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
                        onClick={() => setCollapseNavbar(!collapseNavbar)}
                    />
                </span>
            </header>
        </>
    )
}
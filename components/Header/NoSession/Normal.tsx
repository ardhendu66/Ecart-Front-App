import { useState, useContext, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { CartContextType, CartContext } from "@/Context/CartContext";
import { IoMdCart } from "react-icons/io";
import { FaBars } from "react-icons/fa6";

export default function NormalHeaderWhileNoSession({ 
    setCollapseNavbar } : { setCollapseNavbar: Dispatch<SetStateAction<boolean>> 
}) {
    const { cartProducts } = useContext(CartContext) as CartContextType;
    const [searchInput, setSearchInput] = useState("");

    return <>
        <div className="col-span-2 text-3xl text-center m-2">
            <Link href={'/'} className="">
                Ecomstore
            </Link>
        </div>
        <div className="flex col-span-4 mt-2">
            <input 
                type="text"
                placeholder="Search products by name"
                className="w-[80%] px-4 text-black rounded-md mr-1 border-gray-400 border-[1.4px] outline-none font-normal h-10"
                onChange={e => setSearchInput(e.target.value)}
            />
            <button 
                type="button"
                className="bg-gray-400 h-10 font-normal text-white px-5 rounded-md shadow-md hover:bg-gray-500"
                onClick={e => {}}
            >
                Search
            </button>
        </div>
        <span className="col-span-1 flex items-center justify-between mt-1">
            <Link
                href={`/auth/login`}
                className="flex items-center justify-center font-semibold bg-bl py-[6px] lg:px-6 md:px-3 text-gray-600 text-lg rounded-[4px] bg-yellow-500 hover:bg-yellow-400 shadow-md"
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
        <nav className="col-span-1 flex text-white text-xl font-normal">
            <Link 
                href={'/cart'} 
                className="flex justify-start text-white p-2"
            >
                <IoMdCart className="w-[50px] h-[36px] text-white" />
                <span 
                    className={`${!cartProducts.length && "hidden"} flex items-center justify-center w-7 h-7 bg-yellow-600 text-white rounded-full -ml-4 -mt-2`}
                >
                    {cartProducts.length}
                </span>
                <span className="text-white mt-1 max-lg:hidden">Cart</span>
            </Link>
        </nav>
    </>
}
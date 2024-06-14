import { CartContextType, CartContext } from "@/Context/CartContext";
import Link from "next/link";
import { useContext } from "react";
import { IoMdCart } from "react-icons/io";

export default function Header() {
    const { cartProducts } = useContext(CartContext) as CartContextType;

    return (
        <header className="grid grid-cols-6 bg-slate-800 text-white">
            <Link href={'/'} className="col-span-2 text-3xl text-center m-2">
                Ecommerce
            </Link>
            <nav className="col-span-3 flex justify-center">
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
                        className="w-[50px] h-[36px] text-orange-400"
                    />
                    <span className={`${!cartProducts.length && "hidden"} flex items-center justify-center w-7 h-7 bg-sky-600 text-white rounded-full -ml-4 -mt-2`}>
                        {cartProducts.length}
                    </span>
                </Link>
            </nav>
            <button className="col-span-1 text-gray-300 m-1 p-2">
                Log in
            </button>
        </header>
    )
}
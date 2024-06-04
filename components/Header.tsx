import Link from "next/link";
import { CartProductState } from "@/pages";

export default function Header({cartProducts, setCartProducts}: CartProductState) {
    return (
        <header className="grid grid-cols-6 bg-slate-800 text-white">
            <Link href={'/'} className="col-span-2 text-3xl text-center m-2">
                Ecommerce
            </Link>
            <nav className="col-span-3 flex justify-center">
                <Link href={'/'} className="text-gray-300 p-2 m-2">Home</Link>
                <Link href={'/products'} className="text-gray-300 p-2 m-2">Products</Link>
                <Link href={'/categories'} className="text-gray-300 p-2 m-2">Categories</Link>
                <Link href={'/account'} className="text-gray-300 p-2 m-2">Account</Link>
                <Link href={'/cart'} className="text-gray-300 p-2 m-2">
                    Cart({cartProducts.length})
                </Link>
            </nav>
            <button className="col-span-1 text-gray-300 m-1 p-2">Log in</button>
        </header>
    )
}
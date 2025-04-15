import Link from "next/link";
import Header from "../Header";
import Layout from "../Layout"
import { FaShoppingCart } from "react-icons/fa";

export default function EmptyCart() {
    return (
        <Layout>
            <div className="sticky top-0 z-10 bg-white shadow-md">
                <Header />
            </div>

            {/* Empty Cart */}
            <div 
                className="bg-white rounded-sm shadow-sm p-10 sm:w-3/5 max-sm:w-[90%] text-center space-y-6 mx-auto mt-8"
            >
                <div className="flex justify-center">
                    <div className="bg-red-100 text-red-500 rounded-full p-6">
                        <FaShoppingCart className="text-5xl" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                    Your Cart is Empty
                </h2>
                <p className="text-gray-500">
                    Looks like you haven’t added anything to your cart yet.
                </p>
                <Link
                    href="/"
                    className="inline-block mt-4 px-6 py-3 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 transition uppercase tracking-wide"
                >
                    Continue Shopping
                </Link>
            </div>
        </Layout>
    );
};
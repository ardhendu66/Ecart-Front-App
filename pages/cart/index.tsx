import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CartContext, CartContextType } from "@/Context/CartContext";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Emptycart from "@/components/Cart/Emptycart";
import Cartproducts from "@/components/Cart/Cartproducts";
import PriceDetails from "@/components/Cart/PriceDetails";
import { ClipLoader } from "react-spinners";

export default function Cart() {
    const { 
        cartProducts, isLoadingCart, uniqueProductsOnCart 
    } = useContext(CartContext) as CartContextType;
    const [goingToCheckoutPage, setGoingToCheckoutPage] = useState(false);
    const router = useRouter();

    useEffect(() => {
        document.title = 'Shopping Cart';
    }, []);
    
    if(!cartProducts.length) {
        return <Emptycart />
    }
    

    return (
        <Layout>
            <div className="sticky top-0 z-10 bg-white shadow-md">
                <Header />
            </div>
            <div className="flex flex-col items-start justify-center my-10 px-6">
                <div className="flex max-md:flex-col max-md:gap-y-6 items-start justify-between w-full gap-x-4">
                    <div className="w-2/3 max-md:w-full flex flex-col gap-y-6">
                        <div className="bg-white rounded-sm px-3 max-md:px-7">
                            <h2 className="flex justify-between text-3xl text-left ml-5 my-4 text-gray-500">
                                Shopping Cart
                            </h2>
                            <Cartproducts products={uniqueProductsOnCart} />
                        </div>
                        <button
                            type="button"
                            className={`max-md:hidden px-2 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 transition text-white text-xl font-semibold rounded-sm py-4 shadow-md ${goingToCheckoutPage && "py-2"} tracking-wide uppercase`}
                            onClick={() => {
                                setGoingToCheckoutPage(prev => true);
                                setTimeout(() => router.push('/cart/checkout?view=1'), 1000);
                            }}
                        >
                            {goingToCheckoutPage ? (
                                <div className="flex items-center gap-3">
                                    Going to Checkout page <ClipLoader color="white" size={30} />
                                </div>
                            ) : (
                                "Continue to Checkout"
                            )}
                        </button>
                    </div>

                    <PriceDetails 
                        cartProducts={cartProducts} 
                        uniqueProductsOnCart={uniqueProductsOnCart}
                        outerDivStyle="w-1/3 max-md:w-full bg-white p-4"
                    />
                </div>

                <button
                    type="button"
                    className={`md:hidden mt-10 w-full px-2 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 transition text-white text-xl font-semibold rounded-sm py-4 shadow-md ${goingToCheckoutPage && "py-2"} tracking-wide uppercase`}
                    onClick={() => {
                        setGoingToCheckoutPage(prev => true);
                        setTimeout(() => router.push('/cart/checkout?view=1'), 1000);
                    }}
                >
                    {goingToCheckoutPage ? (
                        <div className="flex items-center gap-3">
                            Going to Checkout page <ClipLoader color="white" size={30} />
                        </div>
                    ) : (
                        "Continue to Checkout"
                    )}
                </button>
            </div>
        </Layout>
    );
}
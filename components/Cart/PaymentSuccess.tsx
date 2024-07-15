import { useContext, useEffect } from "react"
import axios from "axios";
import Link from "next/link";
import { CartContext, CartContextType } from "@/Context/CartContext";
import { HiCheckBadge } from "react-icons/hi2";
import Header from "../Header";
import { toast } from "react-toastify";

export default function PaymentSuccess() {
    const { cartProducts } = useContext(CartContext) as CartContextType;

    useEffect(() => {
        const adjustQuantityOfProducts = async () => {
            console.log("render products");
            axios.post('/api/product/adjust-quantity', { ids: cartProducts })
            .then(res => {               
                if(res.status === 200) {
                    toast.success(res.data.message, { position: "top-center" });
                }
                else if(res.status === 202) {
                    toast.info(res.data.message, { position: "top-center" });
                }
            })
            .catch(err => {
                toast.error(err.message, { position: "top-center" });
                console.error(err);                
            })
        }
        adjustQuantityOfProducts();
    }, [])


    return (
        <main className="w-screen min-h-screen bg-gray-300">
            <div className="sticky top-0 z-10">
                <Header />
            </div>
            <div className="flex items-start justify-between gap-1 mt-6">
                <div className="flex items-center justify-center w-full p-4">
                    <div className="p-4 bg-white w-[70%] max-md:w-full rounded-md">
                        <div className="flex flex-col p-8">
                            <span className="text-start font-medium">
                                <div className="flex text-3xl font-semibold mb-10">
                                    Thanks for your Order! 🙂
                                </div>
                                <div className="text-lg flex mb-5">
                                    Order successfull.
                                    <HiCheckBadge className="w-6 h-6 text-green-600 ml-1" />
                                </div>
                                <p className="text-md text-sky-600">
                                    An email has been sent regarding on this order.
                                </p>
                                <p className="text-md text-sky-600 mb-5">
                                    <span>Clear your cart going to</span>
                                    <Link 
                                        href={'/cart'} 
                                        className="mx-2 underline italic font-semibold text-lg"
                                    >cart</Link>
                                    <span>
                                        page, if you don't want to purchase the same products.
                                    </span>
                                </p>
                            </span>
                            <Link 
                                href={'/orders'} 
                                className="flex justify-center bg-black text-white text-lg font-semibold p-2 rounded-md w-1/3 mt-6"
                            >
                                Orders Page
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
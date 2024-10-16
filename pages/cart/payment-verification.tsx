import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import { loaderColor } from "@/config/config";
import { FadeLoader, MoonLoader } from "react-spinners";
import { HiCheckBadge } from "react-icons/hi2";

export default function PaymentVerification() {
    const [paymentVerifying, setPaymentVerifying] = useState(false);
    const router = useRouter();
    const orderId = router?.query?.orderId;
    const userId = router?.query?.userId;

    console.log(orderId, userId);    

    useEffect(() => {
        setPaymentVerifying(true);
        setTimeout(() => setPaymentVerifying(false), 5000)
    }, [])

    if(paymentVerifying) {
        return (
            <Layout>
                <div className="sticky top-0 z-10">
                    <Header />
                </div>
                <div className="h-[430px] flex flex-col items-center pt-12 gap-y-8">
                    <MoonLoader
                        color={loaderColor}
                        size={150}
                        speedMultiplier={0.6}
                    />
                    <div className="flex gap-x-5 items-end justify-center ml-5">
                        <span className="text-2xl mb-1">Payment verifying</span>
                        <FadeLoader 
                            color={loaderColor}
                        />
                    </div>
                    <p>
                        Please don't close this window or reload this page while your payment is being verified...
                    </p>
                </div>
                <Footer />
            </Layout>
        )
    }


    return (
        <Layout>
            <div className="sticky top-0 z-10">
                <Header />
            </div>
            <main className="w-screen min-h-[400px]">
                <div className="flex items-start justify-between gap-1">
                    <div className="flex items-center justify-center w-full p-4">
                        <div className="p-4 bg-white w-[60%] max-md:w-full">
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
                                    href={'/profile/orders'} 
                                    className="flex justify-center bg-black text-white text-lg font-semibold p-2 rounded-md w-1/3 mt-6"
                                >
                                    Orders Page
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </Layout>
    )
}
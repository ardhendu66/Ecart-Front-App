import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { UserDetailsContext, UserDetailsContextType } from '@/Context/UserDetails';
import { CartContext, CartContextType } from '@/Context/CartContext';
import Custom404 from '../404';
import { decodeData } from '@/utils/encode_decode';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function Payment() {
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const { userDetails } = useContext(UserDetailsContext) as UserDetailsContextType;
    const router = useRouter();
    const { pid: paymentId } = router.query;
    const userObject = typeof paymentId === 'string' ? decodeData(paymentId, "pid") : null;

    if(!userObject) {
        console.error('Failed to decode user data');
        return null;
    }

    const { userId, totalPrice, paymentMode, previousView, walletId }: any = userObject;
    
    if(userId === userDetails?._id && (paymentMode === "wallet" || paymentMode === "card") && totalPrice && previousView === 4 && walletId) {  
              
        const handleOnClick = () => {
            setPaymentProcessing(true);
            axios.put(`/api/wallet/action?userId=${userDetails?._id}&amount=${totalPrice}&type=deduct`)
                .then(res => {
                    if(res.status === 200) {
                        setTimeout(() => {
                            // toast.success('Payment successfull');
                            setPaymentProcessing(false);
                            setPaymentSuccess(true);
                        }, 2000);
                    }
                })
                .catch((err: AxiosError) => {
                    console.error(err.toJSON()); 
                    toast.error(err.response?.data as string || err.message);                   
                })
                .finally(() => setTimeout(() => router.push('/cart/checkout?view=1'), 6000));
        }


        return (
            <Layout>
                <div className={`sticky top-0 z-10 ${(paymentProcessing || paymentSuccess) && 'hidden'}`}>
                    <Header />
                </div>
                
                <div className={`flex flex-col items-center justify-center mt-10 gap-y-5 ${(paymentProcessing || paymentSuccess) && 'hidden'}`}>
                    <p className='text-lg'>
                        Please confirm that you want to pay using <strong>Wallet</strong> for the products in your cart.
                    </p>
                    <button
                        type='button'
                        className="bg-orange-600 text-white px-10 py-3 rounded-sm uppercase text-xl tracking-wider font-semibold"
                        onClick={handleOnClick}
                    >
                        pay through wallet
                    </button>
                </div>

                {/* Payment Processing */}
                <div className={`${(!paymentProcessing || paymentSuccess) && 'hidden'} flex flex-col items-center -mt-16`}>
                    <div className='w-3/5 max-sm:w-full max-sm:px-7 max-md:w-2/3'>
                        <DotLottieReact
                            src="https://lottie.host/b2c9919a-becc-40fc-a469-1c094e68a056/MVd9KDZfFr.lottie"
                            loop
                            autoplay
                        />
                    </div>
                    <p className='text-xl -mt-10'>
                        Your <strong>Payment</strong> is being processed, do not 
                        <strong>Close</strong> or <strong>Refresh</strong> this window.
                    </p>
                </div>

                {/* Payment Done */}
                {paymentSuccess && !paymentProcessing && (
                    <div className="flex items-center justify-center flex-col">
                        <div className="w-3/5 max-sm:w-full max-sm:px-7 max-md:w-2/3">
                        <DotLottieReact
                            src="https://lottie.host/0c195968-d871-434c-8e7e-7073b3e92afb/7ts8kJNcrc.lottie"
                            loop={false}
                            autoplay
                        />
                        </div>
                        <p className="text-3xl font-semibold font-mono -mt-6">
                            Payment successfull.
                        </p>
                    </div>
                )}
            </Layout>
        )
    }

    return <Custom404 />
}
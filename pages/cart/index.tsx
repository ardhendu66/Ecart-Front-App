import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import Cartproducts from "@/components/Cart/Cartproducts";
import Emptycart from "@/components/Cart/Emptycart";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import { moneyComaSeperator } from "@/config/functions";
import { Product } from "@/config/types";
import { CartContext, CartContextType } from "@/Context/CartContext";
import { UserDetailsContext, UserDetailsContextType } from "@/Context/UserDetails";
import { ClipLoader, FadeLoader, MoonLoader } from "react-spinners";
import { loaderColor } from "@/config/config";
import { toast } from "react-toastify";

export default function Cart() {
    const { cartProducts, clearCartProducts } = useContext(CartContext) as CartContextType;
    const { 
        userDetails, setUserDetails 
    } = useContext(UserDetailsContext) as UserDetailsContextType;
    const [products, setProducts] = useState<Product[]>([]);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const router = useRouter();
     
    useEffect(() => {
        document.title = 'Cart';
    }, [])
    
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await axios.post('/api/cart/get-products', {
                    ids: cartProducts 
                })          
                setProducts(res.data);       
            }
            catch(err) {
                console.error(err);                
            }
        }
        fetchProducts();
    }, [cartProducts])

    useEffect(() => {
        let count = 0;
        if(count === 0) {
            setPaymentProcessing(true);
            axios.post("/api/cart/verify-token", { 
                userId: userDetails?._id, token: router?.query.token
            })
            .then(res => {
                if(res.status === 200 && res.data.success === true) {
                    setPaymentProcessing(false);
                    setPaymentSuccess(true);
                    setTimeout(() => {
                        router.push("/cart/payment-success");
                    }, 6000);
                }
            })
            .catch((err: AxiosError) => {
                console.error(err.response?.data || err.message);
                //@ts-ignore
                axios.delete(`/api/cart/delete-order?orderId=${err.response?.data.orderId}`)
                .then(resp => {
                    if(resp.status === 200) {
                        setTimeout(() => {
                            router.push("/cart/payment-failed");
                        }, 3000)
                    }
                    else {
                        console.error(resp.data);                        
                    }
                })
                .catch((err: AxiosError) => console.error(err))
            })
            count = count + 1;
        }
    }, [router.query])

    var subTotalPrice = 0;
    for(const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        subTotalPrice += price;
    }

    const handleOnPaymentProcessing = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPaymentProcessing(true);
        axios.post('/api/cart/checkout', {
            userId: userDetails._id, 
            email: userDetails.email,
            products: cartProducts, subTotal: subTotalPrice
        })
        .then(res => {
            if(res.status === 200) {
                console.log("Payment_Res: ", res.data);
                router.push(res.data.url);
            }         
        })
        .catch((err: AxiosError) => {
            console.error({
                message: err.message,
                paymentMsg: "Payment process failed!"
            });
            toast.error("Payment processing failed!", { position: "top-center" })
        })
    }

    if(router?.query.token) {
        return (
            <Layout>
                <div className="sticky top-0 z-10">
                    <Header />
                </div>
                <div className="h-[700px] flex flex-col items-center pt-12 gap-y-8">
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
    
    if(!cartProducts.length) {
        return <Emptycart/>
    }

    return(
        <Layout>
            <div className="sticky top-0 z-10">
                <Header />
            </div>
            <div className="flex flex-col items-center justify-center gap-1 my-4">
                <div className="flex items-center justify-center w-[70%] max-md:w-full">
                    <div className="p-4 bg-white w-full shadow-sm">
                        <div className="w-full p-8 pt-2">
                            <h2 
                                className="flex justify-between text-5xl text-left font-semibold mb-10 tracking-tighter"
                            >
                                My Shopping Cart
                                <button
                                    className="text-red-600 text-xl font-semibold border-red-600 border-[1.5px] px-5 p-2 rounded-md shadow-sm tracking-wide"
                                    onClick={() => clearCartProducts()}
                                >
                                    Clear cart
                                </button>
                            </h2>

                            <Cartproducts 
                                products={products} 
                            />
                            
                            <div className="text-xl text-end border-black border-t-[1.5px] pt-2">
                                <span className="font-medium mr-2">
                                    Subtotal:
                                </span>
                                <span className="text-sky-900 font-semibold tracking-tighter">
                                    ₹{moneyComaSeperator(subTotalPrice)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[70%] max-md:w-full mt-4 mb-6 shadow">
                    <div className="bg-white pl-10 p-8">
                        <h2 className="text-2xl ">Delivery Address</h2>
                        <div className="border-gray-300 border mt-3 p-4">
                            <div className="text-lg font-semibold mb-2">
                                {userDetails?.address?.name!}
                            </div>
                            <div className="flex flex-wrap gap-x-2 gap-y-1 text-gray-400 mb-2">
                                <span className="border-gray-300 border px-2 rounded">
                                    {userDetails?.address?.address}
                                </span>
                                <span className="border-gray-300 border px-2 rounded">
                                    Locality - {userDetails?.address?.locality}
                                </span>
                                <span className="border-gray-300 border px-2 rounded">
                                    City - {userDetails?.address?.city_district_town}
                                </span>
                                <span className="border-gray-300 border px-2 rounded">
                                    HouseNo. - {userDetails?.address?.houseNo}
                                </span>
                                <span className="border-gray-300 border px-2 rounded">
                                    Landmark - {userDetails?.address?.landmark}
                                </span>
                            </div>
                            <span className="border-gray-300 border px-2 rounded py-1 text-gray-500">
                                {userDetails?.address?.state} - 
                                {userDetails?.address?.pincode},
                                &nbsp; {"India"}
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    className={`flex items-center justify-center bg-blue-600 text-white text-xl w-[70%] max-md:w-full rounded shadow font-semibold mb-8 ${paymentProcessing ? "p-0" : "p-3"}`}
                    onClick={(e) => handleOnPaymentProcessing(e)}
                >
                {
                    paymentProcessing ? <ClipLoader color="white" size={40} speedMultiplier={0.7} /> : "Continue to Payment"
                }
                </button>
            </div>
            <Footer />
        </Layout>
    )
}
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
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
import { WalletClass } from "@/config/types";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Cart() {
    const { cartProducts, clearCartProducts } = useContext(CartContext) as CartContextType;
    const { 
        userDetails, setUserDetails 
    } = useContext(UserDetailsContext) as UserDetailsContextType;
    const [products, setProducts] = useState<Product[]>([]);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentMode, setPaymentMode] = useState("wallet");
    const router = useRouter();
     
    useEffect(() => {
        document.title = 'Cart';
    }, [])
    
    useEffect(() => {
        const fetchProducts = () => {
            axios.post('/api/cart/get-products', {
                ids: cartProducts 
            })
            .then(res => setProducts(res.data))
            .catch((err: AxiosError) => {
                console.error({
                    message: err.message,
                    name: err.name,
                    response: err.response?.data,
                    statusCode: err.response?.status || err.status
                })
                console.error(err.toJSON());
            })
        }
        fetchProducts();
    }, [cartProducts])

    var subTotalPrice = 0;
    for(const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        subTotalPrice += price;
    }

    const handleOnPaymentProcessing = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(paymentMode === "wallet") {

        }
        else if(paymentMode === "card") {
            setPaymentProcessing(true);
            axios.post('/api/cart/checkout', {
                userId: userDetails._id,
                email: userDetails.email,
                products: cartProducts,
                subTotal: subTotalPrice,
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
                    paymentMsg: "Initial payment request failed!"
                });
                toast.error("Initial payment request failed!", { position: "top-center" });
            })
        }
        else if(paymentMode === "upi") {
            toast.error("UPI mode currently unavailable", { position: "top-center" })
        }

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
                    <div className="p-4 bg-white w-full shadow">
                        <div className="w-full p-8 pt-2">
                            <h2 
                                className="flex justify-between text-5xl text-left font-semibold mb-10"
                            >
                                <span className="flex gap-x-3 text-3xl">
                                    My Cart
                                </span>
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

                <UserAddressDetails />

                <PaymentMode 
                    totalPrice={subTotalPrice} 
                    paymentMode={paymentMode}
                    setPaymentMode={setPaymentMode}
                />

                <button
                    type="button"
                    className={`flex items-center justify-center bg-blue-600 text-white text-2xl w-[70%] max-md:w-full rounded shadow font-semibold mb-8 py-3`}
                    onClick={(e) => handleOnPaymentProcessing(e)}
                >
                {
                    paymentProcessing
                        ? 
                    <ClipLoader color="white" size={40} speedMultiplier={0.7} /> 
                        : 
                    "Continue to Payment"
                }
                </button>
            </div>
            <Footer />
        </Layout>
    )
}

const UserAddressDetails = () => {
    const { userDetails } = useContext(UserDetailsContext) as UserDetailsContextType;

    return (
        <div className="w-[70%] max-md:w-full my-4 shadow">
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
    )
}

interface PaymentModeProps {
    totalPrice: number,
    paymentMode: string,
    setPaymentMode: Dispatch<SetStateAction<string>>
}
const PaymentMode = ({totalPrice, paymentMode, setPaymentMode}: PaymentModeProps) => {
    const [walletDetails, setWalletDetails] = useState<WalletClass | null>(null);
    const { userDetails } = useContext(UserDetailsContext) as UserDetailsContextType;

    const fetchWalletDetails = () => {
        axios.get(`/api/wallet/get-details?userId=${userDetails._id}`)
            .then(res => setWalletDetails(res.data.wallet))
            .catch((err: AxiosError) => console.error(err.toJSON()));
    };

    useEffect(() => {
        if(userDetails) {
            fetchWalletDetails();
        }
    }, [userDetails]);

    return (
        <div className="w-[70%] max-md:w-full bg-white shadow px-10 py-8 mb-6">
            <div className="text-2xl">
                Select Payment mode
            </div>
            <div className="flex gap-x-10 border border-gray-300 px-10 py-4 mt-4">

                <div 
                    className={`${paymentMode === "wallet" ? "border-sky-900 border-[1.6px] py-2 px-4 rounded" : "border-sky-900 border py-2 px-4 rounded"} ${paymentMode === "wallet" && Number(walletDetails?.balance) < totalPrice && "opacity-45 text-gray-300"}`}
                >
                    <input 
                        type="radio" 
                        value="wallet"
                        checked={paymentMode === "wallet"}
                        onChange={() => setPaymentMode("wallet")}
                        className="mr-1 scale-125"
                    />
                    <label htmlFor="">Wallet</label>
                    <div 
                        className={`mt-1 border-gray-300 font-semibold border py-[2px] px-[6px] rounded ${paymentMode !== "wallet" && "hidden"}`}
                    >
                        <span className="text-xs">Available balance: </span>&nbsp;
                        <span className="font-extrabold">
                            ₹{moneyComaSeperator(walletDetails?.balance || 0)}
                        </span>
                        <div className={
                            `text-xs ${Number(walletDetails?.balance) > totalPrice && "hidden"}`
                        }>
                            Low Balance. choose <u>Card</u> or <u>UPI</u>.
                        </div>
                    </div>
                </div>

                <div className={`${paymentMode === "card" ? "border-sky-900 border-[1.6px] py-2 px-4 rounded" : "border-sky-900 border py-2 px-4 rounded"} max-h-10`}>
                    <input 
                        type="radio" 
                        value="card"
                        checked={paymentMode === "card"}
                        onChange={() => setPaymentMode("card")}
                        className="mr-1 scale-125"
                    />
                    <label htmlFor="">Card</label>
                </div>

                <div className={`${paymentMode === "upi" ? "border-sky-900 border-[1.6px] py-2 px-4 rounded" : "border-sky-900 border py-2 px-4 rounded"} max-h-10`}>
                    <input 
                        type="radio" 
                        value="upi"
                        checked={paymentMode === "upi"}
                        onChange={() => setPaymentMode("upi")}
                        className="mr-1 scale-125"
                    />
                    <label htmlFor="">UPI</label>
                </div>

            </div>
        </div>
    )
}
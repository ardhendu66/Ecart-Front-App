import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { User } from "@/Context/UserDetails";
import { CartContext, CartContextType } from "@/Context/CartContext";
import { Product } from "@/config/types";
import { Tooltip } from "react-tooltip";
import { IoCheckmarkOutline } from "react-icons/io5";
import { moneyComaSeperator } from "@/config/functions";
import { WalletClass } from "@/config/types";
import { CiWallet } from "react-icons/ci";
import { CiCreditCard1 } from "react-icons/ci";
import { ClipLoader } from "react-spinners";
import { encodeData } from "@/utils/encode_decode";
import toast from "react-hot-toast";


interface CheckoutComponentProps {
    userDetails: User;
    view: number;
}

export default function CheckoutPaymentModeComp(
    { userDetails, view }: CheckoutComponentProps) 
{
    const { cartProducts, uniqueProductsOnCart } = useContext(CartContext) as CartContextType;
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedPaymentMode, setSelectedPaymentMode] = useState<string>("wallet");
    const [walletDetails, setWalletDetails] = useState<WalletClass | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const fetchCartProducts = () => {
        axios.post('/api/cart/find/all-items', {
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

    const fetchWalletDetails = () => {
        axios.get(`/api/wallet/action?userId=${userDetails._id}`)
            .then(res => setWalletDetails(res.data.wallet))
            .catch((err: AxiosError) => console.error(err.toJSON()));
    };


    useEffect(() => {
        fetchCartProducts();
    }, [cartProducts]);

    useEffect(() => {
        if(userDetails) {
            fetchWalletDetails();
        }
    }, [userDetails]);



    return (
        <div className={`bg-white ${view === 4 && "border-blue-600 border-2 rounded"} shadow-sm shadow-gray-400 rounded-sm w-full my-5`}>

            {/* Headline */}
            <div className={`flex items-center gap-x-2 p-5 ${view === 4 && "bg-blue-600 text-white py-3 px-5 shadow-sm shadow-gray-400"}`}>
                <div className={`p-1 px-2 bg-gray-200 text-blue-700 text-xs font-semibold rounded mr-2`}>4</div>
                <div className={`uppercase font-semibold tracking-wider text-lg ${view !== 4 && "text-gray-400"}`}>
                    payment mode
                </div>
                <IoCheckmarkOutline 
                    className={`w-6 h-6 mb-1 text-green-600 ${(view === 4 || view < 4) && "hidden"}`}
                />
            </div>

                
            <div className={`px-10 pt-5 flex flex-col gap-y-3 ${view !== 4 && "hidden"}`}>
                <div className={`${selectedPaymentMode === "wallet" && "border-orange-500 border-[1.4px] rounded bg-gray-100"} px-4 py-3`}>
                    <div 
                        className={`text-lg font-semibold tracking-wide cursor-pointer mb-2 ${selectedPaymentMode === "wallet" && "underline"} flex gap-x-3`}
                        onClick={() => setSelectedPaymentMode("wallet")}
                    >
                        <CiWallet className="w-8 h-8" /> Wallet Payment
                    </div>
                    {
                        selectedPaymentMode === "wallet" &&
                        <div>
                            <div>
                                Bal : ₹{moneyComaSeperator(walletDetails?.balance as number)}
                            </div>
                        </div>
                    }
                </div>
                <div 
                    className={`${selectedPaymentMode === "card" && "border-orange-500 border-[1.4px] rounded bg-gray-100 underline"} px-4 py-3 font-semibold text-lg cursor-pointer flex gap-x-3`}
                    onClick={() => setSelectedPaymentMode("card")}
                >
                    <CiCreditCard1 className="w-8 h-8" /> Card Payment
                </div>
            </div>

            {/* Buttons */}
            <div className={`flex gap-x-6 p-5 pl-10 ${view !== 4 && "hidden"}`}>
                <button
                    type="button"
                    className={`${view !== 4 && "hidden"} my-2 uppercase ${isLoading ? "pt-1" : "py-3 px-10"} bg-orange-600 font-semibold text-white tracking-wider rounded-sm sm:w-60`}
                    onClick={() => {
                        if(selectedPaymentMode === "wallet") {
                            var subTotalPrice = 0, charge = 51 + 9;
                            for(const productId of cartProducts) {
                                const product = uniqueProductsOnCart.find(
                                    p => p._id === productId
                                );
                                subTotalPrice += product?.price || 0;
                            }
                            if(walletDetails?.balance! < subTotalPrice + charge) {
                                toast.error(
                                    "Insufficient balance in wallet. Either recharge wallet or use other payment method.",
                                    {position: "top-center", duration: 4000}
                                );
                                return;
                            }
                            const uobj = {
                                userId: userDetails?._id,
                                totalPrice: subTotalPrice + charge,
                                paymentMode: "wallet",
                                previousView: 4,
                                walletId: walletDetails?._id!
                            }
                            setIsLoading(true);
                            setTimeout(() => {
                                setIsLoading(false);
                                router.push(`/cart/payment?pid=${encodeData(uobj, "pid")}`);
                            }, 1500);
                        }
                    }}
                >
                    {isLoading ? <ClipLoader size={40} color="white" /> : "Pay Now"}
                </button>
            </div>

        </div>
    )
}
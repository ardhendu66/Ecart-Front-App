import { useState, useEffect, useContext, Dispatch, SetStateAction } from "react";
import axios, { AxiosError } from "axios";
import { UserDetailsContext, UserDetailsContextType } from "@/Context/UserDetails";
import { WalletClass } from "@/config/types";
import { moneyComaSeperator } from "@/config/functions";

interface PaymentModeProps {
    totalPrice: number,
    paymentMode: string,
    setPaymentMode: Dispatch<SetStateAction<string>>
}

export default function PaymentMode({totalPrice, paymentMode, setPaymentMode}:PaymentModeProps) {
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
                    className={`${paymentMode === "wallet" ? "border-sky-900 border-[1.6px] py-2 px-4 rounded" : "py-2 px-4 rounded"} ${paymentMode === "wallet" && Number(walletDetails?.balance) < totalPrice && "opacity-45 text-gray-300"}`}
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

                <div className={`${paymentMode === "card" ? "border-sky-900 border-[1.6px] py-2 px-4 rounded" : "py-2 px-4 rounded"} max-h-10`}>
                    <input 
                        type="radio" 
                        value="card"
                        checked={paymentMode === "card"}
                        onChange={() => setPaymentMode("card")}
                        className="mr-1 scale-125"
                    />
                    <label htmlFor="">Card</label>
                </div>

                <div className={`${paymentMode === "upi" ? "border-sky-900 border-[1.6px] py-2 px-4 rounded" : "py-2 px-4 rounded"} max-h-10`}>
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
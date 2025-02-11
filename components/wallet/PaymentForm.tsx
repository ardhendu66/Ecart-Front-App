import { useState, useContext } from "react";
import axios, { AxiosError } from "axios";
import { Loader } from "rsuite";
import 'rsuite/dist/rsuite.min.css';
import { toast } from "react-toastify";
import { UserDetailsContext, UserDetailsContextType } from "@/Context/UserDetails";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface WalletProps {
    onSuccessfulPayment: () => void;
}

export default function WalletPaymentForm({ onSuccessfulPayment }: WalletProps) {
    const [rechargeAmount, setRechargeAmount] = useState<number>();
    const [isRechargingWallet, setIsRechargingWallet] = useState(false);
    const { userDetails } = useContext(UserDetailsContext) as UserDetailsContextType;
    const stripe = useStripe();
    const elements = useElements();

    const handleRecharge = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!stripe || !elements) {
            return;
        }
        if((rechargeAmount !== undefined) && (0 < rechargeAmount && rechargeAmount <= 100000)) {
            setIsRechargingWallet(true);
            try {
                const res = await axios.post(
                    `/api/wallet/checkout?userId=${userDetails._id}&price=${rechargeAmount}`
                )
                const { clientSecret } = res.data;
                const cardElement = elements.getElement(CardElement);
                if (!cardElement) {
                    return;
                }
                const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: { card: cardElement },
                });

                if(paymentResult.error) {
                    toast.error(paymentResult.error.message, { position: "top-center" });
                }
                else if (paymentResult.paymentIntent?.status === "succeeded") {
                    axios.put(`/api/wallet/action?userId=${userDetails._id}&amount=${rechargeAmount}&type=add`)
                    .then(res => {
                        toast.success("Recharge successful!", { position: "top-center" });
                        setRechargeAmount(undefined);
                        onSuccessfulPayment();
                    })
                    .catch((err: AxiosError) => {
                        console.error(err.toJSON())
                        toast.error("Payment failed, please try again", { position: "top-center" });
                    });
                }
            }
            catch(error) {
                console.error("Error processing payment", error);
                toast.error("Payment failed. Please try again.", { position: "top-center" });
            }
            finally {
                setIsRechargingWallet(false);
            }
        }
    };

    return (
        <form
            onSubmit={handleRecharge}
            className="w-full bg-white p-6 shadow-md rounded mt-7"
        >
            <h2 className="text-2xl font-extrabold mb-5">
                Recharge Your Wallet
            </h2>
            <input
                type="number"
                className="w-full border-black border-[1.4px] rounded outline-none py-1 px-4 text-xl font-bold mb-4"
                placeholder="Enter amount"
                value={rechargeAmount}
                onChange={(e) => setRechargeAmount(Number(e.target.value))}
                required
            />
            <CardElement
                className="border rounded p-3 mb-4"
                options={{ hidePostalCode: true }}
            />
            <button
                type="submit"
                disabled={!stripe || isRechargingWallet}
                className={`w-full bg-blue-600 text-white rounded ${isRechargingWallet ? "p-0" : "p-2"}`}
            >
            {
                isRechargingWallet ? 
                <Loader size="md" color="white" speed="slow" className="mt-1" /> : 
                "Add Money to Wallet"
            }
            </button>
        </form>
    )
}
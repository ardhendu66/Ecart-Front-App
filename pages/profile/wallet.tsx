import { useState, useEffect, useContext } from "react";
import Header from "@/components/Header";
import ProtectedLayout from "@/components/Layout";
import { WalletClass } from "@/config/types";
import Footer from "@/components/Footer";
import { GiWallet } from "react-icons/gi";
import { FaWallet } from "react-icons/fa6";
import axios, { AxiosError } from "axios";
import { Loader } from "rsuite";
import 'rsuite/dist/rsuite.min.css';
import { toast } from "react-toastify";
import { UserDetailsContext, UserDetailsContextType } from "@/Context/UserDetails";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { envVariables } from "@/config/config";
import WalletPaymentForm from "@/components/wallet/PaymentForm";

const stripePromise = loadStripe(envVariables.stripePublicKey);

export default function Wallet() {
    const [walletDetails, setWalletDetails] = useState<WalletClass | null>(null);
    const [isActivatingWallet, setIsActivatingWallet] = useState(false);
    const { userDetails } = useContext(UserDetailsContext) as UserDetailsContextType;

    const fetchWalletDetails = () => {
        axios.get(`/api/wallet/get-details?userId=${userDetails._id}`)
            .then(res => setWalletDetails(res.data.wallet))
            .catch((err: AxiosError) => console.error(err.toJSON()));
    };

    useEffect(() => {
        if (userDetails) fetchWalletDetails();
    }, [userDetails]);

    const activateWallet = () => {
        setIsActivatingWallet(true);
        axios.post(`/api/wallet/create-wallet?userId=${userDetails._id}`)
            .then(() => {
                setTimeout(() => {
                    toast.success("Wallet has been activated", { position: "top-center" });
                    setIsActivatingWallet(false);
                    setTimeout(() => {
                        fetchWalletDetails();
                    }, 1000)
                }, 2000)
            })
            .catch((err: AxiosError) => {
                console.error(err.toJSON());
                toast.error(err.response?.data as string, { position: "top-center" });
                setIsActivatingWallet(false);
            });
    };

    return (
        <ProtectedLayout>
            <div className="sticky top-0 z-30">
                <Header />
            </div>
            <div className="flex flex-col items-center min-h-[200px] max-md:px-3">
                <h1 className="text-center mt-5 text-black font-bold tracking-wide text-5xl">
                    Ecomstore Wallet
                </h1>
                {   walletDetails && walletDetails.isActive ? (
                    <div className="flex items-center justify-center w-[60%] max-md:w-full text-xl uppercase text-green-600 px-3 mt-3 bg-white tracking-wide pt-3 pb-2 border border-green-500 rounded">
                        <FaWallet className="w-10 h-10 mr-3" /> is Active
                    </div>
                ) : (
                    <button
                        type="button"
                        className={`w-[60%] max-md:w-full text-xl uppercase bg-red-500 text-white px-3 rounded mt-3 tracking-wide ${isActivatingWallet ? "pt-2 b-1" : "pt-3 pb-2"}`}
                        onClick={activateWallet}
                    >
                        {isActivatingWallet ? <Loader size="md" color="white" speed="slow" /> : "Activate Your Wallet"}
                    </button>
                )}

                <div className="flex justify-between w-[60%] max-md:w-full gap-x-10">
                    {   walletDetails?.isActive && (
                        <Elements stripe={stripePromise}>
                            <WalletPaymentForm onSuccessfulPayment={fetchWalletDetails} />
                        </Elements>
                    )}

                    <div className="w-2/3 flex justify-between items-center bg-white border-gray-300 border h-20 rounded-md px-4 gap-x-5 mt-10">
                        <GiWallet className="w-12 h-12 text-green-600" />
                        <span className="text-6xl">
                            ₹<span className="ml-[2px] text-6xl">{walletDetails?.balance || 0}</span>
                        </span>
                    </div>
                </div>

                <div className="mt-10 w-[60%] max-md:w-full overflow-x-auto max-sm:overscroll-x-contain">
                    <h2 className="text-3xl mb-3">Transaction Details :</h2>
                    <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md max-md:overflow-x-scroll">
                        <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase rounded-tl-md"> Amount(₹)</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase"> Transaction Type </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase rounded-tr-md"> Date and Time </th>
                            </tr>
                        </thead>
                        <tbody>
                        {walletDetails?.debit_credit?.map((dc, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-200`}>
                                <td className={`px-6 py-4 text-sm ${index === walletDetails.debit_credit.length - 1 ? 'rounded-bl-md' : ''} ${dc.type === "credit" ? 'text-green-600' : 'text-red-500'}`}>
                                    { dc.type === "credit" ? `+₹${dc.amount}` : `-₹${dc.amount}`}
                                </td>
                                <td className={`px-6 py-4 text-sm ${dc.type === "credit" ? 'text-green-600' : 'text-red-500'}`}>
                                    {dc.type === "credit" ? 
                                        <span className="text-green-600">Credit</span> : 
                                        <span className="text-red-500">Debit</span>
                                    }
                                </td>
                                <td className={`px-6 py-4 text-sm ${dc.type === "credit" ? 'text-green-600' : 'text-red-500'} ${index === walletDetails.debit_credit.length - 1 ? 'rounded-br-md' : ''}`}>
                                    {new Date(dc.createdAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </ProtectedLayout>
    );
}
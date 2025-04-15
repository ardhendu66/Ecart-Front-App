import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { CartContext, CartContextType } from "@/Context/CartContext";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners"
import { CartOrderProps } from "@/config/types";

export default function Cartorder({
    name, setName, phoneNumber, setPhoneNumber, email, setEmail, city, setCity, pinCode, setPinCode, streetAddress, setStreetAddress, subTotal
} : CartOrderProps) {

    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
    const [urlInfo, setUrlInfo] = useState("");
    const { cartProducts } = useContext(CartContext) as CartContextType;
    const router = useRouter();
    const { action } = router.query;


    const processOrderInformation = async (e: any) => {
        e.preventDefault();
        if(
            name === "" || phoneNumber === "" || email === "" || city === "" || pinCode === "" || streetAddress === "" || subTotal < 1
        ) {
            toast.error("Please fill all information", { position: "top-center" });
            return;
        }

        setIsPaymentProcessing(true);
        axios.post('/api/cart/checkout', {
            name, phoneNo: phoneNumber, email, city_district_town: city, pinCode, address: streetAddress, products: cartProducts
        })
        .then(res => {
            if(res.status === 200) {
                setUrlInfo(res.data.url)
                console.log("Payment_Res: ", res.data);
                router.push(res.data.url);
            }         
        })
        .catch((err: AxiosError) => {
            console.error({
                message: err.message,
                paymentMsg: "Payment process failed!"
            });
            toast.error("Payment process failed!", { position: "top-center" })
        })
    }

    return (
        <div 
            className={
                `flex items-center justify-center w-[70%] max-md:w-full p-4 ${action === "success" && "hidden"}`
            }
        >
            <form 
                className="flex flex-col items-center justify-center bg-white w-full py-6 px-8 rounded-md"
                onSubmit={e => processOrderInformation(e)}
            >
                <h2 className="text-2xl font-bold mb-2">
                    Order Information
                </h2>
                <input 
                    type="text" 
                    placeholder="Name" 
                    className="w-full border-black border-b-[1.7px] p-1 my-2 mb-[2[px] outline-none font-medium"
                    onChange={e => setName(e.target.value)}
                />
                <div className="w-full flex gap-2">
                    <input 
                        type="text"
                        className="w-[10%] bg-gray-200 p-1 px-2 my-3 outline-none font-medium rounded-md" 
                        value={'+91'}
                        disabled
                    />
                    <input 
                        type="number"
                        placeholder="Phone number" 
                        className="w-full border-black border-b-[1.7px] p-1 my-3 outline-none font-medium"
                        onChange={e => setPhoneNumber(String(e.target.value))}
                    />
                </div>
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full border-black border-b-[1.7px] p-1 my-3 outline-none font-medium"
                    onChange={e => setEmail(e.target.value)}
                />
                <div className="flex gap-x-5 w-full">
                    <input 
                        type="text" 
                        placeholder="City" 
                        className="w-full border-black border-b-[1.7px] p-1 my-3 outline-none font-medium"
                        onChange={e => setCity(e.target.value)}
                    />
                    <input 
                        type="number" 
                        placeholder="PIN Code" 
                        className="w-full border-black border-b-[1.7px] p-1 my-3 outline-none font-medium"
                        onChange={e => setPinCode(String(e.target.value))}
                    />
                </div>
                <input 
                    type="text" 
                    placeholder="Street Address" 
                    className="w-full border-black border-b-[1.7px] p-1 my-3 outline-none font-medium"
                    onChange={e => setStreetAddress(e.target.value)}
                />
                <button 
                    type="submit"
                    className="w-full bg-black text-white px-4 py-2 rounded-md mt-3 mb-2 text-lg font-medium"
                    disabled={isPaymentProcessing}
                >
                {
                    isPaymentProcessing
                        ?
                    <div className="flex items-center justify-center text-white">
                        Processing 
                        <ClipLoader 
                            color="white"
                            className="w-12 h-12 ml-4" 
                        />
                    </div>
                        :
                    "Conitnue to Payment"
                }
                </button>
            </form>
        </div>
    )
}
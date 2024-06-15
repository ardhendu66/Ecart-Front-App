import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { CartContext, CartContextType } from "@/Context/CartContext";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners"

interface Props {
    name: string, 
    setName: Dispatch<SetStateAction<string>>, 
    phoneNumber: string, 
    setPhoneNumber: Dispatch<SetStateAction<string>>, 
    email: string, 
    setEmail: Dispatch<SetStateAction<string>>,
    city: string, 
    setCity: Dispatch<SetStateAction<string>>, 
    pinCode: string, 
    setPinCode: Dispatch<SetStateAction<string>>, 
    streetAddress: string, 
    setStreetAddress: Dispatch<SetStateAction<string>>,
    subTotal: number,
}
export interface ResponseBody {
    name: string,
    phoneNumber: string,
    email: string,
    city: string,
    pinCode: string,
    streetAddress: string,
    products: string[],
    subTotal: number,
}

export default function Cartorder({
    name, setName, phoneNumber, setPhoneNumber, email, setEmail, city, setCity, pinCode, setPinCode, streetAddress, setStreetAddress, subTotal
} : Props) {

    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
    const { cartProducts, clearCartProducts } = useContext(CartContext) as CartContextType;
    const router = useRouter()
    const { action } = router.query;

    if(action === "success") {
        clearCartProducts();
    }

    const processOrderInformation = async (e: any) => {
        e.preventDefault();
        setIsPaymentProcessing(true);
        try {
            const res = await axios.post('/api/cart/checkout', {
                name, phoneNumber, email, city, pinCode, streetAddress, 
                products: cartProducts, subTotal
            })
            if(res.status === 200) {
                console.log("Payment_Res: ", res.data);
                setTimeout(() => {
                    router.push(res.data.url);
                }, 300)
            }         
        }
        catch(err: any) {
            console.error({
                message: err.message,
                paymentMsg: "Payment process failed!"
            });
            toast.error("Payment process failed!", { position: "top-center" })
        }
    }

    return (
        <div 
            className={
                `flex items-center justify-center w-1/3 p-4 ${action === "success" && "hidden"}`
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
                    className="w-full border-black border p-1 px-2 rounded-sm mt-2 mb-[2[px] outline-none font-medium"
                    onChange={e => setName(e.target.value)}
                />
                <div className="flex gap-2">
                    <input 
                        type="text"
                        className="w-[18%] border-black border p-1 px-2 rounded-sm my-2 outline-none font-medium" 
                        value={'+91'}
                        disabled
                    />
                    <input 
                        type="number"
                        placeholder="Phone number" 
                        className="w-full border-black border p-1 px-2 rounded-sm my-2 outline-none font-medium"
                        onChange={e => setPhoneNumber(String(e.target.value))}
                    />
                </div>
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full border-black border p-1 px-2 rounded-sm mb-2 outline-none font-medium"
                    onChange={e => setEmail(e.target.value)}
                />
                <div className="flex gap-1">
                    <input 
                        type="text" 
                        placeholder="City" 
                        className="w-full border-black border p-1 px-2 rounded-sm mb-2 outline-none font-medium"
                        onChange={e => setCity(e.target.value)}
                    />
                    <input 
                        type="number" 
                        placeholder="PIN Code" 
                        className="w-full border-black border p-1 px-2 rounded-sm mb-2 outline-none font-medium"
                        onChange={e => setPinCode(String(e.target.value))}
                    />
                </div>
                <input 
                    type="text" 
                    placeholder="Street Address" 
                    className="w-full border-black border p-1 px-2 rounded-sm mb-2 outline-none font-medium"
                    onChange={e => setStreetAddress(e.target.value)}
                />
                <button 
                    type="submit"
                    className="w-full bg-black text-white px-4 py-2 rounded-md my-2 text-lg font-medium"
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
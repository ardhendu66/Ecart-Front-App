import { memo, useContext } from "react"
import axios from "axios";
import { CartContext, CartContextType } from "@/Context/CartContext";
import Header from "../Header";
import Successcart from "./Successcart";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
    const { cartProducts } = useContext(CartContext) as CartContextType;

    const adjustQuantityOfProducts = async () => {
        console.log("render products");
        axios.post('/api/product/adjust-quantity', { ids: cartProducts })
        .then(res => {               
            if(res.status === 200) {
                toast.success(res.data.message, { position: "top-center" });
            }
            else if(res.status === 202) {
                toast.info(res.data.message, { position: "top-center" });
            }
        })
        .catch(err => {
            toast.error(err.message, { position: "top-center" });
            console.error(err);                
        })
    }
    adjustQuantityOfProducts();

    return (
        <main className="w-screen min-h-screen bg-gray-300">
            <Header />
            <div className="flex items-start justify-between gap-1 mt-6">
                <div className="flex items-center justify-center w-2/3 p-4">
                    <div className="p-4 bg-white w-[95%] rounded-md">
                        <Successcart />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default PaymentSuccess;
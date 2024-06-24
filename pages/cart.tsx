import { useContext, useEffect, useState } from "react";
import { CartContext, CartContextType } from "@/Context/CartContext";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "@/components/Header";
import { Product } from "@/config/types";
import { moneyComaSeperator } from "@/config/functions";
import Cartorder from "@/components/Cart/Cartorder";
import Emptycart from "@/components/Cart/Emptycart";
import Cartproducts from "@/components/Cart/Cartproducts";
import PaymentSuccess from "@/components/Cart/PaymentSuccess";

export default function Cart() {
    const { cartProducts, clearCartProducts } = useContext(CartContext) as CartContextType;
    const [products, setProducts] = useState<Product[]>([])
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [loadingCartProducts, setLoadingCartProducts] = useState(false);
    const router = useRouter()

    useEffect(() => {
        document.title = 'Cart'
        console.log("title");        
    }, [])

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoadingCartProducts(true);
                const res = await axios.post('/api/cart/get-products', {
                    ids: cartProducts 
                })          
                setProducts(res.data);
                console.log("Render cart products");        
            }
            catch(err) {
                console.error(err);                
            }
            finally {
                setLoadingCartProducts(false);
            }
        }
        fetchProducts();
    }, [cartProducts])

    var subTotalPrice = 0;
    for(const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        subTotalPrice += price;
    }

    if(router.query.action === "success") {
        return <PaymentSuccess />
    }
    else if(!cartProducts.length) {
        return (
            <main className="w-screen min-h-screen bg-gray-300">
                <Header />
                <div className="flex items-start justify-between gap-1 mt-6">
                    <div className="flex items-center justify-center w-2/3 p-4">
                        <div className="p-4 bg-white w-[95%] rounded-md">
                            <Emptycart />
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    return(
        <main className="bg-gray-300">
            <Header />
            <div className="flex items-start justify-between gap-1 mt-6">
                <div className="flex items-center justify-center w-2/3 p-4">
                    <div className="p-4 bg-white w-[95%] rounded-md">
                        <div className="w-full p-8 pt-2">
                            <h2 
                                className="flex justify-between text-5xl text-left font-semibold mb-10 tracking-tighter"
                            >
                                My Shopping Cart
                                <button
                                    className="bg-red-600 text-white px-5 p-2 rounded-sm text-xl font-medium tracking-normal shadow-sm shadow-black"
                                    onClick={() => clearCartProducts()}
                                >
                                    Clear cart
                                </button>
                            </h2>

                            <Cartproducts 
                                products={products} 
                                loading={loadingCartProducts}
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

                <Cartorder
                    name={name}
                    setName={setName}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    email={email}
                    setEmail={setEmail}
                    city={city}
                    setCity={setCity}
                    pinCode={pinCode}
                    setPinCode={setPinCode}
                    streetAddress={streetAddress}
                    setStreetAddress={setStreetAddress}
                    subTotal={subTotalPrice}
                />

            </div>
        </main>
    )
}
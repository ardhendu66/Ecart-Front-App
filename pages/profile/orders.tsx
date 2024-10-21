import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { Product } from "@/config/types";
import { Order } from "@/config/types";
import { ProductsDetailsContext, ProductsDetailsContextType } from "@/Context/ProductContext";
import { countObject } from "@/config/functions";
import ProtectedLayout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClipLoader } from "react-spinners";
import { loaderColor } from "@/config/config";
import { moneyComaSeperator } from "@/config/functions";
import { UserDetailsContext, UserDetailsContextType } from "@/Context/UserDetails";

interface ProductFrequencyProps {
    product: Product,
    count: number,
}

export default function Orders() {
    const { productsDetails } = useContext(ProductsDetailsContext) as ProductsDetailsContextType;
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoadingOrders, setISLoadingOrders] = useState<boolean>(false);
    const { userDetails } = useContext(UserDetailsContext) as UserDetailsContextType;
    const router = useRouter();

    useEffect(() => {
        if(userDetails?._id) {
            setISLoadingOrders(true);
            axios.get(`/api/orders/get-orders?userId=${userDetails._id}`)
                .then(res => {                    
                    setOrders(res.data.orders);
                })
                .catch((err: AxiosError) => console.error(err.toJSON()))
                .finally(() => setISLoadingOrders(false));
        }
    }, [userDetails])    

    return (
        <ProtectedLayout>
            <div className="sticky top-0 z-30">
                <Header />
            </div>
            <div className="min-h-[200px]">
                <div>
                    <SearchComponent />
                </div>
                <div className="p-4 w-full flex flex-col items-center justify-center">
                {
                    isLoadingOrders
                        ?
                    <div className="w-full text-center">
                        <ClipLoader color={loaderColor} size={80} />
                    </div>
                        :
                    orders ? orders?.map((order, index) => {
                        const productsFrequency = countObject(
                            order.products
                        );
                        const object: ProductFrequencyProps[] = [];
                        Object.entries(productsFrequency).map(obj => {
                            const filPro = productsDetails.find(p => p._id === obj[0]);
                            if(filPro) {
                                object.push({product: filPro, count: obj[1] as number});
                            }
                        })  

                        return (
                            <div 
                                key={index} className="rounded-md p-3 mb-4 bg-white w-[80%] max-lg:w-full px-10 py-5"
                            >
                                <div className="text-center text-white bg-gray-400 p-2 rounded w-80 mb-1 text-lg">
                                    ORDERID_{order._id}
                                </div>
                                {
                                    object.map((p, ind) => (
                                        <div 
                                            key={ind} 
                                            className={`flex max-md:flex-col md:justify-between gap-x-5 border border-gray-300 p-2 rounded my-3`}
                                        >
                                            <div className="flex justify-between w-[55%]">
                                                <img 
                                                    src={p.product.images[0]} 
                                                    alt="error" 
                                                    className="w-28 h-28 rounded bg-gray-300"
                                                />
                                                <div className="flex flex-col w-[29%] gap-y-3">
                                                    <div className="text-lg">
                                                        {p.product.name}
                                                    </div>
                                                    {/* <div className="text-gray-400 text-sm">
                                                        {p.product.description.substring(0, 60)}...
                                                    </div> */}
                                                </div>
                                                <div className="flex flex-col gap-y-3">
                                                    <div className="text-lg">
                                                        ₹{moneyComaSeperator(p.product.price)}
                                                    </div>
                                                    <div className="flex gap-x-1 text-gray-500">
                                                        Qty - 
                                                        <span className="border border-gray-300 rounded-sm px-2">{p.count}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-[5%]"></div>
                                            <div className="w-[40%]">
                                                <div className="flex gap-x-2 mb-2">
                                                    <div className="mt-[7px] w-[10px] h-[10px] bg-green-600 rounded-full"></div>
                                                    <div className="flex gap-x-3 font-semibold">
                                                        Ordered on
                                                        <div>
                                                            {new Date(order.createdAt).toLocaleString()}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-sm">
                                                    This item has been ordered successfully.
                                                </div>
                                                <div className="flex mt-3 text-lg">
                                                    Want to cancel your order ?
                                                </div>
                                                <button
                                                    type="button"
                                                    className="bg-red-500 text-white px-3 py-1 rounded-sm mt-2"
                                                    onClick={() => {}}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    })
                    : <div>No Orders found</div>
                }
                </div>
            </div>
            <Footer />
        </ProtectedLayout>
    )
}

const SearchComponent = () => {
    const [searchInput, setSearchInput] = useState<string>("");

    const handleOnSearch = (searchInput: string) => {

    }

    return (
        <div className="">
            <div className="w-full flex justify-center mt-2">
                <input
                    type="text"
                    placeholder="Search your orders by name"
                    className="w-[45%] max-md:w-[70%] max-sm:w-[82%] px-4 text-black rounded-md mr-1 border-gray-400 border-[1.4px] outline-none font-normal h-10"
                    onChange={e => setSearchInput(e.target.value)}
                />
                <button
                    type="button"
                    className="bg-gray-400 h-10 font-normal text-white px-5 rounded-md shadow-md hover:bg-gray-500"
                    onClick={() => handleOnSearch(searchInput)}
                >
                    Search
                </button>
            </div>

        </div>
    )
}
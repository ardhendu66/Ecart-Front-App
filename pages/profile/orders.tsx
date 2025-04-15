import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { Product } from "@/config/types";
import { Order } from "@/config/types";
import {
    ProductsDetailsContext,
    ProductsDetailsContextType,
} from "@/Context/ProductContext";
import { countObject } from "@/config/functions";
import ProtectedLayout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClipLoader } from "react-spinners";
import { loaderColor } from "@/config/config";
import { moneyComaSeperator } from "@/config/functions";
import {
    UserDetailsContext,
    UserDetailsContextType,
} from "@/Context/UserDetails";
import { GoDotFill } from "react-icons/go";
import { FaRegDotCircle } from "react-icons/fa";

interface ProductFrequencyProps {
    product: Product;
    count: number;
}

export default function Orders() {
    const { productsDetails } = useContext(
        ProductsDetailsContext
    ) as ProductsDetailsContextType;
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoadingOrders, setISLoadingOrders] = useState<boolean>(false);
    const { userDetails } = useContext(
        UserDetailsContext
    ) as UserDetailsContextType;
    const router = useRouter();

    useEffect(() => {
        if (userDetails?._id) {
            // setISLoadingOrders(true);
            axios
                .get(`/api/orders/get-orders?userId=${userDetails._id}`)
                .then((res) => {
                    setOrders(res.data.orders);
                })
                .catch((err: AxiosError) => console.error(err.toJSON()))
                // .finally(() => setISLoadingOrders(false));
        }
    }, [userDetails]);

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
                    {isLoadingOrders ? (
                        <div className="w-full text-center">
                            <ClipLoader color={loaderColor} size={80} />
                        </div>
                    ) : orders ? (
                        orders?.map((order, index) => {
                            const productsFrequency = countObject(order.products);
                            const object: ProductFrequencyProps[] = [];
                            Object.entries(productsFrequency).map((obj) => {
                                const filPro = productsDetails.find((p) => p._id === obj[0]);
                                if (filPro) {
                                    object.push({ product: filPro, count: obj[1] as number });
                                }
                            });

                            return (
                                <div
                                    key={index}
                                    className="rounded-md p-3 mb-4 bg-white w-[80%] max-lg:w-full px-10 py-5"
                                >
                                    <div
                                        id="order-id"
                                        className="flex items-center justify-center gap-x-2 text-white bg-gray-400 p-2 rounded mb-1 text-lg max-sm:flex-col w-80"
                                    >
                                        <span>ORDERID</span>
                                        <span>{order._id}</span>
                                    </div>
                                    {object.map((p, ind) => (
                                        <div
                                            key={ind}
                                            className={`grid grid-cols-5 gap-x-5 bg-gray-200 py-4 pl-4 rounded my-3`}
                                        >
                                            <div className="col-span-1 max-sm:col-span-2">
                                                <img 
                                                    src={p.product.images[0]} 
                                                    alt="error" 
                                                    className="bg-white rounded-sm"
                                                />
                                            </div>
                                            <div className="col-span-2 mt-2 pl-3 max-sm:col-span-3 max-sm:px-6">
                                                <div>{p.product.name}</div>
                                                <div>₹{moneyComaSeperator(p.product.price)}</div>
                                                <div>
                                                    Qty - <span>{p.count}</span>
                                                </div>
                                            </div>
                                            <div className="col-span-2 mt-2 max-sm:col-span-5 max-sm:mt-6">
                                                <div className="flex gap-x-2">
                                                    <FaRegDotCircle className="text-green-600 w-4 h-4 mt-[2px]" />
                                                    <div className="flex flex-wrap">
                                                        <div>Ordered on&nbsp;&nbsp;</div>
                                                        <div>
                                                            {new Date(p.product.createdAt).toLocaleString()}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-4 max-sm:mt-0">
                                                    <p className="text-gray-500">
                                                        Do you want to cancel this order ?
                                                    </p>
                                                    <button
                                                        type="button"
                                                        className="bg-red-500 py-2 px-4 text-white mt-2 rounded-sm"
                                                        onClick={() => {}}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        })
                    ) : (
                        <div>No Orders found</div>
                    )}
                </div>
            </div>
            <Footer />
        </ProtectedLayout>
    );
}

const SearchComponent = () => {
    const [searchInput, setSearchInput] = useState<string>("");

    const handleOnSearch = (searchInput: string) => { };

    return (
        <div className="">
            <div className="w-full flex justify-center mt-2">
                <input
                    type="text"
                    placeholder="Search your orders by name"
                    className="w-[45%] max-md:w-[70%] max-sm:w-[82%] px-4 text-black rounded-md mr-1 border-gray-400 border-[1.4px] outline-none font-normal h-10"
                    onChange={(e) => setSearchInput(e.target.value)}
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
    );
};

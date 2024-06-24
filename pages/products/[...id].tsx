import { useRouter } from "next/router"
import axios from "axios";
import Image from "next/image";
import Header from "@/components/Header";
import { useEffect, useState, useContext } from "react";
import { Product } from "@/config/types";
import { ClipLoader } from "react-spinners";
import { loaderColor } from "@/config/config";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { CartContext, CartContextType } from "@/Context/CartContext";
import { moneyComaSeperator } from "@/config/functions";
import { FaStar } from "react-icons/fa6";

export default function SingleProductPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoadingProduct, setIsLoadingProduct] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const router = useRouter();
    const { id } = router?.query;

    const { addProductToCart } = useContext(CartContext) as CartContextType;

    useEffect(() => {
        if(!id) {
            return;
        }
        const fetchProduct = async () => {
            try {
                setIsLoadingProduct(true);
                const res = await axios.get(`/api/product/get-product?id=${id}`);
                if(res) {
                    setProduct(res.data.product);
                }
            }
            catch(err: any) {
                console.error(err.message);                
            }
            finally {
                setTimeout(() => {
                    setIsLoadingProduct(false);
                }, 1000)
            }
        }
        fetchProduct();
    }, [id])

    const handleOnClick = (direction: string) => {
        if(direction === "left") {
            setSlideIndex(
                slideIndex > 0 
                    ? 
                slideIndex - 1 
                    : 
                Number(product?.images.length) - 1
            );
        }
        else if(direction === "right") {
            setSlideIndex(
                slideIndex < Number(product?.images.length) - 1
                    ? 
                slideIndex + 1 
                    : 
                0
            );
        }
        return;
    }

    return (
        <div className="bg-gray-300 min-h-screen">
            <Header />
            {
                isLoadingProduct
                    ?
                <div className="text-center mt-5">
                    <ClipLoader
                        size={70}
                        color={loaderColor}
                    />
                </div>
                    :
                <div className="flex items-start max-md:flex-col p-10 max-sm:p-4">
                    <div className="flex items-center max-md:justify-center">
                        <FaChevronCircleLeft 
                            className="w-10 h-10 mr-2 cursor-pointer z-20" 
                            onClick={() => handleOnClick("left")}
                        />
                        <div className={`flex max-md:items-center max-md:justify-center`}>
                        {
                            typeof product?.images !== "undefined"
                                ?
                            product.images.map((image, index) => (
                                <div key={index}>
                                    <div
                                        className={`max-sm:hidden w-[400px] p-4 bg-white rounded-md mb-3 ${index !== slideIndex && "hidden"} shadow-sm`}
                                    >
                                        <Image
                                            src={image as string}
                                            alt="error"
                                            width={400}
                                            height={350}
                                            priority
                                        />                   
                                    </div>
                                    <div
                                        className={`sm:hidden w-[260px] p-4 bg-white rounded-md mb-3 ${index !== slideIndex && "hidden"} shadow-sm`}
                                    >
                                        <Image
                                            src={image as string}
                                            alt="error"
                                            width={260}
                                            height={250}
                                            priority
                                        />                   
                                    </div>
                                </div>
                            ))
                                :
                            <div>Not found</div> 
                        }
                        </div>
                        <FaChevronCircleRight 
                            className="w-10 h-10 ml-2 cursor-pointer z-20" 
                            onClick={() => handleOnClick("right")}
                        />
                    </div>
                    <div className="ml-8 max-md:flex max-md:justify-center max-md:flex-col">
                        <div className="text-2xl font-semibold">{product?.name}</div>
                        <div className="flex mt-3">
                            <span className="flex bg-green-700 text-white px-2 py-[1px] w-14 text-sm mr-2 rounded-[4px]">
                                4.3
                                <FaStar 
                                    className="w-3 h-3 ml-1 mt-[3px]"
                                />
                            </span>
                            <span className="text-gray-500 text-xs font-semibold mt-1 mr-1">
                                {moneyComaSeperator(314530)} ratings &
                            </span>
                            <span className="text-gray-500 text-xs font-semibold mt-1">
                                {moneyComaSeperator(30319)} reviews
                            </span>
                        </div>
                        <p className="mt-3 text-black">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, deserunt possimus accusamus quaerat amet quas, doloremque atque, nostrum veniam nemo non autem sed quis! Culpa ab facere quod corrupti placeat. Aliquid possimus reprehenderit, omnis nam iure, sed consequatur minus unde, nisi consectetur saepe alias. Quidem, laudantium accusamus adipisci quod, totam.
                        </p>
                        <div className="flex flex-col mt-2">
                            <span className="flex text-2xl font-semibold mr-8 my-3">
                                <span 
                                    className="text-gray-400 text-lg font-normal line-through mt-1 mr-2"
                                >
                                    ₹{10000}
                                </span>
                                <span>
                                    ₹{moneyComaSeperator(product?.price as number)}
                                </span>
                                <span className="ml-3 mt-1 text-lg font-semibold text-green-700">
                                    {'55%'} off
                                </span>
                                <span 
                                    className={`${product?.amount as number < 100 && "hidden"} ml-4 px-2 text-red-500 border-red-500 border-[1.2px] text-xs flex items-center justify-center rounded-md`}
                                >
                                    {product?.amount} left
                                </span>
                            </span>
                            <button 
                                className="bg-transparent border-orange-300 border-[1.6px] bg-yellow-500 text-white py-2 px-4 rounded-md flex items-center justify-center mb-1 hover:scale-110 hover:transition-all w-1/3 max-sm:w-full"
                                onClick={() => addProductToCart(product?._id as string)}
                            >
                                <MdShoppingCart 
                                    className="w-6 h-6 mr-2"
                                />
                                <span className="uppercase">
                                    Add TO CART
                                </span>
                            </button>
                            <span className="flex items-center mt-3">
                                <span className="text-gray-500 text-sm mr-2">Seller </span>
                                <span className="text-blue-700 text-lg">BUZZINDIA</span>
                            </span>
                            <div className="mt-5">
                                <h2 className="text-xl font-semibold text-gray-500 mb-3">
                                    Product details
                                </h2>
                                <div className="w-[70%] border-gray-500 border-[1.2px] rounded-md p-5">
                                    {
                                        typeof product?.categoryProperties !== "undefined"
                                            &&
                                        Object.entries(product?.categoryProperties as Object).map(([key, value], index) => (
                                            <div key={index} className="w-full flex mb-1">
                                                <div className="w-1/2 pl-2 py-[2px] text-gray-500">
                                                    {key}
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    {value}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="mt-5">
                                <h1 className="text-2xl font-semibold">Questions & Answers</h1>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
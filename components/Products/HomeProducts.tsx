import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Product } from "@/config/types";
import { MdShoppingCart } from "react-icons/md";
import { CartContext, CartContextType } from "@/Context/CartContext";
import { moneyComaSeperator } from "@/config/functions";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function NewProducts() {
    const [productArray, setProductArray] = useState<Product[]>([]);
    const [isloadingProducts, setIsLoadingProducts] = useState(false);
    const { addProductToCart } = useContext(CartContext) as CartContextType;

    useEffect(() => {
        async function fetchProductArray() {
            try {
                setIsLoadingProducts(true);
                const res = await axios.get('/api/product/get-products')                
                setProductArray(res.data.products);
            }
            catch(err: any) {
                toast.info('Not able to fetch Products', { position: "top-center" })
                console.error(err);              
            }
            finally {
                setTimeout(() => {
                    setIsLoadingProducts(false);
                }, 1000)
            }
        }
        fetchProductArray();
    }, [])


    return (
        <div 
            className="w-full grid lg:grid-cols-4 md:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 my-10"
        >
        {
            isloadingProducts
                ?
            <div className="col-span-4 text-center">
                <ClipLoader
                    size={90}
                    color="#1b6ea5"
                />
            </div>
                :
            productArray?.length > 0
                ?
            productArray?.map((product: Product) => (
                <div  
                    key={product._id} 
                    className="relative flex flex-col items-center cols-span-1 gap-3 p-6 rounded-xl"
                >
                    <Link href={`/products/${product._id}`} 
                        className="relative w-full max-h-60 rounded-xl shadow-lg"
                    >
                        <Image 
                            src={product.images[1]}
                            alt="error"
                            width={100}
                            height={100}
                            className="w-full h-full rounded-md"
                        />
                    </Link>
                    <div className="flex flex-col w-full font-medium text-wrap">
                        <div 
                            className="w-full text-gray-600 rounded-md capitalize font-normal mb-2"
                        >
                        {
                            product.name.length <= 28
                                ?
                            product.name
                                :
                            `${product.name.substring(0, 27)}...`
                        }
                        </div>
                        <div>
                            <div className="flex items-center justify-start gap-3">
                                <span 
                                    className="italic text-gray-500 text-xs line-through"
                                >
                                    ₹{moneyComaSeperator(Math.floor(
                                        product.price*(100+product.discountPercentage)/100
                                    ))}
                                </span>
                                <span 
                                    className="italic text-gray-900 text-lg font-extrabold"
                                >
                                    ₹{moneyComaSeperator(product.price)}
                                </span>
                                <span className="text-sm text-green-600">
                                    {product.discountPercentage}%off
                                </span>
                            </div>
                            <button 
                                className="bg-transparent border-white border-[1.5px]  bg-slate-600 text-white  px-4 py-2 rounded-md p-1 flex items-center justify-center mb-1 w-full mt-2 hover:bg-slate-500"
                                onClick={() => addProductToCart(product._id)}
                            >
                                <MdShoppingCart 
                                    className="w-6 h-6 mr-2"
                                />
                                <span className="uppercase">
                                    Add To Cart
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            ))
                :
            <div className="col-span-4 text-center font-semibold text-2xl">
                No products found
            </div>
        }
        </div>
    )
}
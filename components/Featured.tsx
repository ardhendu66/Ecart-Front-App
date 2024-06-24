import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import TransparentButton from "./Button/TransparentButton";
import { MdShoppingCart } from "react-icons/md";
import { Product } from "@/config/types";
import { CartContext, CartContextType } from "@/Context/CartContext";
import { toast } from "react-toastify";

export default function Banner() {
    const [product, setProduct] = useState<Product | null>(null);
    const { addProductToCart } = useContext(CartContext) as CartContextType;

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await axios.get(
                    '/api/product/get-product?id=6633d11d4dc5a3f9c4eac9c9'
                )               
                setProduct(res.data.product);
            }
            catch(err: any) {
                toast.info('Not able to fetch Products', { position: "top-center" })
                console.error(err); 
            }
        }
        fetchProduct();
    }, [])


    return (
        <div 
            className="flex max-sm:flex-col-reverse sm:justify-between bg-slate-800 min-h-72 text-white gap-6 overflow-x-hidden p-10"
        >
            <div className="w-[4%] max-lg:hidden"></div>
            <div className="w-[40%] max-sm:w-full">
                <div className="text-4xl font-medium mb-4">
                    {product && product.name}
                </div>
                <div className="my-4 text-gray-500">
                    {product && product.description}
                </div>
                <div className="flex justify-start mt-4">
                    <TransparentButton addedClass="font-medium">
                        <Link href={`/products/${product?._id}`} className="text-white">
                            Read more
                        </Link>
                    </TransparentButton>
                    <button type="button"
                        className="bg-yellow-600 border-0 px-4 py-2 rounded-md flex items-center justify-center ml-3 font-medium"
                        onClick={() => addProductToCart(product?._id!)}
                    >
                        <MdShoppingCart className="w-[19px] h-[19px] mr-2" />
                        ADD TO CART
                    </button>
                </div>
            </div>
            <div className="w-[43%] max-sm:w-full">
                <div className="flex items-center justify-center w-[430px] h-[270px] rounded-md bg-white max-sm:w-full">
                    <Image
                        src="https://res.cloudinary.com/next-ecom-cloud/image/upload/v1717869276/iPhone13_anp1os.jpg"
                        alt="error"
                        width={200}
                        height={200}
                        className="w-[80%] h-full rounded-md"
                        priority
                    />
                </div>
            </div>
        </div>
    )
}
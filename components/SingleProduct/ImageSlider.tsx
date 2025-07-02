import { useState, useContext } from "react";
import { Product } from "@/config/types";
import { MdShoppingCart } from "react-icons/md";
import { CartContext, CartContextType } from "@/Context/CartContext";

interface Props {
    product: Product | null,
}

export default function ImageSlider({product}: Props) {
    const { addProductToCart } = useContext(CartContext) as CartContextType;
    const [displayedPhoto, setDisplayedPhoto] = useState<string>(product?.images[0]!);

    return (
        <div className="flex flex-col max-md:px-5 w-full">
            <div className="flex items-center max-md:justify-center w-full">
                <div className="flex max-md:items-center max-md:justify-center w-full">
                    <div className="flex gap-x-3 w-full">
                        <div className="flex flex-col h-[450px] overflow-y-scroll hide-scrollbar w-24 px-1 rounded-sm">
                            {product?.images.map((image, index) => <img 
                                key={index}
                                src={image} 
                                alt="error"
                                className={`w-full h-20 rounded bg-white p-3 my-[2px] cursor-pointer ${displayedPhoto === image ? "border-sky-600 border-[1.4px]" : "border-gray-200 border"}`}
                                onClick={() => setDisplayedPhoto(image)}
                            />)}
                        </div>
                        <div className="w-full h-[450px] p-4 bg-white rounded-sm mb-3 border-gray-300 border">
                            <img 
                                src={displayedPhoto} 
                                alt="loading"
                                className="w-full h-full" 
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 w-full flex justify-end">
                <button 
                    className="lg:w-[85%] bg-orange-500 text-white text-lg p-3 rounded-sm flex items-center justify-center mb-1 w-full hover:bg-orange-400 font-bold"
                    onClick={() => addProductToCart(product?._id as string)}
                >
                    <MdShoppingCart className="w-6 h-6 mr-2" />
                    ADD TO YOUR CART
                </button>
            </div>
        </div>
    )
}
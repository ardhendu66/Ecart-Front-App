import { useState, Dispatch, SetStateAction, useContext } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { Product } from "@/config/types";
import { MdShoppingCart } from "react-icons/md";
import { CartContext, CartContextType } from "@/Context/CartContext";

interface Props {
    product: Product | null,
    slideIndex: number,
    setSlideIndex: Dispatch<SetStateAction<number>>,
}

export default function ImageSlider({product, slideIndex, setSlideIndex}: Props) {
    const { addProductToCart } = useContext(CartContext) as CartContextType;
    const [displayedPhoto, setDisplayedPhoto] = useState<string>(product?.images[0]!);

    return (
        <div className="flex flex-col">
            <div className="flex items-center max-md:justify-center">
                <div className={`flex max-md:items-center max-md:justify-center`}>
                {
                    <div className="flex gap-x-3">
                        <div className="flex flex-col h-[450px] overflow-y-scroll hide-scrollbar w-24 px-1 rounded-sm">
                        {
                            product?.images.map((image, index) => (
                                <img 
                                    key={index}
                                    src={image} 
                                    alt="error"
                                    className="w-full h-20 rounded bg-white p-3 my-[2px] cursor-pointer"
                                    onClick={() => setDisplayedPhoto(image)}
                                />
                            ))
                        }
                        </div>
                        <div
                            className={`max-sm:hidden max-md:w-[530px] w-[500px] h-[450px] p-4 bg-white rounded-md mb-3`}
                        >
                            <img 
                                src={displayedPhoto} 
                                alt="loading"
                                className="w-full h-full" 
                            />
                        </div>
                    </div>
                }
                </div>
            </div>
            <div className="mt-6 w-full flex justify-center">
                <button 
                    className="max-md:hidden bg-yellow-600 text-white text-lg p-3 rounded-md flex items-center justify-center mb-1 w-full hover:bg-yellow-500"
                    onClick={() => addProductToCart(product?._id as string)}
                >
                    <MdShoppingCart 
                        className="w-6 h-6 mr-2"
                    />
                    <span className="uppercase">
                        Add TO YOUR CART
                    </span>
                </button>
            </div>
        </div>
    )
}
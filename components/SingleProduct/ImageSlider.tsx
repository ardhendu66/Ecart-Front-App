import { Dispatch, SetStateAction, useContext } from "react";
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
    
    const handleOnClick = (direction: string) => {
        if(direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 
                : Number(product?.images.length) - 1
            );
        }
        else if(direction === "right") {
            setSlideIndex(slideIndex < Number(product?.images.length) - 1 ? slideIndex + 1 
                : 0
            );
        }
        return;
    }

    return (
        <div className="flex flex-col">
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
                                className={`max-sm:hidden max-md:w-[530px] w-[550px] h-[450px] p-4 bg-white rounded-md mb-3 ${index !== slideIndex && "hidden"} shadow-sm`}
                            >
                                <img 
                                    src={image} 
                                    alt="loading"
                                    className="w-full h-full" 
                                />
                            </div>
                            <div
                                className={`sm:hidden w-[390px] p-4 bg-white rounded-md mb-3 ${index !== slideIndex && "hidden"} shadow-sm`}
                            >
                                <img 
                                    src={image} 
                                    alt="loading"
                                    className="w-full h-full" 
                                />                   
                            </div>
                        </div>
                    ))
                        :
                    <div>
                        Not found
                    </div> 
                }
                </div>
                <FaChevronCircleRight 
                    className="w-10 h-10 ml-2 cursor-pointer z-20" 
                    onClick={() => handleOnClick("right")}
                />
            </div>
            <div className="mt-6 w-full flex justify-center">
                <button 
                    className="max-md:hidden border-white border-[1.6px] bg-slate-600 text-white py-3 px-4 rounded-md flex items-center justify-center mb-1 w-[88%] hover:bg-slate-500"
                    onClick={() => addProductToCart(product?._id as string)}
                >
                    <MdShoppingCart 
                        className="w-6 h-6 mr-2"
                    />
                    <span className="uppercase">
                        Add TO CART
                    </span>
                </button>
            </div>
        </div>
    )
}
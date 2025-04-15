import { moneyComaSeperator } from "@/config/functions";
import { Product } from "@/config/types";
import { FaStar } from "react-icons/fa6";

interface Props {
    product: Product | null;
}

export default function ProductInfo({product}: Props) {
    return (
        <div className="sm:mx-8 max-sm:mx-2 max-md:flex max-md:justify-center max-md:flex-col">
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

            <div className="flex text-2xl font-semibold mr-8 my-3">
                <span 
                    className="text-gray-500 text-sm italic font-normal line-through mt-[10px] mr-2"
                >
                    ₹{moneyComaSeperator(
                        Math.floor(product?.price! * (100 + product?.discountPercentage!) / 100)
                    )}
                </span>
                <span>
                    ₹{moneyComaSeperator(product?.price!)}
                </span>
                <span className="ml-3 mt-[8px] text-sm font-semibold text-green-700">
                    {`${product?.discountPercentage}%`} off
                </span>
                <span 
                    className={`${product?.amount! > 10 && "hidden"} ml-4 mt-2 px-1 text-red-500 border-red-500 border-[1.2px] text-xs flex items-center justify-center rounded-md font-normal h-5`}
                >
                    {product?.amount} left
                </span>
            </div>

            <p className="mt-4 text-gray-500 text-sm">
                {product?.description}
            </p>

            <div className="flex flex-col mt-2">
                <span className="flex items-center font-semibold">
                    <div className="bg-gray-500 w-2 h-2 rounded-full mr-1"></div>
                    <span className="text-gray-500 text-sm mr-2">
                        Seller -
                    </span>
                    <span className="text-blue-500 text-sm">
                        {product?.seller}
                    </span>
                </span>
                <div className="mt-4">
                    <h2 className="text-xl font-semibold text-gray-500 mb-1">
                        Product details
                    </h2>
                    <div className="w-full max-md:w-full border-gray-200 border-[1.2px] rounded-md p-5">
                        {
                            typeof product?.categoryProperties !== "undefined"
                                &&
                            Object.entries(product?.categoryProperties as Object)
                            .map(([key, value], index) => (
                                <div 
                                    key={index} 
                                    className={`w-full flex justify-between mb-1 p-[2px] ${index%2 === 1 ? "bg-gray-100" : "bg-gray-200"}`}
                                >
                                    <div className="pl-2 max-sm:pl-[2px] py-[2px] text-black">
                                        {key}
                                    </div>
                                    <div className="text-gray-600 pr-2 max-sm:pr-[2px]">
                                        {value}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
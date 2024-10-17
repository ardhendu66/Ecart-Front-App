import { data } from "@/config/data";
import { FaStar } from "react-icons/fa6";
import { MdCheckCircle } from "react-icons/md";

export default function RatingsAndReviews() {
    return (
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-x-1">
        {
            data.map((item, index) => (
                <div 
                    key={index} 
                    className="col-span-1 border border-gray-400 p-2 mb-1 rounded-md"
                >
                    <div className="flex justify-between">
                        <div 
                            className={`${item.rating < 3 ? "bg-red-500" : "bg-green-700"} flex text-white text-sm px-2 rounded-md pt-[2px] h-6 mr-3`}
                        >
                            {item.rating}
                            <FaStar className="w-3 h-3 mt-1 ml-1" />
                        </div>
                        <div className="flex">
                            <div className="text-xs text-gray-500 tracking-tighter">
                                Ardhendu_Roy
                            </div>
                            <MdCheckCircle className="w-3 h-3 ml-1 mt-[2px] text-gray-500" />
                        </div>
                    </div>
                    <div className="text-sm tracking-tighter text-gray-500">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores architecto ea nemo error, sit amet consectetur adipisicing elit...
                    </div>
                </div>
            ))
        }
        </div>
    )
}
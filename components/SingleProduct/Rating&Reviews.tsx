import { data } from "@/config/data";
import { FaStar } from "react-icons/fa6";
import { MdCheckCircle } from "react-icons/md";

export default function RatingsAndReviews() {
    return (
        <div className="">
        {
            data.map((item, index) => (
                <div 
                    key={index} 
                    className="flex justify-between border border-gray-400 p-2 mb-1 rounded-md"
                >
                    <div className="flex w-[80%]">
                        <div 
                            className={`${item.rating < 3 ? "bg-red-500" : "bg-green-700"} flex text-white text-sm px-2 rounded-md pt-[2px] h-6 mr-3`}
                        >
                            {item.rating}
                            <FaStar className="w-3 h-3 mt-1 ml-1" />
                        </div>
                        {/* <div>{item.review}</div> */}
                        <div className="text-sm">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores architecto ea nemo error. Excepturi animi consequatur asperiores laudantium molestias eaque reprehenderit, odio architecto magni, omnis aspernatur beatae similique ullam praesentium.
                        </div>
                    </div>
                    <div className="flex h-6 w-[20%] justify-end">
                        {/* <span>{item.userId}</span> */}
                        <span className="text-xs text-gray-500 tracking-tighter">
                            Ardhendu Roy
                        </span>
                        <MdCheckCircle className="w-3 h-3 ml-1 mt-[2px] text-gray-500" />
                    </div>
                </div>
            ))
        }
        </div>
    )
}
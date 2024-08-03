import { LoggedInUserDetail } from "@/config/Props";
import { TiTick } from "react-icons/ti";

export default function BasicDetailsContainer({
    fetchDetailsOfUser }: { fetchDetailsOfUser: LoggedInUserDetail
}) {
    return (
        <div className="w-1/3 max-lg:w-[75%] max-md:w-[80%] max-sm:w-full max-lg:mb-5 bg-white p-10 shadow-sm max-h-96">
            <div className="flex items-center justify-start gap-x-5">
                <img 
                    src={fetchDetailsOfUser.image!} 
                    alt="error"
                    className="w-16 h-16 rounded-full border-gray-300 border"
                />
                <span className="flex flex-col">
                    <span>Hello, </span>
                    <span className="font-bold">
                        {fetchDetailsOfUser.name}
                    </span>
                </span>
            </div>
            <div className="mt-8 text-sm flex tracking-tighter text-gray-500 mb-4">
                <div className="font-semibold uppercase mr-1">
                    Email_Id : 
                </div>
                <div>{fetchDetailsOfUser.email}</div>
                <button type="button"
                    className={`bg-blue-600 w-20 py-1 text-white text-[16px] ml-2 -mt-2 rounded-sm tracking-wide ${fetchDetailsOfUser.emailVerified && "hidden"}`}
                >
                    Verify
                </button>
                <div className={`flex items-center justify-center text-green-500 py-1 w-20 font-semibold border-gray-300 border-[1.3px] text-center ml-2 -mt-2 tracking-wide ${!fetchDetailsOfUser.emailVerified && "hidden"}`}>
                    Verified
                    <TiTick className="w-4 h-4 -mt-[1px]" />
                </div>
            </div>
            <div className="text-sm flex tracking-tighter text-gray-500">
                <div className="font-semibold uppercase mr-1">
                    Mobile_No : 
                </div>
                <div>{fetchDetailsOfUser.phoneNo}</div>
                <div
                    className={`text-red-500 border-red-500 border-[1.3px] w-28 py-1 text-[14.6px] ml-2 -mt-1 rounded-sm tracking-wide text-center`}
                >
                    Not Verified
                </div>
                <div className={`text-green-500 py-1 w-20 font-semibold border-gray-300 border-[1.3px] text-center ml-2 -mt-2 tracking-wide hidden`}>
                    Verified
                </div>
            </div>
            <div className="flex flex-col mt-7 text-gray-500">
                <label className="text-lg uppercase font-semibold">
                    Change Profile Picture
                </label>
                <input 
                    type="file"
                    className="mt-2 mb-4"
                />
                <button 
                    type="button"
                    className="w-full bg-blue-600 text-white text-[15px] py-2 rounded font-semibold"
                    onClick={() => {}}
                >
                    SAVE
                </button>
            </div>
        </div>
    )
}
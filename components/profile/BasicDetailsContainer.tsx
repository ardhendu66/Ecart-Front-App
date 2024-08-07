import { LoggedInUserDetail } from "@/config/Props";
import axios, { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import { TiTick } from "react-icons/ti";
import { toast } from "react-toastify";
import { PuffLoader, PulseLoader } from "react-spinners";
import { loaderColor } from "@/config/config";

export default function BasicDetailsContainer({fetchDetailsOfUser, fetchUserDetails } : { 
    fetchDetailsOfUser: LoggedInUserDetail,
    fetchUserDetails: () => void,
}) {
    
    const [blobImageForUpload, setblobImageForUpload] = useState<string>();
    const [isUploadingProfileImage, setIsUploadingProfileImage] = useState(false);

    const handleOnUpload = (event: ChangeEvent<HTMLInputElement>) => {
        setIsUploadingProfileImage(true);

        if(event.target.files === null) {
            return;
        }

        if(event.target.files) {
            setblobImageForUpload(URL.createObjectURL(event.target.files[0]));
        }

        const formData = new FormData();
        formData.append('upload_image', event.target.files[0]);

        axios.post("/api/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(res => {
            console.log(res.data.url);
            axios.put("/api/user/update-image", { 
                email: fetchDetailsOfUser.email, url: res.data.url 
            })
            .then(resp => {
                if(resp.status === 202) {
                    toast.success(res.data.message, { position: "top-center" });
                    fetchUserDetails();
                }
            })
            .catch((err: AxiosError) => {
                console.error(err);
                //@ts-ignore
                toast.error(err.response?.data.message || err.response?.data || err.message, { position: "top-center" });            
            })
        })
        .catch((err: AxiosError) => {
            console.error(err);
            //@ts-ignore
            toast.error(err.response?.data.message || err.response?.data || err.message, { position: "top-center" });            
        })
        .finally(() => setIsUploadingProfileImage(false));
    }

    return (
        <div className={`lg:sticky lg:overflow-y-scroll w-1/3 max-lg:w-[75%] max-md:w-[80%] max-sm:w-full max-lg:mb-5 bg-white p-10 shadow-sm ${!isUploadingProfileImage ? "h-[380px]" : "lg:h-[460px]"}`}>
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
                <button 
                    type="button"
                    className={`bg-blue-600 w-20 py-1 text-white text-[16px] ml-2 -mt-2 rounded-sm tracking-wide ${fetchDetailsOfUser.emailVerified && "hidden"}`}
                >
                    Verify
                </button>
                <div 
                    className={`flex items-center justify-center text-green-500 py-1 w-20 font-semibold border-gray-300 border-[1.3px] text-center ml-2 -mt-2 tracking-wide ${!fetchDetailsOfUser.emailVerified && "hidden"}`}
                >
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
                <div 
                    className={`text-green-500 py-1 w-20 font-semibold border-gray-300 border-[1.3px] text-center ml-2 -mt-2 tracking-wide hidden`}
                >
                    Verified
                </div>
            </div>
            <div className="flex flex-col mt-10 text-gray-500">
                <label className="text-lg text-blue-600 underline mb-[6px]">
                    Change Profile Picture
                </label>
                {
                    blobImageForUpload !== undefined 
                        ?
                    <div className={`flex gap-x-6 items-end ${isUploadingProfileImage ? "visible" : "hidden"}`}>
                        <div className="relative">
                            <img  
                                src={blobImageForUpload} 
                                alt="error"
                                className={` w-40 h-32 rounded`}  
                            />
                            <PulseLoader 
                                color={"white"}
                                size={30}
                                className="absolute top-12 left-8" 
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-y-1">
                            <PuffLoader
                                color={loaderColor}
                                size={60}
                            />
                            <div className="text-lg font-semibold">Uploading</div>
                        </div>
                    </div>
                        : 
                    null
                }
                <input 
                    type="file"
                    className="mt-2 mb-4 flex items-center justify-center"
                    onChange={(e) => handleOnUpload(e)}
                />
            </div>
        </div>
    )
}
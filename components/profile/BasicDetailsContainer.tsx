import { LoggedInUserDetail } from "@/config/Props";
import axios, { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import { TiTick } from "react-icons/ti";
import { toast } from "react-toastify";
import { PuffLoader, PulseLoader } from "react-spinners";
import { loaderColor } from "@/config/config";
import { useSession } from "next-auth/react";

export default function BasicDetailsContainer({fetchDetailsOfUser, fetchUserDetails } : { 
    fetchDetailsOfUser: LoggedInUserDetail,
    fetchUserDetails: () => void,
}) {
    
    const [blobImageForUpload, setblobImageForUpload] = useState<string>();
    const [isUploadingProfileImage, setIsUploadingProfileImage] = useState(false);
    const { data: session } = useSession();

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

    const sendEmail = () => {
        axios.post(
            `/api/auth/send-email?userId=${session?.user._id}&email=${fetchDetailsOfUser.email}&name=${fetchDetailsOfUser.name}`
        )
            .then(res => {
                toast.success(res.data.message, {position: "top-center"});
            })
            .catch((err: AxiosError) => {
                //@ts-ignore
                toast.error(err.message || err.response?.data);
            })
    }


    return (
        <div 
            className={`w-1/3 max-lg:w-[75%] max-md:w-[80%] max-sm:w-full max-lg:mb-5 bg-white p-10 shadow-sm ${!isUploadingProfileImage ? "h-[430px]" : "lg:h-[560px]"}`}
        >
            <div className="flex items-center justify-start gap-x-5">
                <img 
                    src={fetchDetailsOfUser.image!} 
                    alt="error"
                    className="w-16 h-16 rounded-full border-gray-300 border"
                />
                <span className="flex flex-col">
                    <span>Welcome, </span>
                    <span className="font-bold">
                        {fetchDetailsOfUser.name}
                    </span>
                </span>
            </div>
            <div className="uppercase mt-5">
                Email : 
            </div>
            <div className="mb-1 text-sm flex items-center tracking-tighter text-gray-500">
                <div className="font-semibold text-blue-900 bg-gray-200 px-2 py-1">
                    {fetchDetailsOfUser.email}
                </div>
                <button 
                    type="button"
                    className={`bg-blue-600 px-2 py-1 text-white ml-2 rounded-sm tracking-wide ${fetchDetailsOfUser.emailVerified && "hidden"}`}
                    onClick={sendEmail}
                >
                    Verify
                </button>
                <div 
                    className={`flex items-center justify-center text-green-500 py-1 px-2 font-semibold border-gray-300 border-[0.7px] text-center ml-2 tracking-wide ${!fetchDetailsOfUser.emailVerified && "hidden"} rounded`}
                >
                    Verified
                    <TiTick className="w-4 h-4" />
                </div>
            </div>
            <div className="uppercase">
                Mobile : 
            </div>
            <div className="flex items-center tracking-tighter text-gray-500">
                <div className="font-semibold text-blue-900 bg-gray-200 px-2 py-1">
                    {fetchDetailsOfUser.phoneNo}
                </div>
                <div
                    className={`text-red-500 border-red-500 border-[0.7px] w-28 py-1 text-[14.6px] ml-2 rounded-sm tracking-wide text-center`}
                >
                    Not Verified
                </div>
                <div 
                    className={`text-green-500 py-1 w-20 font-semibold border-gray-300 border text-center ml-2 tracking-wide hidden`}
                >
                    Verified
                </div>
            </div>
            <div className="flex flex-col mt-7 text-gray-500">
                <label className="text-xl font-bold text-sky-600 ratings">
                    Change Profile Picture
                </label>
                {
                    blobImageForUpload !== undefined 
                        ?
                    <div 
                        className={`flex gap-x-6 items-end ${isUploadingProfileImage ? "visible" : "hidden"}`}
                    >
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
                            <div className="text-lg font-semibold">
                                Uploading
                            </div>
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
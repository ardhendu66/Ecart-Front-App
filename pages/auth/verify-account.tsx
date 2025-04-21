import { useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import ProtectedLayout from "@/components/Layout";
import { decodeData } from "@/utils/encode_decode";
import { IoInformationCircleOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { UserDetailsContext, UserDetailsContextType } from "@/Context/UserDetails";
import { ClipLoader } from "react-spinners";

interface TempUserDetails {
    userId: string,
    email: string,
    name: string,
    date: string,
}

export default function VerifyAccount() {
    const [tempUserDetails, setTempUserDetails] = useState<TempUserDetails | null>(null);
    const { userDetails, setUserDetails } = useContext(UserDetailsContext) as UserDetailsContextType;
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { key } = router.query;

    const showTempUserDetails = () => {
        setTempUserDetails(prev => {
            const user = decodeData(key as string, "Token");
            return {
                userId: user.userId,
                email: user.email,
                name: user.name,
                date: user.date
            }
        })
    }

    const verifyUserEmail = () => {
        setIsLoading(true);
        axios.put(
            `/api/user/update-email?userId=${userDetails._id}&date=${userDetails.verifyToken}`
        )
            .then(res => {
                toast.success(res.data.message);
                setUserDetails(prev => ({...prev, emailVerified: true}));
            })
            .catch((err: AxiosError) => {
                console.error(err.toJSON());
                toast.error(
                    //@ts-ignore
                    err.response?.data.message || err.message + err.code,
                );
            })
            .finally(() => setIsLoading(false));
    }    

    return (
        <ProtectedLayout>
            <main className="p-20 flex justify-center flex-col gap-y-10">
                {
                    userDetails && userDetails?.emailVerified ?
                        <div
                            className="uppercase py-5 px-20 border-[1.5px] border-green-700 rounded shadow-md text-green-700 bg-white text-2xl tracking-wide"
                        >
                            your account has been verified
                        </div> :
                        <button
                            className={`${!isLoading && "py-4"} uppercase px-20 py-2 bg-green-700 rounded-sm shadow-md border border-gray-600 text-white text-2xl tracking-wider`}
                            onClick={verifyUserEmail}
                        >
                            {
                                isLoading ? 
                                <div className="flex items-center justify-center gap-x-3">
                                    Verifying.&nbsp;.&nbsp;. 
                                    <ClipLoader size={60} color="white" />
                                </div>
                                : "verify my email"
                            }
                        </button>
                }

                <button
                    className="uppercase p-5 text-white tracking-wider bg-sky-800 rounded-md w-40"
                    onClick={showTempUserDetails}
                >
                    view info
                </button>
                <div className={`${tempUserDetails === null && "hidden"} text-xl`}>
                    Hello, <span className="font-bold text-2xl rounded text-sky-700">
                        {userDetails?.name}
                    </span>.
                    Your email-id is <a
                        href={`mailto:${userDetails?.email as string}`}
                        className="font-bold text-2xl rounded underline text-sky-500"
                    >
                        {userDetails?.email}
                    </a>.
                    You applied for email verification on <span className="font-bold text-2xl rounded text-green-700">
                        {new Date(userDetails?.verifyToken).toLocaleString()}
                    </span>.
                </div>
                <div className="flex border-[1.4px] border-white p-2 rounded-sm">
                    <IoInformationCircleOutline className="w-6 h-6 -mt-[2px] mr-1" /> You can verify your email only within the next 4 hours after applying for verification.
                </div>
            </main>
        </ProtectedLayout>
    )
}
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { ClipLoader } from "react-spinners";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [areDetailsFilledUp, setAreDetailsFilledUp] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated") router.push("/");
    }, [status, router, router.pathname])

    useEffect(() => {
        if (
            name !== "" && emailId !== "" && password !== "" && confirmPassword !== "" && phoneNo !== "" && name && emailId && password && confirmPassword && phoneNo
        ) {
            setAreDetailsFilledUp(true);
        }
    }, [name, emailId, password, confirmPassword, phoneNo])

    const registerUser = () => {
        if (name === "" || emailId === "" || password === "" || confirmPassword === "" || phoneNo === "" || !name || !emailId || !password || !confirmPassword || !phoneNo) {
            return;
        }

        if (password !== confirmPassword) {
            toast.error(
                "Password & Confirm Password mismatch",
                { position: "top-center" }
            );
            return;
        }

        setIsSigningUp(true);
        
        axios.post("/api/auth/user/register", { name, email: emailId, password, phoneNo })
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    toast.success(
                        `${res.data.message}. Do Login now!`, 
                        { position: "top-center" }
                    );
                    setTimeout(() => {
                        router.push("/auth/login");
                    }, 500)
                }
                else {
                    toast.info(res.data.message, { position: "top-center" });
                }
            })
            .catch((err: AxiosError) => {
                console.error(err);
                if (err.response?.status === 405) {
                    // @ts-ignore
                    setErrorMessage(err.response?.data.message);
                }
                else {
                    // @ts-ignore
                    toast.error(err.response?.data.message, { position: "top-center" });
                }
            })
            .finally(() => setIsSigningUp(false));
    }

    return (
        <div>
            <div className="sticky top-0 z-10">
                <Header />
            </div>
            <div className="flex flex-col items-center justify-center my-6">
                <div
                    className={`flex flex-col items-center justify-center ${ErrorMessage === "" && "hidden"} bg-red-600 text-white px-5 rounded mb-3 w-[40%] md:w-[60%] sm:w-[80%] max-sm:w-[97%] py-3`}
                >
                    {
                        ErrorMessage &&
                        <div className="flex mb-3 text-xs">
                            <MdErrorOutline className="w-12 h-12 mr-2 -mt-[10px]" />
                            {ErrorMessage}
                        </div>
                    }
                    <div
                        className="w-14 bg-white py-1 text-black rounded cursor-pointer text-center font-bold"
                        onClick={() => setErrorMessage(prev => "")}
                    > Ok </div>
                </div>
                <div
                    className="flex flex-col items-center justify-center py-5 px-7 bg-white shadow-lg rounded-md border-t-[5px] border-gray-400 pb-6 border-b-[1.5px]"
                >
                    <h1 className="text-3xl text-sky-600 mb-6">
                        Create your Account
                    </h1>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full text-lg text-gray-500 border-gray-400 border-[1.5px] outline-none rounded-md p-2 bg-gray-100 mb-3"
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Enter email"
                        className="w-full text-lg text-gray-500 border-gray-400 border-[1.5px] outline-none rounded-md p-2 bg-gray-100 mb-3"
                        onChange={e => setEmailId(e.target.value)}
                    />
                    <div
                        className="flex items-center justify-center w-full gap-x-1 text-gray-500 border-gray-400 border-[1.5px] outline-none rounded-md p-2 bg-gray-100 mb-3"
                    >
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            className="w-full text-lg bg-gray-100 border-none outline-none"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div>
                            {showPassword ?
                                <FaEyeSlash
                                    className="w-6 h-6 cursor-pointer"
                                    onClick={() => setShowPassword(prev => (!prev))}
                                /> :
                                <FaEye
                                    className="w-6 h-6 cursor-pointer"
                                    onClick={() => setShowPassword(prev => (!prev))}
                                />}
                        </div>
                    </div>
                    <div
                        className="flex items-center justify-center w-full gap-x-1 text-gray-500 border-gray-400 border-[1.5px] outline-none rounded-md p-2 bg-gray-100 mb-3"
                    >
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="w-full text-lg bg-gray-100 border-none outline-none"
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <div>
                            {
                                showConfirmPassword ?
                                    <FaEyeSlash
                                        className="w-6 h-6 cursor-pointer"
                                        onClick={() => setShowConfirmPassword(prev => (!prev))}
                                    /> :
                                    <FaEye
                                        className="w-6 h-6 cursor-pointer"
                                        onClick={() => setShowConfirmPassword(prev => (!prev))}
                                    />
                            }
                        </div>
                    </div>
                    <div className="flex w-full gap-x-2 mb-4">
                        <input
                            type="text"
                            value={'+91'}
                            className="w-[15%] text-lg text-gray-500 border-gray-400 border-[1.5px] outline-none rounded-md p-2 bg-gray-100"
                        />
                        <input
                            type="number"
                            placeholder="Enter Phone No"
                            className="w-[85%] text-lg text-gray-500 border-gray-400 border-[1.5px] outline-none rounded-md p-2 bg-gray-100"
                            onChange={e => setPhoneNo(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        disabled={!areDetailsFilledUp}
                        className={`flex justify-center items-center w-full text-white rounded-md text-2xl mb-2 ${!areDetailsFilledUp && "cursor-not-allowed"} ${isSigningUp ? "bg-sky-600 py-1" : "bg-sky-500 py-2"}`}
                        onClick={registerUser}
                    >
                    {
                        isSigningUp ?
                            <ClipLoader color="white" size={40} speedMultiplier={0.5} />
                        : "Register"
                    }
                    </button>
                    <div className="flex justify-end text-sm w-full mr-4">
                        <span className="font-semibold [word-spacing:-1.5px]">
                            Already have an account?
                        </span>
                        &nbsp;
                        <Link href="/auth/login" className="underline hover:text-sky-500">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}
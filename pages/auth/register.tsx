import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { set } from "mongoose";

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
        document.title = "Join us today";
    }, []);

    useEffect(() => {
        if (status === "authenticated") router.push("/");
    }, [status, router, router.pathname])

    useEffect(() => {
        if (
            name !== "" && emailId !== "" && password !== "" && confirmPassword !== "" && phoneNo !== "" && name && emailId && password && confirmPassword && phoneNo
        ) {
            setAreDetailsFilledUp(true);
        }
        console.log(phoneNo);
        
    }, [name, emailId, password, confirmPassword, phoneNo])

    const registerUser = () => {
        if (name === "" || emailId === "" || password === "" || confirmPassword === "" || phoneNo === "" || !name || !emailId || !password || !confirmPassword || !phoneNo) {
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Password & Confirm Password mismatch");
            return;
        }

        setIsSigningUp(true);

        setTimeout(() => {
            axios.post("/api/auth/user/register", { 
                name, email: emailId, password, phoneNo 
            })
                .then(res => {
                    if (res.status === 200 || res.status === 201) {
                        toast.success(`${res.data.message}. Do Login now!`);
                        setTimeout(() => {
                            router.push("/auth/login");
                        }, 2000);
                    }
                    else {
                        toast.custom(res.data.message);
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
                        toast.error(err.response?.data.message);
                    }
                })
                .finally(() => setIsSigningUp(false));
        }, 2000);
    }


    return (
        <div className="relative min-h-screen py-10">

            {/* Background Image */}
            <div className="absolute inset-0 bg-[url('/images/login-bg.jpg')] bg-cover bg-center opacity-20 z-0"></div>

            {/* Signup Card */}
            <div className="flex items-center justify-center mb-10 relative z-10 animate-fadeIn">
                <div
                    className="flex flex-col items-center justify-center w-full max-w-md px-8 py-6 bg-white bg-opacity-90 shadow-2xl rounded-sm transition-all duration-300 backdrop-blur-md"
                >
                    <h1 className="text-3xl font-bold mb-4 text-sky-600">
                        Join Us Today 🚀
                    </h1>
                    <p className="text-sm text-gray-500 mb-6 text-center">
                        Create your account to order online and avail exclusive features
                    </p>

                    {/* Name Field */}
                    <div className="relative w-full mb-4 font-mono">
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full pl-10 pr-4 py-2 text-base text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-400 bg-gray-50"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400">🙍</span>
                    </div>

                    {/* Email Field */}
                    <div className="relative w-full mb-4 font-mono">
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="w-full pl-10 pr-4 py-2 text-base text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-400 bg-gray-50"
                            onChange={(e) => setEmailId(e.target.value)}
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400">📧</span>
                    </div>

                    {/* Password Field */}
                    <div className="relative w-full mb-4 font-mono">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full pl-10 pr-10 py-2 text-base text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-400 bg-gray-50"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
                        <div
                            className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? (
                                <FaEyeSlash className="w-5 h-5" />
                            ) : (
                                <FaEye className="w-5 h-5" />
                            )}
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="relative w-full mb-4 font-mono">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="w-full pl-10 pr-10 py-2 text-base text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-400 bg-gray-50"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
                        <div
                            className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                            {showConfirmPassword ? (
                                <FaEyeSlash className="w-5 h-5" />
                            ) : (
                                <FaEye className="w-5 h-5" />
                            )}
                        </div>
                    </div>

                    {/* Phone Field */}
                    <div className="w-full font-mono">
                        <PhoneInput
                            country={'in'}
                            // value={phoneNo}
                            onChange={phone => setPhoneNo(prev => phone.substring(2))}
                            inputClass="!w-full !py-2 !pl-12 !text-base !bg-gray-50 !text-gray-700 !border !border-gray-300 !rounded focus:!ring-2 focus:!ring-sky-400"
                            buttonClass="!bg-sky-100"
                            containerClass="mb-4"
                            specialLabel=""
                            placeholder="+91 12345-67890"
                        />
                    </div>

                    {/* Signup Button */}
                    <button
                        type="button"
                        disabled={!areDetailsFilledUp}
                        className={`w-full py-2 rounded-sm text-white font-mono font-semibold text-lg shadow-md transition-all duration-200 bg-sky-600 hover:bg-sky-700
                        ${areDetailsFilledUp ? "cursor-pointer" : "cursor-not-allowed"}`}
                        onClick={registerUser}
                    >
                        {isSigningUp ? <ClipLoader color="white" size={25}/> : "REGISTER"}
                    </button>

                    {/* Login Link */}
                    <div className="flex justify-center text-sm w-full mt-4">
                        <span className="text-gray-600">
                            Already have an account?
                        </span>
                        &nbsp;
                        <Link
                            href="/auth/login"
                            className="text-sky-600 hover:underline font-semibold"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
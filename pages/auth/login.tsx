import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

export default function LoginPage() {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);  
    const [isSigningIn, setIsSigningIn] = useState(false); 
    const [areDetailsFilledUp, setAreDetailsFilledUp] = useState(false); 
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        document.title = "Log in to your account";
    }, []);

    useEffect(() => {
        if (
            status === "authenticated" && 
            (
                router.pathname.startsWith("/auth/login") ||
                router.pathname.startsWith("/auth/register")
            )
        ) {
            router.push("/profile");
        }
    }, [status, router, router.pathname])

    useEffect(() => {
        if(emailId !== "" && password !== "" && emailId && password) 
            setAreDetailsFilledUp(true);
    }, [emailId, password])

    const signInWithCredentials = () => {
        if(!emailId || !password || emailId === "" || password === "") return;
        
        setIsSigningIn(true);

        setTimeout(() => {
            signIn('Credentials', {
                email: emailId, password,
                redirect: false,
            })
                .then(res => {
                    if(res?.ok) {
                        toast.success("Logged in successfully");
                        setTimeout(() => 
                            router.push('/')
                        , 500);
                    }
                    else if(res?.error) {
                        console.error(res.error);
                        if(res.error === "Database Connection error") 
                            toast.error("Check your Internet Connection");
                        else 
                            toast.error(res?.error);
                    }
                })
                .catch(err => {
                    console.error(err.message);
                    if(err.message === "Database Connection error") 
                        toast.error("Check your Internet Connection");
                    else 
                        toast.error("Invalid Email or Password");
                })
                .finally(() => setIsSigningIn(false));
        }, 1000);
    }


    return (
        <div>
            {/* Background Image */}
            <div className="absolute inset-0 bg-[url('/images/login-bg.jpg')] bg-cover bg-center opacity-20 z-0"></div>

            {/* Login Card */}
            <div className="flex items-center justify-center mt-14 mb-10 relative z-10 animate-fadeIn">
                <div 
                    className="flex flex-col items-center justify-center w-full max-w-md px-8 py-6 bg-white bg-opacity-90 shadow-2xl rounded-sm transition-all duration-300 backdrop-blur-md"
                >
                    <h1 className="text-3xl font-bold mb-4 text-sky-600">
                        Welcome Back 👋
                    </h1>
                    <p className="text-sm text-gray-500 mb-6 text-center">
                        Login with your email and password to continue
                    </p>

                    {/* Email Field */}
                    <div className="relative w-full mb-4 font-mono">
                        <input 
                            type="email" 
                            placeholder="Email"
                            className="w-full pl-10 pr-4 py-2 text-base text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 bg-gray-50"
                            onChange={e => setEmailId(e.target.value)}
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400">📧</span>
                    </div>

                    {/* Password Field */}
                    <div className="relative w-full mb-1 font-mono">
                        <input 
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full pl-10 pr-10 py-2 text-base text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 bg-gray-50"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
                        <div 
                            className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                        </div>
                    </div>

                    <div className="w-full flex justify-end text-sm mb-1 text-sky-600 hover:underline cursor-pointer">
                        Forgot password?
                    </div>

                    {/* Login Button */}
                    <button
                        type="button"
                        disabled={!areDetailsFilledUp}
                        className={`w-full py-2 rounded-lg text-white font-semibold text-lg shadow-md transition-all duration-200 bg-sky-600 hover:bg-sky-700 ${areDetailsFilledUp ? "cursor-pointer" : "cursor-not-allowed"} font-mono`}
                        onClick={signInWithCredentials}
                    >
                        {isSigningIn ? <ClipLoader color="white" size={25} /> : "Log in"}
                    </button>

                    {/* Register Link */}
                    <div className="flex justify-center text-sm w-full mt-4">
                        <span className="text-gray-600">
                            Don&apos;t have an account?
                        </span>
                        &nbsp;
                        <Link 
                            href="/auth/register" 
                            className="text-sky-600 hover:underline font-semibold"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
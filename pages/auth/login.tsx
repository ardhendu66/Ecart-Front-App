import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/Header";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import Footer from "@/components/Footer";

export default function LoginPage() {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);  
    const [isSigningIn, setIsSigningIn] = useState(false); 
    const [areDetailsFilledUp, setAreDetailsFilledUp] = useState(false); 
    const router = useRouter();
    const { data: session, status } = useSession();

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
        if(!emailId || !password || emailId === "" || password === "") 
            return;
        setIsSigningIn(true);
        signIn('Credentials', {
            email: emailId, password,
            redirect: false,
        }).then(res => {
            if(res?.ok) {
                router.push('/');
                setTimeout(() => 
                    toast.success("Logged in successfully", { position: "top-center" })
                , 1000);
            }
            else if(res?.error) {
                console.error(res.error);
                if(res.error === "Database Connection error") 
                    toast.error("Check your Internet Connection", { position: "top-center" });
                else 
                    toast.error(res?.error, { position: "top-center" });
            }
        })
        .catch(err => {
            console.error(err.message);
            if(err.message === "Database Connection error") 
                toast.error("Check your Internet Connection", { position: "top-center" });
            else 
                toast.error("Invalid Email or Password", { position: "top-center" });
        })
        .finally(() => setIsSigningIn(false))
    }

    return (
        <div>
            <div className="sticky top-0 z-10">
                <Header />
            </div>
            <div className="flex items-center justify-center mt-14 mb-10">
                <div 
                    className="flex flex-col items-center justify-center w-1/2 max-md:w-[80%] max-sm:w-[95%] py-5 px-8 bg-white shadow-lg rounded-md border-t-[5px] border-gray-400 pb-6 border-b-[1.5px]"
                >
                    <h1 className="text-2xl font-bold mb-3 text-sky-600">
                        Login with Email Id
                    </h1>
                    <input 
                        type="email" 
                        placeholder="Enter email"
                        className="w-full text-lg text-gray-500 border-gray-400 border-[1.5px] outline-none rounded-md p-2 bg-gray-100 my-4"
                        onChange={e => setEmailId(e.target.value)}
                    />
                    <div className="flex items-center justify-center w-full gap-x-1 text-gray-500 border-gray-400 border-[1.5px] outline-none rounded-md p-2 bg-gray-100 placeholder:text-gray-400">
                        <input 
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            className="w-full text-lg bg-gray-100 border-none outline-none"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div>
                        {
                            showPassword ? 
                            <FaEyeSlash 
                                className="w-6 h-6 cursor-pointer" 
                                onClick={() => setShowPassword(prev => (!prev))} 
                            /> :
                            <FaEye
                                className="w-6 h-6 cursor-pointer" 
                                onClick={() => setShowPassword(prev => (!prev))} 
                            />
                        }
                        </div>
                    </div>
                    <div className="w-full flex justify-end text-sm my-2 underline mr-4 cursor-pointer hover:text-sky-500">
                        Forgot password?
                    </div>
                    <button
                        type="button"
                        disabled={!areDetailsFilledUp}
                        className={`flex items-center justify-center w-full py-2 text-white rounded-md text-2xl font-semibold mb-2 ${!areDetailsFilledUp && "cursor-not-allowed"} ${isSigningIn ? "bg-sky-500" : "bg-sky-600"}`}
                        onClick={signInWithCredentials}
                    >
                    {
                        isSigningIn ? 
                        <ClipLoader color="white" size={30} className="" />
                        : <span className="text-2xl">Log in</span>
                    }
                    </button>
                    <div className="flex justify-end text-sm w-full mr-4">
                        <span className="font-semibold [word-spacing:-1.5px]">
                            Don't have an account? 
                        </span> 
                        &nbsp;
                        <Link 
                            href="/auth/register" 
                            className="underline hover:text-sky-500"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}
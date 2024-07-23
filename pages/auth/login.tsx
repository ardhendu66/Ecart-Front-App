import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/Header";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function LoginPage() {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);  
    const [isSigningIn, setIsSigningIn] = useState(false); 
    const [areDetailsFilledUp, setAreDetailsFilledUp] = useState(false); 
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated") router.push("/");
    }, [status, router, router.pathname])

    useEffect(() => {
        if(emailId !== "" && password !== "" && emailId && password) 
            setAreDetailsFilledUp(true);
    }, [emailId, password])

    const signInWithCredentials = async () => {
        if(!emailId || !password || emailId === "" || password === "") return;
        try {
            setIsSigningIn(true);
            const res = await signIn('credentials', {
                email: emailId, password,
                redirect: true,
                callbackUrl: `/${router?.query.url}`
            });
            if(res?.ok) {
                toast.success("Logged in successfully", { position: "top-center" });
                router.push(`/${router?.query.url}`);
            }
            else if(res?.error) {
                toast.error("Wrong Email or Password", { position: "top-center" });
            }
        }
        catch(e: any) {
            console.error(e.message);
            toast.error("Invalid Email or Password", { position: "top-center" });
        }
    }

    return (
        <div>
            <div className="sticky top-0 z-10">
                <Header />
            </div>
            <div className="flex items-center justify-center mt-14">
                <div className="flex flex-col items-center justify-center w-1/3 max-md:w-full py-5 px-8 bg-white shadow-lg rounded-md border-t-[5px] border-gray-400 pb-6 border-b-[1.5px]">
                    <h1 className="text-2xl font-semibold mb-3">
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
                    <div className="w-full flex justify-end text-sm my-2 underline mr-4">
                        Forgot password?
                    </div>
                    <button
                        type="button"
                        disabled={!areDetailsFilledUp}
                        className={`w-full bg-gray-500 py-2 text-white rounded-md text-2xl font-semibold mb-2 ${!areDetailsFilledUp && "cursor-not-allowed"}`}
                        onClick={signInWithCredentials}
                    >
                        Log in
                    </button>
                    <div className="flex justify-end text-sm w-full mr-4">
                        <span className="[word-spacing:-1.5px]">
                            Don't have an account? 
                        </span> 
                        &nbsp;
                        <Link href="/auth/register" className="underline font-semibold">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
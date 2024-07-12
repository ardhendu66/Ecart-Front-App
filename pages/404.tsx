import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import imgSrc from "@/public/404.png"
import { useEffect } from "react";

export default function Custom404() {
    useEffect(() => {
        document.title = "404 Error"
    }, [])

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="flex flex-col justify-center items-center w-full pt-3">
                <div className="flex items-center justify-center mt-3">
                    <div className="text-3xl text-gray-500">
                        Oops! Page Not Found.
                    </div>
                    <Link 
                        href={'/'}
                        className="text-lg text-gray-500 px-2 pt-1 pb-2 ml-10 rounded-md border-gray-500 border-[1.4px] font-[500] bg-transparent"
                    >
                        ← Go Home
                    </Link>
                </div>
                <Image
                    src={imgSrc}
                    width={700}
                    height={500}
                    alt="error"
                    priority
                    className="rounded-sm"
                />
            </div>
        </div>
    )
}
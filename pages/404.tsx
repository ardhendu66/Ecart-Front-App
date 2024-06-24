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
                <div className="flex justify-evenly text-3xl mb-5">
                    <span className="text-gray-500 underline">
                        404 error. Page you requested not found.
                    </span>
                    <Link 
                        href={'/'}
                        className="text-lg bg-gray-500 text-white px-2 pt-1 pb-2 ml-10 rounded-md"
                    >← Go Home</Link>
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
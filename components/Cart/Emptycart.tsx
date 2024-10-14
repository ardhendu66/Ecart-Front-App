import Header from "../Header";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import Footer from "../Footer";

export default function Emptycart() {
    return (
        <main className="w-screen min-h-screen bg-gray-300">
            <div className="sticky top-0 z-10">
                <Header />
            </div>
            <div className="flex items-center justify-center gap-1 mt-6 h-[700px]">
                <div 
                    className="flex items-center justify-center w-[70%] max-md:w-full p-4"
                >
                    <div className="p-4 bg-white rounded-md w-full">
                        <div className="w-full flex flex-col items-center justify-center p-8">
                            <span className="text-5xl font-medium h-20 tracking-wide mb-20">
                                Empty Cart
                            </span>
                            <Link 
                                href={'/'} 
                                className="flex bg-black text-white py-2 px-4 rounded-md"
                            >
                                <FaArrowLeftLong className="mr-3 w-6 h-6" />
                                Go Back to Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
    )
}
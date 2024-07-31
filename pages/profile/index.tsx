import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectedLayout from "@/components/Layout";

export default function UserProfile() {
    const [disabled, setDisabled] = useState({
        name: false, gender: false, email: false, phoneNo: false,
    });
    const [showAddressComponent, setShowAddressComponent] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <ProtectedLayout>
            <div className="sticky top-0 z-30">
                <Header />
            </div>
            <div className="flex flex-row-reverse mt-8 px-10 gap-x-5 mb-28">
                <div className="w-1/3 bg-white p-10 shadow-sm h-80">
                    <div className="flex items-center justify-start gap-x-5">
                        <img 
                            src={session?.user.image!} 
                            alt="error"
                            className="w-16 h-16 rounded-full border-gray-300 border"
                        />
                        <span className="flex flex-col">
                            <span>Hello, </span>
                            <span className="font-bold">{session?.user.name}</span>
                        </span>
                    </div>
                    <div className="mt-14">
                        <label className="text-xl">Change Profile Picture</label>
                        <input 
                            type="file"
                            className="my-4"
                        />
                        <button 
                            type="button"
                            className="w-full bg-blue-600 text-white text-sm py-2 rounded"
                            onClick={() => {}}
                        >
                            SAVE
                        </button>
                    </div>
                </div>
                <div 
                    className="flex flex-col w-2/3 max-md:w-[80%] max-sm:w-full bg-white lg:py-10 lg:px-20 p-10 max-sm:p-4 shadow-sm"
                >
                    <label className="text-xl mb-3">
                        Personal Information
                        <button type="button"
                            className="w-20 ml-4 text-blue-600 text-sm"
                            onClick={() => setDisabled(prev => {
                                return { ...prev, name: !prev.name };
                            })}
                        >
                            { disabled.name ? "Cancel" : "Edit" }
                        </button>
                    </label>
                    <div className="flex gap-x-4 mb-5">
                        <input 
                            type="text"
                            value={session?.user.name!}
                            className={`px-4 py-2 rounded text-sm ${disabled.name ? "bg-white border-black border-[1.5px]" : "border-gray-300 border"} outline-none sm:w-1/2`}
                            disabled={!disabled.name}
                        />
                        <button type="button"
                            className={`${!disabled.name && "hidden"} bg-blue-600 px-6 py-2 rounded text-white`}
                        > 
                            SAVE
                        </button>
                    </div>
                    <label className="text-xl mb-3">
                        Email Address
                        <button type="button"
                            className="w-20 ml-4 text-blue-600 text-sm"
                            onClick={() => setDisabled(prev => {
                                return { ...prev, email: !prev.email };
                            })}
                        >
                            { disabled.email ? "Cancel" : "Edit" }
                        </button>
                    </label>
                    <div className="flex gap-x-4 mb-5">
                        <input 
                            type="text"
                            value={session?.user.email!}
                            className={`px-4 py-2 rounded text-sm ${disabled.email ? "bg-white border-black border-[1.5px]" : "border-gray-300 border"} outline-none sm:w-1/2`}
                            disabled={!disabled.email}
                        />
                        <button type="button"
                            className={`${!disabled.email && "hidden"} bg-blue-600 px-6 py-2 rounded text-white`}
                        > 
                            SAVE
                        </button>
                    </div>
                    <label className="text-xl mb-3">
                        Mobile Number
                        <button type="button"
                            className="w-20 ml-4 text-blue-600 text-sm"
                            onClick={() => setDisabled(prev => {
                                return { ...prev, phoneNo: !prev.phoneNo };
                            })}
                        >
                            { disabled.phoneNo ? "Cancel" : "Edit" }
                        </button>
                    </label>
                    <div className="flex gap-x-4 mb-16">
                        <input 
                            type="text"
                            value={`+91${session?.user.phoneNo!}`}
                            className={`px-4 py-2 rounded text-sm ${disabled.phoneNo ? "bg-white border-black border-[1.5px]" : "border-gray-300 border"} outline-none sm:w-1/2`}
                            disabled={!disabled.phoneNo}
                        />
                        <button type="button"
                            className={`${!disabled.phoneNo && "hidden"} bg-blue-600 px-6 py-2 rounded text-white`}
                        > 
                            SAVE
                        </button>
                    </div>
                    <div className="p-3 border border-gray-300 rounded-sm">
                        <button 
                            type="button"
                            className="w-full uppercase text-blue-600 font-semibold"
                            onClick={() => setShowAddressComponent(prev => true)}
                        >
                            + &nbsp;&nbsp;Add a New Address
                        </button>
                        <div className={`${!showAddressComponent && "hidden"}`}>
                            <div>hello</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </ProtectedLayout>
    )
}
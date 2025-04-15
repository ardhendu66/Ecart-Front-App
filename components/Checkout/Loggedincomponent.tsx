import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { User } from "@/Context/UserDetails";
import { Tooltip } from "react-tooltip";
import { IoCheckmarkOutline } from "react-icons/io5";

interface CheckoutComponentProps {
    userDetails: User;
    view: number;
}

export default function CheckoutLoginComp({ userDetails, view }: CheckoutComponentProps) {
    const router = useRouter();

    return (
        <div className="bg-white p-5 rounded-sm shadow-gray-400 shadow-sm w-full my-5">
            <div className="flex items-center gap-x-2 mb-2">
                <span className="p-1 px-2 bg-gray-200 text-blue-700 text-xs font-semibold rounded mr-2"> 1 </span>
                <span className="uppercase text-gray-400 font-semibold tracking-wide text-lg"> Login </span>
                <IoCheckmarkOutline className="w-6 h-6 mb-1 text-green-600" />
            </div>
            <div className="flex items-center gap-x-4 max-sm:flex-col text-[15px]">
                <span className="p-1 px-2 bg-white mr-2"></span>
                <span className="font-semibold text-sm">
                    {userDetails?.name}
                </span>
                <span>+91-{userDetails?.phoneNo}</span>
                <span className="font-mono">{userDetails?.email}</span>
            </div>
            <div className="pl-10">
                <button
                    type="button"
                    className={`${view !== 1 && "hidden"} my-2 uppercase py-3 px-10 bg-orange-600 font-semibold text-white tracking-wider rounded-sm`}
                    onClick={() => router.push("/cart/checkout?view=2")}
                >
                    Ok
                </button>
            </div>
        </div>
    )
}
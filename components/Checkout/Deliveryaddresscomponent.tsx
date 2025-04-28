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

export default function CheckoutDeliveryAddressComp({ userDetails, view }: CheckoutComponentProps) {
    const router = useRouter();

    return (
        <div className={`bg-white ${view === 2 ? "border-blue-600 border-2 rounded" : "shadow-gray-400"} shadow-sm rounded-sm w-full my-5`}>
            <div className={`flex items-center gap-x-2 p-5 ${view === 2 && "bg-blue-600 text-white py-3 px-5"}`}>
                <div className={`p-1 px-2 bg-gray-200 text-blue-700 text-xs font-semibold rounded mr-2`}>2</div>
                <div className={`uppercase font-semibold tracking-wider text-lg ${view !== 2 && "text-gray-400"}`}>
                    Delivery address
                </div>
                <IoCheckmarkOutline
                    className={`w-6 h-6 mb-1 text-green-600 ${(view === 2 || view < 2) && "hidden"}`}
                />
            </div>
            <div className={`${view === 2 ? "py-3 pl-14 pr-4" : "-mt-3 mb-4"} ${view < 2 && "hidden"} pl-14 pr-2 ${view > 2 && "pb-8"}`}>
                <div className="tracking-wide">
                    {userDetails?.address?.houseNo ? `${userDetails?.address?.houseNo},` : ""}
                    {userDetails?.address?.address},&nbsp;
                    {userDetails?.address?.locality}&nbsp;
                </div>
                <div>
                    {userDetails?.address?.city_district_town} —
                    {userDetails?.address?.pincode},&nbsp;
                    {userDetails?.address?.state}
                </div>
                <button
                    type="button"
                    className={`${view !== 2 && "hidden"} my-2 uppercase py-3 px-10 bg-orange-600 font-semibold text-white tracking-wider rounded-sm`}
                    onClick={() => router.push("/cart/checkout?view=3")}
                >
                    Deliver here
                </button>
            </div>
        </div>
    )
}
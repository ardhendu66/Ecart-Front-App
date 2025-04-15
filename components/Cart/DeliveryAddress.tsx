import { useContext } from "react";
import { UserDetailsContext, UserDetailsContextType } from "@/Context/UserDetails";

export default function DeliveryAddressOfUser() {
    const { userDetails } = useContext(UserDetailsContext) as UserDetailsContextType;

    return (
        <div className="w-[70%] max-md:w-full my-4 shadow">
            <div className="bg-white pl-10 p-8">
                <h2 className="text-2xl ">Delivery Address</h2>
                <div className="border-gray-300 border mt-3 p-4">
                    <div className="text-lg font-semibold mb-2">
                        {userDetails?.address?.name!}
                    </div>
                    <div className="flex flex-wrap gap-x-2 gap-y-1 text-gray-400 mb-2">
                        <span className="border-gray-300 border px-2 rounded">
                            {userDetails?.address?.address}
                        </span>
                        <span className="border-gray-300 border px-2 rounded">
                            Locality - {userDetails?.address?.locality}
                        </span>
                        <span className="border-gray-300 border px-2 rounded">
                            City - {userDetails?.address?.city_district_town}
                        </span>
                        <span className="border-gray-300 border px-2 rounded">
                            HouseNo. - {userDetails?.address?.houseNo}
                        </span>
                        <span className="border-gray-300 border px-2 rounded">
                            Landmark - {userDetails?.address?.landmark}
                        </span>
                    </div>
                    <span className="border-gray-300 border px-2 rounded py-1 text-gray-500">
                        {userDetails?.address?.state} - 
                        {userDetails?.address?.pincode},
                        &nbsp; {"India"}
                    </span>
                </div>
            </div>
        </div>
    )
}
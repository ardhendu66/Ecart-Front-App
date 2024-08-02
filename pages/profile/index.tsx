import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectedLayout from "@/components/Layout";
import Field from "@/components/profile/Field";
import { Addresses, ProfileAddressComponent } from "@/components/profile/Addresses";
import { toast } from "react-toastify";
import { AddressFieldsDetails, AddressFieldsInDB } from "@/config/Props";

export default function UserProfile() {
    const { data: session } = useSession();
    const router = useRouter();
    const [disabled, setDisabled] = useState({
        name: false, email: false, phoneNo: false
    });
    const [inputValues, setInputValues] = useState({
        name: session?.user?.name as string, 
        email: session?.user?.email as string, 
        phoneNo: session?.user?.phoneNo as string,
    })
    const [addressDetails, setAddressDetails] = useState<AddressFieldsDetails>({
        name: "", pincode: "", locality: "", city_district_town: "", address: "", 
        houseNo: "", landmark: "", state: "", country: "India"
    })
    const [fetchAddressOfLoggedInUser, setFetchAddressOfLoggedInUser] = useState<AddressFieldsInDB>({
        _id: "", name: "", pincode: "", locality: "", city_district_town: "", address: "", 
        houseNo: "", landmark: "", state: "", country: ""
    });
    const [showAddressComponent, setShowAddressComponent] = useState(false);

    const fetchAddress = () => {
        axios.get(`/api/user/get-address?id=${session?.user._id}`)
        .then(res => {
            if(res.status === 200) {
                setFetchAddressOfLoggedInUser(prev => res.data);
            }
        })
        .catch(err => console.error(err))
    }

    useEffect(() => {
        if(!session?.user._id) 
            return;
        fetchAddress();
    }, [session])

    useEffect(() => {
        setInputValues({
            name: session?.user?.name as string, 
            email: session?.user?.email as string, 
            phoneNo: session?.user?.phoneNo as string,
        })
    }, [session])

    const createAddress = () => {
        if([
            addressDetails.name, 
            addressDetails.pincode, 
            addressDetails.locality, 
            addressDetails.city_district_town, 
            addressDetails.landmark, 
            addressDetails.address, 
            addressDetails.state
        ].some(f => f?.trim() === "")) {
            toast.error("Please fill all the details", { position: "top-center" });
            return;
        }

        axios.post('/api/user/create-address', {
            id: session?.user._id, 
            name: addressDetails.name, 
            pincode: addressDetails.pincode, 
            locality: addressDetails.locality, 
            address: addressDetails.address, 
            city: addressDetails.city_district_town, 
            houseNo: addressDetails.houseNo || "",
            landmark: addressDetails.landmark, 
            state: addressDetails.state, 
        })
        .then(res => {
            if(res.status === 201)
                toast.success(res.data.message, { position: "top-center" }),
                fetchAddress(), setShowAddressComponent(false);
            else 
                toast.error(res.data.message, { position: "top-center" });
        })
        .catch((err: AxiosError) => {
            //@ts-ignore
            toast.error(err.response?.data);
        })
    }

    return (
        <ProtectedLayout>
            <div className="sticky top-0 z-30">
                <Header />
            </div>
            <div className="flex flex-row-reverse max-lg:items-center max-lg:justify-center max-lg:flex-col mt-8 px-10 max-sm:px-4 gap-x-5 mb-28">
                <div className="w-1/3 max-lg:w-[75%] max-md:w-[80%] max-sm:w-full max-lg:mb-5 bg-white p-10 shadow-sm max-h-96">
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
                    <div className="mt-8 text-sm flex tracking-tighter text-gray-500 mb-4">
                        <div className="font-semibold uppercase mr-1">
                            Email_Id : 
                        </div>
                        <div>{session?.user.email}</div>
                        <button type="button"
                            className={`bg-blue-600 w-20 py-1 text-white text-[16px] ml-2 -mt-2 rounded-sm tracking-wide ${session?.user.emailVerified && "hidden"}`}
                        >
                            Verify
                        </button>
                        <div className={`text-green-500 py-1 w-20 font-semibold border-gray-300 border-[1.3px] text-center ml-2 -mt-2 tracking-wide ${!session?.user.emailVerified && "hidden"}`}>
                            Verified
                        </div>
                    </div>
                    <div className="text-sm flex tracking-tighter text-gray-500">
                        <div className="font-semibold uppercase mr-1">
                            Mobile_No : 
                        </div>
                        <div>{session?.user.phoneNo}</div>
                        <div
                            className={`text-red-500 border-red-500 border-[1.3px] w-28 py-1 text-[14.6px] ml-2 -mt-1 rounded-sm tracking-wide text-center`}
                        >
                            Not Verified
                        </div>
                        <div className={`text-green-500 py-1 w-20 font-semibold border-gray-300 border-[1.3px] text-center ml-2 -mt-2 tracking-wide hidden`}>
                            Verified
                        </div>
                    </div>
                    <div className="flex flex-col mt-7 text-gray-500">
                        <label className="text-lg uppercase font-semibold">
                            Change Profile Picture
                        </label>
                        <input 
                            type="file"
                            className="mt-2 mb-4"
                        />
                        <button 
                            type="button"
                            className="w-full bg-blue-600 text-white text-[15px] py-2 rounded font-semibold"
                            onClick={() => {}}
                        >
                            SAVE
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-y-6 w-2/3 max-lg:w-[75%] max-md:w-[80%] max-sm:w-full">
                    <div 
                        className="flex flex-col bg-white p-10 max-sm:p-4 shadow-sm"
                    >
                        <Field 
                            label="Personal Information"
                            inputValues={inputValues}
                            setInputValues={setInputValues}
                            disabled={disabled} 
                            setDisabled={setDisabled}
                            field="name"
                        />
                        <Field 
                            label="Email Address"
                            inputValues={inputValues}
                            setInputValues={setInputValues}
                            disabled={disabled} 
                            setDisabled={setDisabled}
                            field="email"
                        />
                        <Field 
                            label="Mobile Number"
                            inputValues={inputValues}
                            setInputValues={setInputValues} 
                            disabled={disabled} 
                            setDisabled={setDisabled}
                            field="phoneNo"
                        />
                    </div>
                    <div className="bg-white p-10">
                        <div className="mb-5 font-semibold">
                            Manage Addresses
                        </div>
                        <div 
                            className={`p-3 border border-gray-300 rounded-sm ${showAddressComponent && "bg-slate-100"}`}
                        >
                            <button 
                                type="button"
                                className={`w-full uppercase text-blue-600 font-semibold ${showAddressComponent && "cursor-text"}`}
                                onClick={() => setShowAddressComponent(true)}
                            >
                                + &nbsp;&nbsp;Add your current Address
                            </button>
                            <div className={`${!showAddressComponent && "hidden"} px-5 mt-6`}>
                                <Addresses 
                                    setAddress={setAddressDetails}
                                    addressDetails={addressDetails} 
                                />
                                <div className="flex gap-x-6 mt-5">
                                    <button 
                                        type="button"
                                        className="bg-blue-600 text-white font-semibold w-32 py-2 rounded-sm text-lg uppercase"
                                        onClick={createAddress}
                                    >
                                        Save
                                    </button>
                                    <button 
                                        type="button"
                                        className="bg-gray-400 text-white w-20 py-2 rounded-sm text-lg"
                                        onClick={() => setShowAddressComponent(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div 
                            className={`mt-5 ${Object.keys(fetchAddressOfLoggedInUser).length > 0 ? "visible" : "hidden"}`}
                        >
                        {
                            Object.keys(fetchAddressOfLoggedInUser).length > 0
                                ?
                            <ProfileAddressComponent 
                                fetchAddress={fetchAddressOfLoggedInUser}
                                setShowAddressComponent={setShowAddressComponent}
                                setAddressDetails={setAddressDetails}
                                fetch={fetchAddress}
                            />
                                :
                            null
                        }
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </ProtectedLayout>
    )
}
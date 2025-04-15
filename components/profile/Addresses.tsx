import { Dispatch, SetStateAction, useState } from "react";
import { useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import { addressFieldDetails, AddressFieldsDetails, AddressFieldsInDB } from "@/config/Props";
import { toast } from "react-toastify";


interface InputFieldProps {
    value: string,
    label: string,
    input: string,
    type: string,
    optional: boolean,
    setAddress: Dispatch<SetStateAction<AddressFieldsDetails>>,
}
const InputField = ({value, label, input, type, optional, setAddress}: InputFieldProps) => {
    return (
        <div className="flex flex-col gap-y-1 w-full my-2">
            <label className="flex text-sm gap-x-1 text-gray-400 font-semibold">
                <span>{label}</span>
                <span>{optional === true && '(Optional)'}</span>
            </label>
            <input 
                type={type}
                value={input === "country" ? "India" : value}
                placeholder={`Enter your ${label.toLowerCase()}`}
                className={`text-sm font-semibold text-gray-500 border-[1.32px] border-gray-300 py-2 px-4 outline-none w-full max-md:w-full rounded-sm ${(input === "country") && "bg-white cursor-not-allowed text-lg font-semibold"} placeholder:font-normal`}
                disabled={input === "country"}
                onChange={e => setAddress(prev => (
                    { ...prev, [input]: String(e.target.value) }
                ))}
            />
        </div>
    )
}


interface TextAreaFieldProps {
    value: string,
    label: string,
    textarea: string,
    setAddress: Dispatch<SetStateAction<AddressFieldsDetails>>,
}
const TextareaField = ({value, label, textarea, setAddress}: TextAreaFieldProps) => {
    return (
        <div className="flex flex-col gap-y-1 w-full my-2">
            <label className="text-sm gap-x-1 text-gray-400 font-semibold">
                {label}
            </label>
            <textarea 
                value={value}
                rows={5}
                placeholder={`Enter your ${label.toLowerCase()}`}
                className="text-sm font-semibold text-gray-500 border-[1.32px] border-gray-300 py-2 px-4 outline-none w-full max-md:w-full rounded placeholder:font-normal"
                onChange={e => setAddress(prev => (
                    { ...prev, [textarea]: e.target.value }
                ))}
            ></textarea>
        </div>
    )
}


interface AddressesProps {
    setAddress: Dispatch<SetStateAction<AddressFieldsDetails>>,
    addressDetails: AddressFieldsDetails,
}
export const Addresses = ({addressDetails, setAddress}: AddressesProps) => {

    // console.log(addressDetails);
    
    return (
        <div className="">
            <div className="flex justify-between max-md:flex-col gap-x-2 my-2">
                <InputField 
                    type="text"
                    label={"Name"} 
                    input="name" 
                    setAddress={setAddress}
                    optional={false}
                    value={addressDetails?.name}
                />
                <InputField 
                    type="number" 
                    label={"PINCODE"}
                    input="pincode"
                    setAddress={setAddress}
                    optional={false}
                    value={addressDetails?.pincode}
                />
            </div>
            <div className="flex justify-between max-md:flex-col gap-x-2 my-2">
                <InputField 
                    type="text"
                    label={"Locality"} 
                    input="locality" 
                    setAddress={setAddress}
                    optional={false}
                    value={addressDetails?.locality}
                />
                <InputField 
                    type="text"
                    label={"City/District/Town"} 
                    input="city_district_town" 
                    setAddress={setAddress}
                    optional={false}
                    value={addressDetails?.city_district_town}
                />
            </div>
            <TextareaField  
                label={"Address (Area and Street)"} 
                textarea="address"
                setAddress={setAddress}
                value={addressDetails?.address}
            />
            <div className="flex justify-between max-md:flex-col gap-x-2 my-2">
                <InputField 
                    type="text"
                    label={"House No"} 
                    input="houseNo" 
                    optional={true}
                    setAddress={setAddress}
                    value={addressDetails?.houseNo}
                />
                <InputField 
                    type="text"
                    label={"Landmark"} 
                    input="landmark" 
                    setAddress={setAddress}
                    optional={false}
                    value={addressDetails?.landmark}
                />
            </div>
            <div className="flex justify-between max-md:flex-col gap-x-2 my-2">
                <InputField 
                    type="text"
                    label={"State"} 
                    input="state"
                    setAddress={setAddress}
                    optional={false}
                    value={addressDetails?.state}
                />
                <InputField 
                    type="text"
                    label={"Country"} 
                    input="country"
                    setAddress={setAddress}
                    optional={false}
                    value={addressDetails?.country}
                />
            </div>
        </div>
    )
}


interface ProfileAddressCompProps {
    fetchAddress: AddressFieldsInDB,
    setShowAddressComponent: Dispatch<SetStateAction<boolean>>,
    setAddressDetails: Dispatch<SetStateAction<AddressFieldsDetails>>,
    fetch: () => void,
}
export const ProfileAddressComponent = ({
    fetchAddress, setShowAddressComponent, setAddressDetails, fetch
}: ProfileAddressCompProps) => 
{
    const [showAddressAction, setShowAddressAction] = useState(false);
    const { data: session } = useSession();

    const editAddress = () => {
        setShowAddressComponent(true);
        //@ts-ignore
        setAddressDetails(prev => {
            prev = fetchAddress;
            //@ts-ignore
            delete prev._id;
            // console.log(prev);
            return prev;
        });
    }

    const deleteAddress = () => {
        axios.delete(`/api/user/delete-address?aid=${fetchAddress._id}&uid=${session?.user._id}`)
        .then(res => {
            if(res.status === 202) {
                toast.success(res.data.message, { position: "top-center" });
                setAddressDetails(prev => addressFieldDetails);
                fetch();
            }
            else {
                toast.error(res.data.message, { position: "top-center" });
            }
        })
        .catch((err: AxiosError) => {
            //@ts-ignore
            toast.error(err.response?.data, { position: "top-center" });
        })
    }
    

    return (
        <div className={`
            border-[1.3px] border-gray-300 px-7 pt-4 pb-5`
        }>
            <div className="relative flex justify-between">
                <div className="bg-gray-200 text-gray-400 pt-1 pb-[3px] w-[85px] rounded-sm text-center text-xs uppercase font-medium">
                    Address
                </div>
                <BsThreeDotsVertical 
                    className={`w-6 h-6 text-gray-500 cursor-pointer`}
                    onMouseOver={() => setShowAddressAction(true)}
                />
                <div 
                    className={`flex flex-col absolute top-6 -right-8 bg-gray-200 p-3 rounded text-gray-400 font-semibold ${!showAddressAction && "hidden"} gap-y-2`}
                    onMouseOver={() => setShowAddressAction(true)} 
                    onMouseOut={() => setShowAddressAction(false)}
                >
                    <button 
                        type="button"
                        className="border-[1.3px] bg-white border-gray-300 py-1 px-2 text-center rounded-md"
                        onClick={editAddress}
                    >
                        Edit
                    </button>
                    <button 
                        type="button" 
                        className="border-[1.3px] bg-white border-gray-300 py-1 px-2 rounded-md"
                        onClick={deleteAddress}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <h1 className="text-lg font-semibold mt-3 mb-2">{fetchAddress?.name}</h1>
            <div className="flex flex-wrap text-sm text-gray-400 gap-[2.5px]">
                <div className="border border-gray-200 py-1 px-2 rounded">
                    {fetchAddress.address}
                </div>
                <div className="border border-gray-200 py-1 px-2 rounded">
                    {fetchAddress.city_district_town} 
                </div>
                <div className="border border-gray-200 py-1 px-2 rounded">
                    Locality - {fetchAddress.locality}
                </div>
                <div className="border border-gray-200 py-1 px-2 rounded">
                    Landmark - {fetchAddress.landmark} 
                </div>
                <div className="border border-gray-200 py-1 px-2 rounded">
                    House_No - {fetchAddress.houseNo} 
                </div>
            </div>
            <div className="flex flex-wrap text-gray-500 text-sm mt-1 font-semibold">
                <div className="border border-gray-200 py-1 px-2 rounded">
                    {fetchAddress.state} - {fetchAddress.pincode}, 
                    <span className="ml-2">{fetchAddress.country}</span>
                </div>
            </div>
        </div>
    )
}
import Field from "@/components/profile/Field";
import { Addresses, ProfileAddressComponent } from "@/components/profile/Addresses";
import { 
    AddressFieldsDetails, AddressFieldsInDB, ProfileBasicDetails, BasicDetailsDisabledOrNot 
} from "@/config/Props";
import { Dispatch, SetStateAction } from "react";

interface Props {
    inputValues: ProfileBasicDetails,
    setInputValues: Dispatch<SetStateAction<ProfileBasicDetails>>,
    disabled: BasicDetailsDisabledOrNot,
    setDisabled: Dispatch<SetStateAction<BasicDetailsDisabledOrNot>>,
    showAddressComponent: boolean,
    setShowAddressComponent: Dispatch<SetStateAction<boolean>>,
    addressDetails: AddressFieldsDetails,
    setAddressDetails: Dispatch<SetStateAction<AddressFieldsDetails>>,
    fetchAddressOfLoggedInUser: AddressFieldsInDB,
    createAddress: () => void,
    fetchAddress: () => void,
}
export default function AddressDetailsContainer({
    inputValues, 
    setInputValues, 
    disabled, 
    setDisabled, 
    showAddressComponent, 
    setShowAddressComponent, 
    addressDetails, 
    setAddressDetails, 
    fetchAddressOfLoggedInUser, 
    createAddress, 
    fetchAddress 
}: Props) {
    return (
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
    )
}
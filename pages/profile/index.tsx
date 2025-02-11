import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectedLayout from "@/components/Layout";
import { toast } from "react-toastify";
import { AddressFieldsDetails, AddressFieldsInDB, LoggedInUserDetail } from "@/config/Props";
import BasicDetailsContainer from "@/components/profile/BasicDetailsContainer";
import AddressDetailsContainer from "@/components/profile/AddressDetailsContainer";

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
    const [fetchDetailsOfUser, setFetchDetailsOfUser] = useState<LoggedInUserDetail>({
        name: "", email: "", phoneNo: "", emailVerified: false, image: ""
    });
    const [showAddressComponent, setShowAddressComponent] = useState(false);

    const fetchUserDetails = () => {
        axios.get(`/api/user/find?id=${session?.user._id}`)
        .then(res => {
            if(res.status === 200) {
                setInputValues(res.data);
                setFetchDetailsOfUser(res.data);
            }
        })
        .catch(err => console.error(err))
    }

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
        fetchUserDetails();
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
            if(res.status === 201) {
                toast.success(res.data.message, { position: "top-center" });
                fetchAddress();
                setShowAddressComponent(false);
            }
            else 
                toast.error(res.data.message, { position: "top-center" });
        })
        .catch((err: AxiosError) => {
            //@ts-ignore
            toast.error(err.response?.data, { position: "top-center" });
        })
    }

    return (
        <ProtectedLayout>
            <div className="sticky top-0 z-30">
                <Header />
            </div>
            <div 
                className="relative flex flex-row-reverse max-lg:items-center max-lg:justify-center max-lg:flex-col mt-4 px-10 max-sm:px-4 gap-x-5 mb-5"
            >

                <BasicDetailsContainer 
                    fetchDetailsOfUser={fetchDetailsOfUser} 
                    fetchUserDetails={fetchUserDetails}
                />

                <AddressDetailsContainer
                    inputValues={inputValues}
                    setInputValues={setInputValues}
                    disabled={disabled}
                    setDisabled={setDisabled}
                    showAddressComponent={showAddressComponent}
                    setShowAddressComponent={setShowAddressComponent}
                    addressDetails={addressDetails}
                    setAddressDetails={setAddressDetails}
                    fetchAddressOfLoggedInUser={fetchAddressOfLoggedInUser}
                    createAddress={createAddress}
                    fetchAddress={fetchAddress}
                />

            </div>
            <Footer/>
        </ProtectedLayout>
    )
}
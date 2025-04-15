import { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface User {
    _id: string,
    name: string,
    email: string,
    phoneNo: string,
    image: string,
    emailVerified: boolean,
    verifyToken: string,
    forgotPasswordToken: string,
    address?: {
        _id: string,
        name: string,
        pincode: string,
        locality: string,
        city_district_town: string,
        address: string,
        houseNo?: string,
        landmark: string,
        state: string,
        country: string,
    },
    createdAt: Date,
    updatedAt: Date,
}

export interface UserDetailsContextType {
    userDetails: User,
    setUserDetails: Dispatch<SetStateAction<User>>,
}

export const UserDetailsContext = createContext<UserDetailsContextType | Object>({});

export default function UserDetailsProvider({children}: any) {
    const { data: session, status } = useSession();
    const [userDetails, setUserDetails] = useState<User>();

    const fetchUser = () => {
        axios.get(`/api/user/find?userId=${session?.user._id}`)
            .then(res => {
                if(res.status === 200) {
                    setUserDetails(res.data);
                }
            })
            .catch((err: AxiosError) => {
                console.error(err.message);
                //@ts-ignore
                toast.error(err.response?.data?.message || err.response?.data || err.message, { position: "top-center" });
            })
    }

    useEffect(() => {
        if(status === "authenticated") {
            fetchUser();
        }
    }, [session])

    return (
        <UserDetailsContext.Provider value={{userDetails, setUserDetails}}>
            {children}
        </UserDetailsContext.Provider>
    )
}
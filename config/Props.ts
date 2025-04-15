// Profile page Props
export interface AddressFieldsDetails {
    name: string,
    pincode: string,
    locality: string,
    address: string,
    city_district_town: string,
    houseNo: string,
    landmark: string,
    state: string,
    country: string,
}
export const addressFieldDetails: AddressFieldsDetails = {
    name: "",
    pincode: "",
    locality: "",
    address: "",
    city_district_town: "",
    houseNo: "",
    landmark: "",
    state: "",
    country: "",
}

export interface AddressFieldsInDB {
    _id: string,
    name: string,
    pincode: string,
    locality: string,
    address: string,
    city_district_town: string,
    houseNo: string,
    landmark: string,
    state: string,
    country: string,
}

export interface ProfileBasicDetails {
    name: string,
    email: string,
    phoneNo: string,
}

export interface BasicDetailsDisabledOrNot {
    name: boolean,
    email: boolean,
    phoneNo: boolean,
}

export interface LoggedInUserDetail {
    name: string,
    email: string,
    phoneNo: string,
    emailVerified: boolean,
    image: string,
}
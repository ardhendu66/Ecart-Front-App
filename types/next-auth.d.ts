import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User {
        _id?: string,
        phoneNo?: string,
        emailVerified?: boolean,
        addressLine1? : string,
        addressLine2? : string,
        houseNo?: string,
        city?: string,
        pincode?: number,
        street?: string,
        landmark?: string,
        state?: string,
        country?: string,
    }

    interface Session {
        user: {
            _id?: string,
            phoneNo?: string,
            emailVerified?: boolean,
            addressLine1? : string,
            addressLine2? : string,
            houseNo?: string,
            city?: string,
            pincode?: number,
            street?: string,
            landmark?: string,
            state?: string,
            country?: string,
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string,
        phoneNo?: string,
        emailVerified?: boolean,
        addressLine1? : string,
        addressLine2? : string,
        houseNo?: string,
        city?: string,
        pincode?: number,
        street?: string,
        landmark?: string,
        state?: string,
        country?: string,
    }
}
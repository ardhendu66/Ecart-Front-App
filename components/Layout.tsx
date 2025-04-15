import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Custom404 from "@/pages/404";
import toast from "react-hot-toast";

export default function ProtectedLayout({children}: any) {
    const { data: session, status } = useSession();

    useEffect(() => {
        if(status === "unauthenticated") {
            toast.error("Please Log in to access this page");
        }
    }, [session])

    if(!session) {
        return <Custom404 />
    }

    return (
        <div>
            {children}
        </div>
    )
}
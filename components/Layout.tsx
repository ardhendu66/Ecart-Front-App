import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Custom404 from "@/pages/404";
import { toast } from "react-toastify";

export default function ProtectedLayout({children}: any) {
    const { data: session, status } = useSession();

    useEffect(() => {
        if(status === "unauthenticated") {
            toast.error("Please Log in to access this page", { position: "top-center" });
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


// return (
//     <div className="">
//         <div className="sticky top-0 z-30">
//             <Header />
//         </div>
//         <div className="min-h-[80vh] flex justify-center">
//             <div className="mt-20 text-2xl font-semibold text-gray-600">
//                 Please&nbsp;
//                 <Link href='/auth/login'>   
//                     <span className="underline text-3xl">
//                         Log in
//                     </span> 
//                 </Link>
//                 &nbsp;to access this page.
//             </div>
//         </div>
//         <Footer/>
//     </div>
// )
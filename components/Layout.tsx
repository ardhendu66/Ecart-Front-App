import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import Custom404 from "@/pages/404";

export default function ProtectedLayout({children}: any) {
    const { data: session, status } = useSession();
    const router = useRouter();

    if(!session) {
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

        return (
            <Custom404 />
        )
    }

    return (
        <div>
            {children}
        </div>
    )
}
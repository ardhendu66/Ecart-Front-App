import { useState } from "react";
import { useSession } from "next-auth/react";
import NormalHeaderWithSession from "./Header/Session/Normal";
import ResponsiveHeaderWithSession from "./Header/Session/Responsive";
import NormalHeaderWithNoSession from "./Header/NoSession/Normal";
import ResponsiveHeaderWithNoSession from "./Header/NoSession/Responsive";

export default function Header() {
    const [collapseNavbar, setCollapseNavbar] = useState(true);
    const { data: session } = useSession();

    if(session) {
        return (
            <div>
                <header 
                    // className={`grid grid-cols-8 bg-gradient-to-r from-red-500 to-green-600 text-white max-md:hidden shadow-md px-6 py-4`}
                    className={`grid grid-cols-8 bg-gradient-to-r from-[#db6a41] via-white to-[#138808] text-white max-md:hidden shadow-md px-6 py-4`}
                    // className={`grid grid-cols-8 bg-green-600 text-white max-md:hidden shadow-md px-6 py-4`}
                >
                    <NormalHeaderWithSession 
                        setCollapseNavbar={setCollapseNavbar} 
                    />
                </header>
                <header 
                    className="text-white bg-gradient-to-r from-red-500 to-green-600 md:hidden transition-all shadow-md px-4 py-3"
                >
                    <ResponsiveHeaderWithSession
                        collapseNavbar={collapseNavbar}
                        setCollapseNavbar={setCollapseNavbar}
                    />
                </header>
            </div>
        )
    }

    return (
        <>
            <header 
                className={`grid grid-cols-8 bg-gradient-to-r from-red-500 to-green-600 text-white max-md:hidden shadow-xl pt-2 pb-5`}
            >
                <NormalHeaderWithNoSession 
                    setCollapseNavbar={setCollapseNavbar}
                />
            </header>

            <header 
                className="text-white bg-gradient-to-r from-red-500 to-green-600 md:hidden transition-all shadow-xl pb-4"
            >
                <ResponsiveHeaderWithNoSession
                    collapseNavbar={collapseNavbar}
                    setCollapseNavbar={setCollapseNavbar}
                />
            </header>
        </>
    )
}
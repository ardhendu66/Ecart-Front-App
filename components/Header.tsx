import { useEffect, useState } from "react";
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
                    className={`grid grid-cols-8 bg-sky-700 text-white font-semibold max-md:hidden shadow-xl pt-2 pb-3`}
                >
                    <NormalHeaderWithSession 
                        setCollapseNavbar={setCollapseNavbar} 
                    />
                </header>
                <header 
                    className="text-white bg-sky-700 font-semibold md:hidden transition-all shadow-xl py-2"
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
                className={`grid grid-cols-8 bg-sky-700 text-white font-semibold max-md:hidden shadow-xl pt-2 pb-5`}
            >
                <NormalHeaderWithNoSession 
                    setCollapseNavbar={setCollapseNavbar}
                />
            </header>

            <header 
                className="text-white bg-sky-700 font-semibold md:hidden transition-all shadow-xl pb-4"
            >
                <ResponsiveHeaderWithNoSession
                    collapseNavbar={collapseNavbar}
                    setCollapseNavbar={setCollapseNavbar}
                />
            </header>
        </>
    )
}
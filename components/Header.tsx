import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import NormalHeaderWhileSession from "./Header/Session/Normal";
import ResponsiveHeaderWhileSession from "./Header/Session/Responsive";
import NormalHeaderWhileNoSession from "./Header/NoSession/Normal";
import ResponsiveHeaderWhileNoSession from "./Header/NoSession/Responsive";

export default function Header() {
    const [collapseNavbar, setCollapseNavbar] = useState(true);
    const [urlPath, setUrlPath] = useState("")
    const { data: session } = useSession();

    useEffect(() => {
        const url = localStorage.getItem("path");
        setUrlPath(prev => url as string);
    }, [])

    if(session) {
        return <div>
            <header 
                className={`grid grid-cols-7 bg-white text-black font-semibold max-md:hidden shadow-md py-2`}
            >
                <NormalHeaderWhileSession 
                    setCollapseNavbar={setCollapseNavbar} 
                />
            </header>
            <header 
                className={`flex ${!collapseNavbar ? "flex-col" : "justify-around max-sm:justify-start"} bg-white text-black font-semibold md:hidden transition-all`}
            >
                <ResponsiveHeaderWhileSession
                    collapseNavbar={collapseNavbar}
                    setCollapseNavbar={setCollapseNavbar}
                />
            </header>
        </div>
    }

    return (
        <>
            <header 
                className={`grid grid-cols-7 bg-white text-black font-semibold max-md:hidden shadow-md py-2`}
            >
                <NormalHeaderWhileNoSession 
                    urlPath={urlPath}
                    setCollapseNavbar={setCollapseNavbar}
                />
            </header>

            <header 
                className={`flex ${!collapseNavbar ? "flex-col" : "justify-around max-sm:justify-start"} bg-white text-black font-semibold md:hidden transition-all`}
            >
                <ResponsiveHeaderWhileNoSession
                    collapseNavbar={collapseNavbar}
                    setCollapseNavbar={setCollapseNavbar}
                />
            </header>
        </>
    )
}
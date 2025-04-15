import { useEffect } from "react";
import CustomError404 from "@/components/Error/404";

export default function Custom404() {
    useEffect(() => {
        document.title = "404 Error"
    }, [])

    return (
        <CustomError404 />
    )
}
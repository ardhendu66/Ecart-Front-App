import Header from "@/components/Header";
import AllProducts from "@/components/HomeProducts"
import { useEffect } from "react";

export default function Products() {
    useEffect(() => {
        document.title = 'Products'
        console.log("title");        
    }, [])

    return (
        <div>
            <Header />
            <div className="text-4xl font-normal ml-10 mt-3 -mb-4">
                All Products
            </div>
            <AllProducts />
        </div>
    )
}
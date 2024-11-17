import { useState, useEffect, useContext, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { Product } from "@/config/types";
import { CartContextType, CartContext } from "@/Context/CartContext";
import { ProductsDetailsContext, ProductsDetailsContextType } from "@/Context/ProductContext";
import ProfileDropdown from "@/components/profile/Dropdown";
import { IoMdCart } from "react-icons/io";
import { FaBars } from "react-icons/fa6";

export default function NormalHeaderWhileSession(
    {setCollapseNavbar}: {setCollapseNavbar: Dispatch<SetStateAction<boolean>>
}) {
    const { cartProducts } = useContext(CartContext) as CartContextType;
    const { setIsLoadingProducts, setProductsDetails } = useContext(ProductsDetailsContext) as ProductsDetailsContextType;
    const [searchInput, setSearchInput] = useState<string>("");
    const [allProductsDetails, setAllProductsDetails] = useState<Product[] | null>(null);
    const [searchButtonClicked, setSearchButtonClicked] = useState(false);

    useEffect(() => { 
        if(searchButtonClicked == true) {
            setIsLoadingProducts(true);
            axios.get('/api/product/get-products')
            .then(res => {
                setAllProductsDetails(res.data.products);
            })
            .catch((err: AxiosError) => console.log({
                message: err.message, 
                name: err.name, 
                response: err.response?.data
            }))
            .finally(() => setIsLoadingProducts(false));
        }    
    }, [searchButtonClicked])

    const handleOnSearch = (searchInput: string) => {
        setSearchButtonClicked(true);
        if (!allProductsDetails) return;
        const searchedProducts: Product[] = allProductsDetails.filter(p => {
            const str = p.name.toLowerCase().replaceAll(" ", "");
            const str1 = searchInput.toLowerCase().replaceAll(" ", "");
            return str.includes(str1);
        });
        setProductsDetails(searchedProducts);
        setSearchButtonClicked(false);
    }


    return (
        <>
            <div className="col-span-2 text-3xl text-center m-2">
                <Link href={'/'} className="w-1/2 text-4xl">
                    Ecomstore
                </Link>
            </div>
            <div className="flex col-span-4 mt-2">
                <input 
                    type="text"
                    placeholder="Search products by name"
                    className="w-[80%] px-4 text-black rounded-md mr-1 border-gray-400 border-[1.4px] outline-none font-normal h-10"
                    onChange={e => setSearchInput(e.target.value)}
                />
                <button 
                    type="button"
                    className="bg-gray-400 h-10 font-normal text-white px-5 rounded-md shadow-md hover:bg-gray-500"
                    onClick={() => handleOnSearch(searchInput)}
                >
                    Search
                </button>
            </div>
            <nav className="col-span-1 flex text-white text-xl font-normal">
                <Link 
                    href={'/cart'} 
                    className="flex justify-start text-gray-300 p-2 mt-1"
                >
                    <IoMdCart className="w-[50px] h-[36px] text-white" />
                    <span 
                        className={`${!cartProducts.length && "hidden"} flex items-center justify-center w-7 h-7 bg-yellow-600 text-white rounded-full -ml-4 -mt-2`}
                    >
                        {cartProducts.length}
                    </span>
                    <span className="text-white mt-1">Cart</span>
                </Link>
            </nav>
            <span className="col-span-1 flex items-center justify-center">
                <ProfileDropdown />
            </span>
        </>
    )
}
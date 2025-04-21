import { useState, useContext, Dispatch, SetStateAction, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/config/types";
import { CartContextType, CartContext } from "@/Context/CartContext";
import { ProductsDetailsContext, ProductsDetailsContextType } from "@/Context/ProductContext";
import { IoMdCart } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import axios, { AxiosError } from "axios";

interface HeaderProps {
    setCollapseNavbar: Dispatch<SetStateAction<boolean>>
}

export default function NormalHeaderWhileNoSession({ setCollapseNavbar } : HeaderProps) {
    const { cartProducts } = useContext(CartContext) as CartContextType;
    const { setIsLoadingProducts, setProductsDetails } = useContext(ProductsDetailsContext) as ProductsDetailsContextType;
    const [searchInput, setSearchInput] = useState("");
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

    // responsible for search functionality
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
                <Link href={'/'} className="text-4xl">
                    Ecomstore
                </Link>
            </div>
            <div className="flex col-span-4 mt-2">
                <input 
                    type="text"
                    placeholder="Search products by name"
                    className="w-[80%] px-4 text-black rounded-xl mr-1 outline-yellow-400 font-normal h-10"
                    onChange={e => setSearchInput(e.target.value)}
                />
                {/* <button 
                    type="button"
                    className="bg-gray-400 h-10 font-normal text-white px-5 rounded-md shadow-md hover:bg-gray-500"
                    onClick={e => handleOnSearch(searchInput)}
                >
                    Search
                </button> */}
            </div>
            <span className="col-span-1 flex items-center justify-between mt-1">
                <Link
                    href={`/auth/login`}
                    className="flex items-center justify-center font-semibold bg-bl py-[6px] lg:px-6 md:px-3 text-white text-lg rounded-[4px] bg-yellow-600 hover:bg-yellow-400 shadow-md"
                >
                    Log in
                </Link>
                <span className="mt-2 mr-2 md:hidden">
                    <FaBars 
                        className="w-8 h-8 hover:cursor-pointer"
                        onClick={() => setCollapseNavbar(prev => !prev)}
                    />
                </span>
            </span>
            <nav className="col-span-1 flex text-white text-xl font-normal">
                <Link 
                    href={'/cart'} 
                    className="flex justify-start text-white p-2"
                >
                    <IoMdCart className="w-[50px] h-[36px] text-white" />
                    <span 
                        className={`${!cartProducts.length && "hidden"} flex items-center justify-center w-7 h-7 bg-yellow-600 text-white rounded-full -ml-4 -mt-2`}
                    >
                        {cartProducts.length}
                    </span>
                    <span className="text-white mt-1 max-lg:hidden">Cart</span>
                </Link>
            </nav>
        </>
    )
}
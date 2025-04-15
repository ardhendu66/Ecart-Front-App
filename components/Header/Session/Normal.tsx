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
            <div className="col-span-2 flex items-center justify-center tracking-wide">
                <Link 
                    href="/" 
                    className="text-white transition-colors duration-200 font-extrabold text-4xl font-mono"
                >
                    Ecomstore
                </Link>
            </div>

            <div className="col-span-4 flex items-center justify-center space-x-2">
                <input
                    type="text"
                    placeholder="Search products"
                    className="w-full max-w-[450px] h-10 px-4 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
                    onChange={e => setSearchInput(e.target.value)}
                />
            </div>

            <nav className="col-span-1 flex items-center justify-center relative">
                <Link 
                    href="/cart" 
                    className="relative flex items-center text-white transition-colors"
                >
                    <IoMdCart className="w-10 h-10 hover:scale-150 transition-all" />
                    {!!cartProducts.length && (
                        <span className="absolute -top-2 left-6 flex items-center justify-center w-6 h-6 text-sm text-white bg-yellow-500 rounded-full shadow font-semibold">
                            {cartProducts.length}
                        </span>
                    )}
                    <span className="ml-2 text-xl font-semibold">Cart</span>
                </Link>
            </nav>

            <span className="col-span-1 flex items-center justify-center">
                <ProfileDropdown />
            </span>
        </>
    )
    
}
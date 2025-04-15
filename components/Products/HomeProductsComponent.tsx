import { useState, useEffect, useContext } from "react";
import axios, { AxiosError } from "axios";
import ProductsList from "./ProductComponent";
import { Product } from "@/config/types";
import { CartContext, CartContextType } from "@/Context/CartContext";
import { ProductsDetailsContext, ProductsDetailsContextType } from "@/Context/ProductContext";
import { CategoryDetailsContext, CategoryDetailsContextType } from "@/Context/CategoryContext";
import { loaderColor } from "@/config/config";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function AllProducts() {
    const { addProductToCart } = useContext(CartContext) as CartContextType;
    const { 
        productsDetails, isLoadingProducts 
    } = useContext(ProductsDetailsContext) as ProductsDetailsContextType;


    return (
        <div className="w-full mt-10">
        {
            isLoadingProducts
                ?
            <div className="col-span-4 text-center">
                <ClipLoader size={90} color={loaderColor} />
            </div>
                :
            productsDetails.length > 0
                ?
            <ProductsList
                products={productsDetails}
                addProductToCart={addProductToCart}
            />
                :
            <div className="col-span-4 text-center font-semibold text-2xl">
                No products found
            </div>
        }
        </div>
    )
}


export const SearchInputBar = () => {
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
        <div className="md:hidden">
            <div className="w-full flex justify-center mt-2">
            <input
                type="text"
                placeholder="Search products by name"
                className="w-[70%] px-4 text-black rounded-md mr-1 border-gray-400 border-[1.4px] outline-none font-normal h-10"
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
        </div>
    )
}


export const FilteredByCategory = () => {
    const [category, setCategory] = useState<string>("");
    const { categoryDetails } = useContext(CategoryDetailsContext) as CategoryDetailsContextType;
    const { setProductsDetails, setIsLoadingProducts } = useContext(ProductsDetailsContext) as ProductsDetailsContextType;
    const [allProductsDetails, setAllProductsDetails] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = () => {    
            axios.get('/api/product/get-products')
            .then(res => {
                if(res.status === 200) {
                    setAllProductsDetails(res.data.products);
                }
            })
            .catch((err: AxiosError) => console.log({
                message: err.message,
                name: err.name,
                response: err.response?.data,
                statusCode: err.response?.status || err.status,
            }))
        }
        fetchData();
        if(category == "") {
            setProductsDetails(allProductsDetails);
        }
        else {
            if(allProductsDetails.length == 0) return;
            const filteredProducts: Product[] = allProductsDetails?.filter(
                p => p.category._id == category
            );
            setProductsDetails(filteredProducts);
        }
    }, [category])

    return (
        <select 
            className="text-xl font-medium py-2 px-4 rounded-md border-gray-300 border shadow-md"
            value={category}
            onChange={e => setCategory(e.target.value)}
        >
            <option value="">Category: None</option>
            {
                categoryDetails?.map(c => (
                    <option value={c._id} key={c._id}>
                        {c.name}
                    </option>
                ))
            }
        </select>
    )
}
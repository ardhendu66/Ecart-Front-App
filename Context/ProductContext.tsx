import { useState, useEffect, createContext, Dispatch, SetStateAction } from "react";
import axios, { AxiosError } from "axios";
import { Product } from "@/config/types";
import { toast } from "react-toastify";

export interface ProductsDetailsContextType {
    productsDetails: Product[],
    setProductsDetails: Dispatch<SetStateAction<Product[]>>,
    isLoadingProducts: boolean,
    setIsLoadingProducts: Dispatch<SetStateAction<boolean>>,
}

export const ProductsDetailsContext = createContext<ProductsDetailsContextType | Object>({});

export default function ProductsDetailsProvider({children}: any) {
    const [productsDetails, setProductsDetails] = useState<Product[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);

    const fetchProducts = () => {
        setIsLoadingProducts(true);
        axios.get('/api/product/get-products')
        .then(res => {
            setProductsDetails(res.data.products);
        })
        .catch((err: AxiosError) => {
            console.log(err.message, err.response?.data);           
            toast.error("Something went wrong", { position: "top-center" });
        })
        .finally(() => setIsLoadingProducts(false));
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <ProductsDetailsContext.Provider value={{
            productsDetails, 
            setProductsDetails,
            isLoadingProducts,
            setIsLoadingProducts,
        }}>
            {children}
        </ProductsDetailsContext.Provider>
    )
}
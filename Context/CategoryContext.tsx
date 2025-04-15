import { useState, createContext, useEffect, Dispatch, SetStateAction } from "react";
import axios, { AxiosError } from "axios";
import { CategoryClass } from "@/config/types";

export interface CategoryDetailsContextType {
    categoryDetails: CategoryClass[],
    setCategoryDetails: Dispatch<SetStateAction<CategoryClass[]>>,
    isLoadingCategories: boolean,
    setIsLoadingCategories: Dispatch<SetStateAction<boolean>>,
}

export const CategoryDetailsContext = createContext<CategoryDetailsContextType | Object>({});

export default function CategoryDetailsProvider({children}: any) {
    const [categoryDetails, setCategoryDetails] = useState<CategoryClass[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(false);

    const fetchCategories = () => {
        setIsLoadingCategories(true);
        axios.get('/api/categories/get-categories')
        .then(res => {
            if(res.status === 200) {
                setCategoryDetails(res.data.categories);
            }
        })
        .catch((err: AxiosError) => console.log({
            message: err.message,
            name: err.name,
            response: err.response,
            statusCode: err.response?.status
        }))
        .finally(() => setIsLoadingCategories(false));
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <CategoryDetailsContext.Provider value={{
            categoryDetails,
            setIsLoadingCategories,
            isLoadingCategories,
            setCategoryDetails
        }}>
            {children}
        </CategoryDetailsContext.Provider>
    )
}
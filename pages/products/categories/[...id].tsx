import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Header from "@/components/Header";
import { Product, CategoryClass } from "@/config/types";
import ProductCardInfo from "@/components/Products/ProductCardInfo";
import { ClipLoader } from "react-spinners";
import { loaderColor } from "@/config/config";
import Footer from "@/components/Footer";

interface IncomingDataTypes {
    products: Product[];
}

export default function SingleCategories() {
    const [categorizedProducts, setCategorizedProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<CategoryClass[]>([]);
    const [categoryName, setCategoryName] = useState({id: "", name: ""});
    const [sortBy, setSortBy] = useState("low");
    const [fetchingProducts, setFetchingProducts] = useState(false);
    const router = useRouter();
    const { id, category } = router.query;
    
    useEffect(() => {
        if(categoryName.id !== "" || categoryName.name !== "") {
            router.replace({
                query: {
                    ...router.query, 
                    id: categoryName.id, 
                    category: categoryName.name
                }
            })
        }
    }, [categoryName])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`/api/categories/get-categories`);
                if(res.status === 200) {
                    setCategories(res.data.categories);  
                }
            }
            catch(e: any) {
                console.error(e.message);
            }
        }
        fetchCategories();
    }, [])

    useEffect(() => {
        if(!id)  return;
        const fetchProducts = async () => {
            setFetchingProducts(true);
            try {
                const res = await axios.get<IncomingDataTypes>(`/api/product/get-products?id=${categoryName.id === "" ? id : categoryName.id}`);
                if(res.status === 200) {       
                    setCategorizedProducts(res.data.products.sort((a, b) => {
                        if(sortBy === "low") {
                            return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
                        }
                        return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
                    }));         
                }
            }
            catch(e: any) {
                console.error(e.message);
            }
            finally {
                setFetchingProducts(false);
            }
        }
        fetchProducts();
    }, [id, categoryName])

    useEffect(() => {
        setCategorizedProducts(prev => prev.sort((a, b) => {
            if(sortBy === "low") {
                return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
            }
            return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
        }))
    }, [categorizedProducts, sortBy, categoryName])

    return (
        <div>
            <div className="sticky top-0 z-30">
                <Header />
            </div>
            <div className="relative flex justify-between mt-6 mb-20">
                <div 
                    className="sticky left-3 w-[17%] h-[566px] pl-3 overflow-y-scroll bg-white text-sm py-4 shadow-md rounded scroll-visible"
                >
                    <div className="text-slate-500 text-lg uppercase font-medium">
                        sort by
                    </div>
                    <hr className="w-[98%] h-1" />
                    <div className="flex flex-row-reverse justify-end my-2">
                        <label className="ml-2">Price - Low to High</label>
                        <input 
                            type="radio"
                            value={'low'}
                            checked={sortBy === 'low'}
                            onChange={(e) => setSortBy(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row-reverse justify-end my-2">
                        <label className="ml-2">Price - High to Low</label>
                        <input 
                            type="radio"
                            value={'high'}
                            checked={sortBy === 'high'}
                            onChange={(e) => setSortBy(e.target.value)}
                        />
                    </div>
                    <div className="text-slate-500 text-lg font-medium mt-3">
                        FILTERS
                    </div>
                    <hr className="w-[98%] h-1" />
                    <div className="mt-3">
                    {
                        categories.length > 0 &&
                        categories.map((cat) => (
                            <div 
                                key={cat._id} 
                                className={`flex my-2 ${["6692989bbfb3fcddde404efa", "6692985fbfb3fcddde404ef6", "66929845bfb3fcddde404ef2"].some(id => cat._id === id) ? "" : "hidden"}`}
                            >
                                <input 
                                    type="checkbox" 
                                    value={cat._id}
                                    onChange={
                                        e => setCategoryName({
                                            id: e.target.value, name: cat.name
                                        })
                                    }
                                    checked={
                                        categoryName.id === "" ? cat._id === id :
                                        categoryName.id === cat._id
                                    }
                                />
                                <span className="ml-2">
                                    {cat.name === "Smartphones" ? "Mobiles" : cat.name}
                                </span>
                            </div>
                        ))
                    }
                    </div>
                </div>
                <div className="sticky right-4 w-[80%] h-[530px]">
                    <div className="text-xl font-semibold mb-4 ml-3">
                        {category === "Smartphones" ? "Mobiles" : category} : {categorizedProducts.length}
                    </div>
                    <div className="grid grid-cols-3 gap-6 sticky right-4 w-[99%] h-full overflow-y-scroll p-3">
                    {
                        fetchingProducts 
                            ?
                        <div className="col-span-3 text-center">
                            <ClipLoader color={loaderColor} size={80} />
                        </div>
                            :
                        categorizedProducts.length > 0
                            ?
                        categorizedProducts?.map(c => (
                            <div 
                                key={c._id}  
                                className="bg-gray-300 flex flex-col justify-between col-span-1 max-h-[370px] shadow-md pb-3 border border-gray-300 rounded"
                            >
                                <Link 
                                    href={`/products/${c._id}?name=${c.name}`} className="bg-gray-300 max-h-56"
                                >
                                    <img 
                                        src={c.images[0]} 
                                        alt="error"
                                        className="w-full h-full" 
                                    />
                                </Link>
                                <ProductCardInfo product={c} />
                            </div>
                        ))
                            : 
                        <div className="col-span-3 text-center text-3xl font-semibold">
                            No {categoryName.name} found.
                        </div>
                    }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
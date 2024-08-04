import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Header from "@/components/Header";
import { Product } from "@/config/types";
import { CartContext, CartContextType } from "@/Context/CartContext";
import { toast } from "react-toastify";
import ProductsList from "@/components/Products/ProductComponent";
import { ClipLoader } from "react-spinners";
import Footer from "@/components/Footer";

export default function Products() {
    const [productArray, setProductArray] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [searchInput, setSearchInput] = useState("");
    const [isloadingProducts, setIsLoadingProducts] = useState(false);
    const { addProductToCart } = useContext(CartContext) as CartContextType;

    useEffect(() => {
        document.title = 'Products'      
        localStorage.setItem("path", "/products");
    }, [])

    useEffect(() => {
        async function fetchProductArray() {
            try {
                setIsLoadingProducts(true);
                const res = await axios.get('/api/product/get-products')                
                setProductArray(res.data.products);
                console.log("Render");            
            }
            catch(err: any) {
                toast.info('Not able to fetch Products', { position: "top-center" })
                console.error(err);              
            }
            finally {
                setIsLoadingProducts(false);
            }
        }
        fetchProductArray();
    }, [])

    const handleOnSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const searchedProducts: Product[] = [];
        productArray.find(p => {
            let str = p.name.toLowerCase().replaceAll(" ", "");
            let str1 = searchInput.toLowerCase().replaceAll(" ", "");
            if(str.includes(str1)) {
                searchedProducts.push(p);
            }
        })
        setProducts(searchedProducts);
    }

    return (
        <div>
            <div className="sticky top-0 z-30">
                <Header />
            </div>
            <div className="mb-6 min-h-[500px]">
                <div className="flex items-center justify-start mt-6 mb-3">
                    <div className="text-4xl font-normal ml-10 mr-20">
                        All Products
                    </div>
                    <form 
                        className="flex w-1/2"
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleOnSearch(e)}
                    >
                        <input 
                            type="text"
                            placeholder="Search products by name"
                            className="w-[70%] px-4 py-2 rounded-md mr-1 border-gray-400 border-[1.4px] outline-none"
                            onChange={e => setSearchInput(e.target.value)}
                        />
                        <button 
                            type="submit"
                            className="bg-gray-500 text-white px-5 rounded-md hover:bg-gray-400"
                        >
                            Search
                        </button>
                    </form>
                </div>
                <div className="w-full mt-10">
                {
                    isloadingProducts
                        ?
                    <div className="col-span-4 text-center">
                        <ClipLoader
                            size={90}
                            color="#1b6ea5"
                        />
                    </div>
                        :
                    products.length > 0
                        ?
                    <ProductsList
                        products={products}
                        addProductToCart={addProductToCart}
                    />
                        :
                    productArray?.length > 0
                        ?
                    <ProductsList
                        products={productArray}
                        addProductToCart={addProductToCart}
                    />
                        :
                    <div className="col-span-4 text-center font-semibold text-2xl">
                        No products found
                    </div>
                }
                </div>
            </div>
            <Footer/>
        </div>
    )
}
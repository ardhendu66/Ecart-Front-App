import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Product } from "@/config/types";
import { CartContext, CartContextType } from "@/Context/CartContext";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import ProductsList from "./ProductComponent";
import SliderCarousel from "../Categories/Slider";

interface Props {
    products: Product[]
}

export default function NewProducts() {
    const [productHeadphones, setProductHeadphones] = useState<Product[]>([]);
    const [productMobiles, setProductMobiles] = useState<Product[]>([]);
    const [isloadingProducts, setIsLoadingProducts] = useState(false);
    const { addProductToCart } = useContext(CartContext) as CartContextType;

    useEffect(() => {
        async function fetchProductArray() {
            try {
                setIsLoadingProducts(true);
                const res = await axios.get<Props>(
                    '/api/product/get-products'
                )
                setProductHeadphones(prev => {
                    res.data.products.map(p => {
                        if(p.category.name === "Headphones") {
                            prev.push(p);
                        }
                    })
                    return prev;
                })
                setProductMobiles(prev => {
                    res.data.products.map(p => {
                        if(p.category.name === "Smartphones") {
                            prev.push(p);
                        }
                    })
                    return prev;
                })
            }
            catch(err: any) {
                toast.info('Not able to fetch Products', { position: "top-center" })
                console.error(err.message);              
            }
            finally {
                setIsLoadingProducts(false);
            }
        }
        fetchProductArray();
    }, [])


    return (
        <div className="mb-10 min-h-[500px]">
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
            <div className="mt-3">
                <div className="mb-8">
                    <div className="pl-14 mb-2 text-2xl font-medium">
                        Latest Headphones
                    </div>
                    {
                        productHeadphones?.length > 0
                            ?
                        <SliderCarousel
                            products={productHeadphones} 
                            addProductToCart={addProductToCart} 
                        />
                            :
                        <div className="col-span-4 text-center font-semibold text-2xl">
                            No products found
                        </div>
                    }
                </div>
                <div className="my-8">
                    <div className="pl-14 mb-2 text-2xl font-medium">
                        Latest Smartphones
                    </div>
                    {
                        productMobiles?.length > 0
                            ?
                        <SliderCarousel 
                            products={productMobiles} 
                            addProductToCart={addProductToCart} 
                        />
                            :
                        <div className="col-span-4 text-center font-semibold text-2xl">
                            No products found
                        </div>
                    }
                </div>
            </div>
        }
        </div>
    )
}
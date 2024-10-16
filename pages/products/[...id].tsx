import { useRouter } from "next/router"
import axios, { AxiosError } from "axios";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { Product } from "@/config/types";
import { ClipLoader } from "react-spinners";
import { loaderColor } from "@/config/config";
import ImageSlider from "@/components/SingleProduct/ImageSlider";
import ProductInfo from "@/components/SingleProduct/ProductInfo";
import { IoIosArrowRoundDown } from "react-icons/io";
import RatingsAndReviews from "@/components/SingleProduct/Rating&Reviews";
import Footer from "@/components/Footer";

export default function SingleProductPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoadingProduct, setIsLoadingProduct] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const router = useRouter();
    const { id } = router?.query;

    useEffect(() => {
        if(!id) {
            return;
        }
        const fetchProduct = () => {
            setIsLoadingProduct(true);
            axios.get(`/api/product/get-product?id=${id}`)
            .then(res => setProduct(res.data.product))
            .catch((err: AxiosError) => console.log({
                message: err.message,
                name: err.name,
                response: err.response?.data,
                statusCode: err.status || err.response?.status,
            }))
            .finally(() => setIsLoadingProduct(false));
        }
        fetchProduct();
    }, [id])

    return (
        <div className="bg-gray-300 min-h-screen">
            <div className="sticky top-0 z-30">
                <Header />
            </div>
            {
                isLoadingProduct
                    ?
                <div className="text-center mt-5 min-h-44">
                    <ClipLoader
                        size={90}
                        color={loaderColor}
                    />
                </div>
                    :
                (
                    <div className="relative flex justify-between">
                        <div 
                            className="sticky left-0 w-1/2 flex items-start max-md:flex-col px-5 max-sm:p-4 mt-5"
                        >
                            <ImageSlider
                                product={product}
                                slideIndex={slideIndex}
                                setSlideIndex={setSlideIndex}
                            />
                        </div>
                        <div 
                            className="sticky right-0 overflow-y-scroll w-[70%] h-[600px] pl-14 pr-6 max-md:w-full hide-scrollbar"
                        >
                            <ProductInfo product={product} />
                            <h1 className="flex text-4xl font-bold underline ratings my-5">
                                Ratings & Reviews
                                <IoIosArrowRoundDown className="mt-1 w-8 h-8" />
                            </h1>
                            <RatingsAndReviews />
                        </div>
                    </div>
                )
            }
            <Footer />
        </div>
    )
}
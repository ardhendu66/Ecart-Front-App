import { useRouter } from "next/router"
import axios, { AxiosError } from "axios";
import Header from "@/components/Header";
import { useContext, useEffect, useState } from "react";
import { Product } from "@/config/types";
import { ClipLoader } from "react-spinners";
import { loaderColor } from "@/config/config";
import ImageSlider from "@/components/SingleProduct/ImageSlider";
import ProductInfo from "@/components/SingleProduct/ProductInfo";
import { IoIosArrowRoundDown } from "react-icons/io";
import RatingsAndReviews from "@/components/SingleProduct/Rating&Reviews";
import ProductsList from "@/components/Products/ProductComponent";
import Footer from "@/components/Footer";
import { ProductsDetailsContext, ProductsDetailsContextType } from "@/Context/ProductContext";
import { CartContext, CartContextType } from "@/Context/CartContext";
import { encodeData } from "@/utils/encode_decode";

export default function SingleProductPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoadingProduct, setIsLoadingProduct] = useState(false);
    const { productsDetails } = useContext(ProductsDetailsContext) as ProductsDetailsContextType;
    const { addProductToCart } = useContext(CartContext) as CartContextType;
    const router = useRouter();
    const { name } = router?.query;

    useEffect(() => {
        if(!name) {
            return;
        }
        const fetchProduct = () => {
            setIsLoadingProduct(true);
            axios.get(`/api/product/get-product?name=${name}`)
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
    }, [name])

    return (
        <div className="bg-white min-h-screen">
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
                <div>
                    <div className="md:relative flex max-md:flex-col justify-between md:pl-4">
                        <div  className="md:sticky left-0 w-full flex items-start max-md:flex-col mt-5">
                            <ImageSlider product={product} />
                        </div>
                        <div  className="md:sticky right-0 md:overflow-y-scroll w-full md:h-[600px] hide-scrollbar mt-3 max-md:mt-6">
                            <ProductInfo product={product} />
                        </div>
                    </div>
                    {/* <div className="mt-4">
                        <div className="border-gray-200 border-t-[1px]"></div>
                    </div> */}
                </div>
            }
            <Footer />
        </div>
    )
}
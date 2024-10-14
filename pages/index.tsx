import { useContext, useState, useEffect } from "react";
import NewProducts from "@/components/Products/HomeProducts";
import Categories from "@/components/Categories/Categories";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductsList from "@/components/Products/ProductComponent";
import { ClipLoader } from "react-spinners";
import { Product } from "@/config/types";
import { CartContext, CartContextType } from "@/Context/CartContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Home() {
  const [productArray, setProductArray] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [isloadingProducts, setIsLoadingProducts] = useState(false);
  const { addProductToCart } = useContext(CartContext) as CartContextType;

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

  return (
    <div>
      <div className="sticky top-0 z-10">
        <Header />
      </div>
      {/* Search bar */}
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
            onClick={e => { }}
          >
            Search
          </button>
        </div>
      </div>
      <Categories />
      <div className="text-4xl font-normal ml-10 mt-10 mb-5">
        All Products
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
      <Footer />
    </div>
  )
}

import { useContext, useEffect } from "react";
import Header from "@/components/Header";
import Categories from "@/components/Categories/Categories";
import AllProducts, { SearchInputBar, FilteredByCategory } from "@/components/Products/HomeProductsComponent";
import Footer from "@/components/Footer";
import { ProductsDetailsContext, ProductsDetailsContextType } from "@/Context/ProductContext";
import { AiOutlineReload } from "react-icons/ai";

export default function Index() {
  const { 
    productsDetails, setProductsDetails, fetchProducts 
  } = useContext(ProductsDetailsContext) as ProductsDetailsContextType;

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <div>
      <div className="sticky top-0 z-10">
        <Header />
      </div>
      {/* visible only in max-md: */}
      <SearchInputBar />
      <Categories />
      <div className="flex items-center justify-around ml-10 mt-10 mb-5 text-gray-600 max-sm:flex-col max-sm:gap-y-4">
        <div className="flex">
          <div className="text-4xl font-normal mr-2">Products Found: </div>
          <div className="flex items-center justify-center text-2xl border-gray-300 border rounded px-3 bg-white shadow-md">
            {productsDetails.length}
          </div>
        </div>
        <button
          type="button"
          className="flex gap-2 border-gray-400 border rounded px-3 bg-white py-1"
          onClick={fetchProducts}
        >
          <AiOutlineReload className="w-5 h-5" />
          <div>Refresh</div>
        </button>
        <div className="flex items-center justify-center gap-2">
          <FilteredByCategory />
        </div>
      </div>
      <AllProducts />
      <Footer />
    </div>
  )
}

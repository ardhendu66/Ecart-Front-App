import { useEffect } from "react";
import Header from "@/components/Header";
import NewProducts from "@/components/Products/HomeProducts";
import FeaturedProduct from "@/components/Products/Featured";

export default function Home() {
  return (
    <div className="">
      <Header />
      <FeaturedProduct />
      <div className="text-4xl font-normal ml-10 mt-3 -mb-4">
        New Arrivals
      </div>
      <NewProducts />
    </div>
  )
}
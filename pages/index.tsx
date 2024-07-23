import Header from "@/components/Header";
import NewProducts from "@/components/Products/HomeProducts";
import Categories from "@/components/Categories/Categories";
import Layout from "@/components/Layout";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    localStorage.setItem("path", "/");
  }, [])

  return (
    <div>
      <div className="sticky top-0 z-10">
        <Header />
      </div>
      <Categories />
      <div className="text-4xl font-normal ml-10 mt-10 mb-5">
        New Arrivals
      </div>
      <NewProducts />
    </div>
  )
}
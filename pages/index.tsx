import { useEffect } from "react";
import Header from "@/components/Header";
import Featured from "@/components/Featured";
import AllProducts from "@/components/HomeProducts"

export default function Home() {
  return (
    <div className="">
      <Header />
      <Featured />
      <div className="text-4xl font-normal ml-10 mt-3 -mb-4">
        New Arrivals
      </div>
      <AllProducts />
    </div>
  )
}
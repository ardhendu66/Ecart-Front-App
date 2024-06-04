import Header from "@/components/Header";
import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
import { Dispatch, SetStateAction, useState } from "react";

export interface CartProductState {
  cartProducts: string[],
  setCartProducts: Dispatch<SetStateAction<string[]>>,
}

export default function Home() {
  const [cartProducts, setCartProducts] = useState<string[]>([]);

  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        cartProducts={cartProducts} 
        setCartProducts={setCartProducts} 
      />
      <Featured 
        cartProducts={cartProducts} 
        setCartProducts={setCartProducts} 
      />
      <div className="text-4xl font-normal ml-10 mt-3 -mb-4">
        New Arrivals
      </div>
      <NewProducts />
    </main>
  )
}
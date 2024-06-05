import Header from "@/components/Header";
import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";

export default function Home() {    
  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <Featured />
      <div className="text-4xl font-normal ml-10 mt-3 -mb-4">
        New Arrivals
      </div>
      <NewProducts />
    </main>
  )
}
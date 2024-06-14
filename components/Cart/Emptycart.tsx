import Link from "next/link";

export default function Emptycart() {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <span className="text-5xl font-medium h-20 tracking-wide uppercase">
                Cart is Empty
            </span>
            <Link 
                href={'/'} 
                className="bg-black text-white py-2 px-4 rounded-md"
            >
                Back to Shopping
            </Link>
        </div>
    )
}
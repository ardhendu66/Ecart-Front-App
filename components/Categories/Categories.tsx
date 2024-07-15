import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { CategoryClass } from "@/config/types";
import { bannerArray, categoriesImageSupplier } from "@/config/data";
import { RiArrowLeftSFill, RiArrowRightSFill } from "react-icons/ri";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategoriesComponent() {
    const [categories, setCategories] = useState<CategoryClass[]>([]);
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/api/categories/get-categories');
                if(res.status === 200) {
                    setCategories(res.data.categories);
                    toast.success(res.data.message, { position: "top-center" });
                }
                toast.success(res.data.message, { position: "top-center" });
            }
            catch(err: any) {
                console.error(err.message);
            }
        }
        fetchCategories();
    },[])

    return (
        <div className="mx-2 mt-4">
            <div className="flex px-2 mb-3">
            {
                categories.map((c, index) => (
                    <Link 
                        key={index} 
                        href={`/products/categories/${c._id}?category=${c.name}`} 
                        className="flex flex-col items-center justify-center mx-3.5"
                    >
                        <div className="w-24 h-24 flex items-center justify-center bg-slate-300 rounded-full">
                            <Image
                                src={categoriesImageSupplier[Math.round(Math.random())]}
                                width={70}
                                height={70}
                                alt="error"
                                priority
                                className="rounded-full hover:scale-125 hover:transition-all hover:duration-300"
                            />
                        </div>
                        <div className="text-sm font-semibold">
                            {c.name === "Smartphones" ? "Mobiles" : c.name}
                        </div>
                    </Link>
                ))
            }
            </div>
            <div className="w-full px-2">
                <button 
                    type="button"
                    className="absolute top-[333px] left-5 flex items-center justify-center bg-white w-12 h-12 rounded-full focus:transition-all"
                    onClick={() => setSlideIndex(ind => {
                            if(ind === 0) {
                                return 2;
                            }
                            return ind - 1;
                        })
                    }
                >
                    <RiArrowLeftSFill className="w-10 h-10" />
                </button>
                <img 
                    src={bannerArray[slideIndex].img} 
                    alt="" 
                    className="w-full h-[290px]"
                />
                <div className="sticky flex justify-center -mt-6">
                    {
                        bannerArray.map((b, index) => {
                            return (
                                <button 
                                    key={index}
                                    type="button"
                                    className={`${index === slideIndex ? "bg-white" : "bg-gray-500"} border-[1.5px] border-white w-4 h-4 rounded-full mx-1 cursor-auto`}
                                    onClick={() => setSlideIndex(index)}
                                >
                                </button>
                            )
                        })
                    }
                </div>
                <button 
                    type="button"
                    className="absolute top-[333px] right-5 flex items-center justify-center bg-white w-12 h-12 rounded-full focus:transition-all"
                    onClick={() => setSlideIndex(ind => {
                        if(ind === 2) {
                            return 0;
                        }
                        return ind + 1;
                    })
                }
                >
                    <RiArrowRightSFill className="w-10 h-10" />
                </button>
            </div>
        </div>
    )
}
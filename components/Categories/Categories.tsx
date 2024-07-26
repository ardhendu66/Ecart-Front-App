import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { CategoryClass } from "@/config/types";
import { bannerArray, categoriesImageSupplier } from "@/config/data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    className:"slides",
    prevArrow: <IoIosArrowBack to="prev" />,
    nextArrow: <IoIosArrowForward to="next"/>,
}

export default function CategoriesComponent() {
    const [categories, setCategories] = useState<CategoryClass[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/api/categories/get-categories');
                if(res.status === 200) {
                    setCategories(res.data.categories);
                }
            }
            catch(err: any) {
                console.error(err.message);
            }
        }
        fetchCategories();
    },[])

    return (
        <div className="mx-2 mt-4">
            <div className="flex px-2 mb-6 overflow-y-scroll">
            {
                categories.map((c, index) => (
                    <Link 
                        key={index} 
                        href={`/products/categories/${c._id}?category=${c.name}`} 
                        className="flex flex-col items-center justify-center mx-3.5"
                    >
                        <div className="w-[88px] h-[88px] flex items-center justify-center bg-slate-300 rounded-full">
                            <img
                                src={categoriesImageSupplier[index].image_url}
                                width={64}
                                height={64}
                                alt="error"
                                className={`object-contain w-16 h-16 hover:scale-125 hover:transition-all hover:duration-300 ${c.name === "Cloths" && "rounded-full"}`}
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
                <Slider {...settings} className="mx-7">
                {
                    bannerArray?.map((b, index) => (
                        <div key={index} className="">
                            <img 
                                src={b}
                                alt="error"
                                className="w-full h-[290px] rounded"
                            />
                        </div>
                    ))
                }
                </Slider>
            </div>
        </div>
    )
}
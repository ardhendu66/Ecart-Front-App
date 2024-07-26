import watch from "@/public/watch.png";
import frige from "@/public/f1.png";
import processor from "@/public/intel1.png";
import headphone from "@/public/headphone.png";
import shoe from "@/public/shoe1.png";
import cloth from "@/public/clothes2.png";
import keyboard from "@/public/keyboard.png";
import mouse from "@/public/mouse.png";

export const data = [
    {
        userId: 1,
        rating: 4,
        review: "Fabulous"
    },
    {
        userId: 2,
        rating: 5,
        review: "Excellent"
    },
    {
        userId: 3,
        rating: 2,
        review: "Excellent"
    },
    {
        userId: 4,
        rating: 5,
        review: "Excellent"
    },
    {
        userId: 5,
        rating: 1,
        review: "Excellent"
    },
]

export const bannerArray = [
    "https://res.cloudinary.com/next-ecom-cloud/image/upload/v1720881251/banner3_sk4krj.jpg",
    "https://res.cloudinary.com/next-ecom-cloud/image/upload/v1720875176/Banner2_f8yo5t.jpg",
    "https://res.cloudinary.com/next-ecom-cloud/image/upload/v1720877220/banner2_nn0yn3.png",
]

export const categoriesImageSupplier = [{
    id: 1,
    category: "Smartphones",
    image_url: "https://res.cloudinary.com/next-ecom-cloud/image/upload/v1722013517/Apple1_v2pnxk.png" 
}, {
    id: 2,
    category: "Laptops",
    image_url: "https://res.cloudinary.com/next-ecom-cloud/image/upload/v1722013803/mac1_k91zgb.png"
}, {
    id: 3,
    category: "Headphones",
    image_url: headphone.src,
}, {
    id: 4,
    category: "Shoe",
    image_url: shoe.src,
}, {
    id: 5,
    category: "Mouse",
    image_url: mouse.src,
}, {
    id: 6,
    category: "Keyboard",
    image_url: keyboard.src,
}, {
    id: 7,
    category: "Cloths",
    image_url: cloth.src,
}, {
    id: 8,
    category: "Processor",
    image_url: processor.src,
}, {
    id: 9,
    category: "Refrigerator",
    image_url: frige.src,
}, {
    id: 10,
    category: "Watches",
    image_url: watch.src,
}]
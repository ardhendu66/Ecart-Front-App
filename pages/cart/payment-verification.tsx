// import { useContext, useEffect, useState, useRef } from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import Header from "@/components/Header";
// import ProtectedLayout from "@/components/Layout";
// import Footer from "@/components/Footer";
// import { loaderColor } from "@/config/config";
// import { FadeLoader } from "react-spinners";
// import { HiCheckBadge } from "react-icons/hi2";
// import Animation from "@/components/Payment/animation";
// import { decryptUserInfo } from "@/utils/hashObject";
// import axios, { AxiosError, CancelTokenSource } from "axios";
// import { UserDetailsContext, UserDetailsContextType } from "@/Context/UserDetails";
// import { toast } from "react-toastify";

// export default function PaymentVerification() {
//     const { userDetails } = useContext(UserDetailsContext) as UserDetailsContextType;
//     const cancelTokenRef = useRef<CancelTokenSource | null>(null);
//     const [paymentVerifying, setPaymentVerifying] = useState(false);
//     const router = useRouter();
//     const userInfo = router?.query?.userInfo;

//     useEffect(() => {
//         setPaymentVerifying(true);
//         setTimeout(() => setPaymentVerifying(false), 50)
//     }, [])

//     if(!paymentVerifying) {
//         return (
//             <ProtectedLayout>
//                 <div className="sticky top-0 z-10">
//                     <Header />
//                 </div>
//                 <div className="flex flex-col items-center">
//                     <div className="-mt-24">
//                         <Animation />
//                     </div>
//                     <div className="flex items-center -mt-10">
//                         <p className="text-2xl">
//                             Payment is verifying, don't close or reload the window.
//                         </p>
//                         <FadeLoader 
//                             color={loaderColor} 
//                             className="w-14 h-14 ml-5"
//                         />
//                     </div>
//                 </div>
//             </ProtectedLayout>
//         )
//     }


//     return (
//         <ProtectedLayout>
//             <div className="sticky top-0 z-10">
//                 <Header />
//             </div>
//             <main className="w-screen min-h-[400px]">
//                 <div className="flex items-start justify-between gap-1">
//                     <div className="flex items-center justify-center w-full p-4">
//                         <div className="p-4 bg-white w-[60%] max-md:w-full">
//                             <div className="flex flex-col p-8">
//                                 <span className="text-start font-medium">
//                                     <div className="flex text-3xl font-semibold mb-10">
//                                         Thanks for your Order! 🙂
//                                     </div>
//                                     <div className="text-lg flex mb-5">
//                                         Order successfull.
//                                         <HiCheckBadge className="w-6 h-6 text-green-600 ml-1" />
//                                     </div>
//                                     <p className="text-md text-sky-600">
//                                         An email has been sent regarding on this order.
//                                     </p>
//                                     <p className="text-md text-sky-600 mb-5">
//                                         <span>Clear your cart going to</span>
//                                         <Link 
//                                             href={'/cart'} 
//                                             className="mx-2 underline italic font-semibold text-lg"
//                                         >
//                                             cart
//                                         </Link>
//                                         <span>
//                                             page, if you don't want to purchase the same products.
//                                         </span>
//                                     </p>
//                                 </span>
//                                 <Link 
//                                     href={'/profile/orders'} 
//                                     className="flex justify-center bg-black text-white text-lg font-semibold p-2 rounded-md w-1/3 mt-6"
//                                 >
//                                     Orders Page
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//             <Footer />
//         </ProtectedLayout>
//     )
// }
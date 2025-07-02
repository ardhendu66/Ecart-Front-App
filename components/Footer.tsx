import Link from "next/link";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { FiYoutube } from "react-icons/fi";
import { GoQuestion } from "react-icons/go";
import { LuGift } from "react-icons/lu";
import { GiPolarStar } from "react-icons/gi";

export default function Footer() {
    return (
        <div className="flex flex-col bg-gray-800 text-gray-400 text-sm py-6 mt-20">
            <div className="flex mb-3 max-md:flex-col">
                <div className="flex justify-around w-1/2 max-md:w-full text-lg max-md:px-3 max-sm:px-5 max-sm:text-sm">
                    <div>
                        ABOUT
                        <div className="mt-2 text-white">
                            <div className="hover:underline hover:cursor-pointer">Contact us</div>
                            <div className="hover:underline hover:cursor-pointer">About us</div>
                            <div className="hover:underline hover:cursor-pointer">Careers</div>
                            <div className="hover:underline hover:cursor-pointer">Press</div>
                            <div className="hover:underline hover:cursor-pointer">
                                Corporate Info
                            </div>
                        </div>
                    </div>
                    <div>
                        HELP
                        <div className="mt-2 text-white">
                            <div className="hover:underline hover:cursor-pointer">Payments</div>
                            <div className="hover:underline hover:cursor-pointer">Shipping</div>
                            <div className="flex flex-col hover:underline hover:cursor-pointer">
                                <span>Cancellation &</span>
                                <span>Returns</span>
                            </div>
                            <div className="hover:underline hover:cursor-pointer">FAQ</div>
                            <div className="hover:underline hover:cursor-pointer">Report Infringement</div>
                        </div>
                    </div>
                    <div>
                        CONSUMER POLICY
                        <div className="mt-2 text-white">
                            <div className="flex flex-col hover:underline hover:cursor-pointer">
                                <span>Cancellation &</span>
                                <span>Returns</span>
                            </div>
                            <div className="hover:underline hover:cursor-pointer">Terms Of Use</div>
                            <div className="hover:underline hover:cursor-pointer">Security</div>
                            <div className="hover:underline hover:cursor-pointer">Privacy</div>
                            <div className="hover:underline hover:cursor-pointer">Sitemap</div>
                            <div className="hover:underline hover:cursor-pointer">
                                Grievence Redressal
                            </div>
                            <div className="hover:underline hover:cursor-pointer">EPR Compliance</div>
                        </div>
                    </div>
                </div>
                <div className="border-white border-r"></div>
                <div className="md:hidden my-2 mx-4 border-gray-400 border-t"></div>
                <div className="flex justify-around w-1/2 pl-5 pr-5 max-md:w-full" id="footer-sm">
                    <div>
                        <div className="text-lg">Mail Us:</div>
                        <div className="mt-2 text-white mb-4">
                            <div>Ecomstore India Private Limited,</div>
                            <div>Buildings Alyassa, Begonia &</div>
                            <div>Clove Embassy Tech Village</div>
                            <div>Outer Ring Road, Devarabeesanahalli Village,</div>
                            <div>Bengaluru, 560103,</div>
                            <div>Karnataka, India</div>
                        </div>
                        <div className="text-lg">Social:</div>
                        <div className="mt-1 flex text-white gap-x-4">
                            <Link href={'https://facebook.com'}>
                                <CiFacebook className="w-6 h-6" />
                            </Link>
                            <Link href={'https://x.com'}>
                                <FaXTwitter className="w-5 h-5" />
                            </Link>
                            <Link href={'https://instagram.com'}>
                                <IoLogoInstagram className="w-5 h-5" />
                            </Link>
                            <Link href={'https://youtube.com'}>
                                <FiYoutube className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className="text-lg">Registered Office Address:</div>
                        <div className="mt-2 text-white mb-4">
                            <div>Ecomstore India Private Limited,</div>
                            <div>Buildings Alyassa, Begonia &</div>
                            <div>Clove Embassy Tech Village</div>
                            <div>Outer Ring Road, Devarabeesanahalli Village,</div>
                            <div>Bengaluru, 560103,</div>
                            <div>Karnataka, India</div>
                            <div>
                                CIN: <span className="text-blue-700">U51109KA2012PTC066107</span>
                            </div>
                            <div>
                                Telephone: <span className="text-blue-700">044-45614700</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-gray-400 border-t-[0.5px] mx-3 mb-2"></div>
            <div 
                className="flex justify-evenly max-md:flex-wrap max-md:justify-center max-md:items-center max-md:gap-y-2 max-md:gap-x-4"
            >
                <div className="flex gap-x-1">
                    <GiPolarStar className="w-4 h-4 mt-[2px] text-yellow-400" />
                    <span className="text-white hover:underline cursor-pointer">
                        Adevertise
                    </span>
                </div>
                <div className="flex gap-x-1">
                    <LuGift className="w-4 h-4 mt-[2px] text-yellow-400" />
                    <span className="text-white hover:underline cursor-pointer">
                        Gift Cards
                    </span>
                </div>
                <div className="flex gap-x-1">
                    <GoQuestion className="w-4 h-4 mt-[2px] text-yellow-400" />
                    <span className="text-white hover:underline cursor-pointer">
                        Help Center
                    </span>
                </div>
                <div className="text-white">
                    &copy; 2020-2024 Ecomstore.com
                </div>
                <div>
                    <img 
                        src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg" 
                        alt="error" 
                    />
                </div>
            </div>
        </div>
    )
}
import { useState, useContext } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { UserDetailsContext, UserDetailsContextType } from "@/Context/UserDetails";
import { CartContext, CartContextType } from "@/Context/CartContext";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";
import { RiFolderDownloadFill } from "react-icons/ri";
import { CiBellOn } from "react-icons/ci";

export default function ProfileDropdown() {
    const [showDropdown, setShowDropdown] = useState(false);
    const { userDetails } = useContext(UserDetailsContext) as UserDetailsContextType;
    const { clearCartProducts } = useContext(CartContext) as CartContextType;

    return (
        <div>
            <div
                className="flex flex-col items-center justify-center text-xs font-normal"
                onClick={() => setShowDropdown(true)}
            >
                <img 
                    src={userDetails?.image}
                    alt="error"
                    className="w-[50px] h-[50px] rounded-full border-[1.3px] border-gray-400 cursor-pointer"
                />
                <p>{userDetails?.name}</p>
            </div>
            <div 
                className={`flex flex-col text-lg font-normal dropdown ${!showDropdown && "hidden"} border border-gray-400`}
                onMouseOver={() => setShowDropdown(true)}
                onMouseOut={() => setShowDropdown(false)}
            >
                <ul className="flex flex-col gap-y-2 text-gray-500 text-[16px]">
                    <li className="cursor-pointer">
                        <Link 
                            href={`/profile`}
                            className="flex"
                        >
                            <CgProfile className="w-5 h-5 mt-1 mr-2 text-yellow-600" />
                            <span>My Profile</span>
                        </Link>
                    </li>
                    <li className="cursor-pointer">
                        <Link href={`/profile/orders`} className="flex">
                        <RiFolderDownloadFill className="w-5 h-5 mt-1 mr-2 text-yellow-600" />
                        <span>Orders</span>
                        </Link>
                    </li>
                    <li className="cursor-pointer">
                        <Link href={`/profile/settings`} className="flex">
                            <MdOutlineSettings className="w-5 h-5 mt-1 mr-2 text-yellow-600" />
                            <span>Settings</span>
                        </Link>
                    </li>
                    <li className="cursor-pointer mb-4">
                        <div className="flex">
                            <CiBellOn className="w-5 h-5 mt-1 mr-2 text-yellow-600" />
                            <span>Notifications</span>
                        </div>
                    </li>
                    <li 
                        className="flex items-center justify-center cursor-pointer bg-yellow-600 text-white rounded px-3 py-2 w-full"
                        onClick={() => (signOut({callbackUrl: "/"}), clearCartProducts())}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="w-5 h-5 mr-1 mt-[1px]">
                            <path 
                                strokeLinecap="round"
                                strokeLinejoin="round" 
                                d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                        </svg>
                        <span className="text-sm">Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
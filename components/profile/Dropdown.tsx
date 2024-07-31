import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";
import { RiFolderDownloadFill } from "react-icons/ri";

export default function ProfileDropdown() {
    const { data: session } = useSession();
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div>
            <div
                className="w-[50px] h-[50px] rounded-full border-[1.3px] border-gray-400 text-xs font-normal cursor-pointer"
                onClick={() => setShowDropdown(prev => !prev)}
            >
                <img 
                    src={session?.user?.image!}
                    alt="error"
                    className="w-full h-full rounded-full"
                />
            </div>
            <div 
                className={`flex flex-col text-lg font-normal dropdown ${!showDropdown && "hidden"} border border-gray-400`}
            >
                <ul className="flex flex-col gap-y-2 text-gray-500 text-[16px]">
                    <li className="cursor-pointer">
                        <Link 
                            href={`/profile`}
                            className="flex"
                        >
                            <CgProfile className="w-5 h-5 mt-1 mr-2" />
                            <span>My Profile</span>
                        </Link>
                    </li>
                    <li className="cursor-pointer">
                        <Link href={`/profile/orders`} className="flex">
                            <RiFolderDownloadFill className="w-5 h-5 mt-1 mr-2" />
                            <span>Orders</span>
                        </Link>
                    </li>
                    <li className="cursor-pointer mb-4">
                        <Link href={`/profile/settings`} className="flex">
                            <MdOutlineSettings className="w-5 h-5 mt-1 mr-2" />
                            <span>Settings</span>
                        </Link>
                    </li>
                    <li 
                        className="flex items-center justify-center cursor-pointer bg-gray-600 text-white rounded px-3 py-2 w-full"
                       onClick={() => signOut({callbackUrl: "/"})}
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
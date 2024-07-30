import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

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
                <ul className="flex flex-col gap-4 text-gray-500">
                    <li className="cursor-pointer">
                        <Link 
                            href={`/profile/${
                                session?.user.name?.toLowerCase().replaceAll(" ", "-")
                            }`}
                        >
                            Profile
                        </Link>
                    </li>
                    <li className="cursor-pointer">Settings</li>
                    <li className="flex items-center justify-center cursor-pointer bg-gray-600 text-white rounded px-3 py-2 w-full"
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
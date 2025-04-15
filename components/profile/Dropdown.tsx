"use client"
import { useContext } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { UserDetailsContext, UserDetailsContextType } from "@/Context/UserDetails";
import { CartContext, CartContextType } from "@/Context/CartContext";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";
import { CiBellOn } from "react-icons/ci";
import { LuWallet } from "react-icons/lu";
import { LiaClipboardListSolid } from "react-icons/lia";
import { Dropdown } from "flowbite-react";

export default function ProfileDropdown() {
    const { userDetails } = useContext(UserDetailsContext) as UserDetailsContextType;

    return (
        <Dropdown  
            dismissOnClick={false} 
            label={
                <div className="flex items-center justify-center gap-x-2 -mt-[7px]">
                    <img
                        src={userDetails?.image}
                        alt="Profile"
                        className="w-12 h-8 rounded-full"
                    />
                    {/* <span className="font-medium text-sm">
                        {userDetails?.name.split(' ')[0]}
                    </span> */}
                </div>
            }
            style={{
                border: "none",
                boxShadow: "none",
            }}
        >
            <Dropdown.Item>
                <Link href={`/profile`} className="flex">
                    <CgProfile className="w-5 h-5 mr-2 text-yellow-600" />
                    <span>My Profile</span>
                </Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <Link href={`/profile/orders`} className="flex">
                    <LiaClipboardListSolid 
                        className="w-5 h-5 mr-2 text-yellow-600" 
                    />
                    <span>Orders</span>
                </Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <div className="flex">
                    <CiBellOn className="w-5 h-5 mr-2 text-yellow-600" />
                    <span>Notifications</span>
                </div>
            </Dropdown.Item>
            <Dropdown.Item>
                <Link href={`/profile/wallet`} className="flex">
                    <LuWallet className="w-5 h-5 mr-2 text-yellow-600" />
                    <span>Wallet</span>
                </Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <Link href={`/profile/settings`} className="flex">
                    <MdOutlineSettings className="w-5 h-5 mr-2 text-yellow-600" />
                    <span>Settings</span>
                </Link>
            </Dropdown.Item>
            <Dropdown.Item 
                onClick={() => {
                    signOut({callbackUrl: "/"});
                }
            }>
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
            </Dropdown.Item>
        </Dropdown>
    )
}
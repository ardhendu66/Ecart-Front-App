import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import ProtectedLayout from "@/components/Layout";

export default function UserProfile() {
    const router = useRouter();
    const { name } = router.query;

    return (
        <ProtectedLayout>
            <div className="sticky top-0 z-30">
                <Header />
            </div>
            {name}
        </ProtectedLayout>
    )
}
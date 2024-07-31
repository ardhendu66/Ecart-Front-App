import { useRouter } from "next/router";
import ProtectedLayout from "@/components/Layout";
import Header from "@/components/Header";

export default function UserOrders() {
    const router = useRouter();

    return (
        <ProtectedLayout>
            <div className="sticky top-0 z-30">
                <Header />
            </div>
            orders
        </ProtectedLayout>
    )
}
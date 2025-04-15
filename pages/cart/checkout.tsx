import { useContext } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { UserDetailsContext, UserDetailsContextType } from "@/Context/UserDetails";
import Custom404 from "../404";
import { CartContext, CartContextType } from "@/Context/CartContext";
import PriceDetails from "@/components/Cart/PriceDetails";
import CheckoutLoginComp from "@/components/Checkout/Loggedincomponent";
import CheckoutCartDetailsComp from "@/components/Checkout/Cartdetailscomponent";
import CheckoutDeliveryAddressComp from "@/components/Checkout/Deliveryaddresscomponent";

export default function CartCheckout() {
    const { userDetails } = useContext(UserDetailsContext) as UserDetailsContextType;
    const { cartProducts, uniqueProductsOnCart } = useContext(CartContext) as CartContextType;

    const router = useRouter();
    const { view } = router.query;

    if((view as string) === null || !(view as string) || (view as string) === undefined || (Number(view) < 1 || Number(view) > 4)) {
        return <Custom404 />
    }

    return (
        <Layout>
            <div className="sticky top-0 z-10">
                <Header />
            </div>

            {/* Main page */}
            <div className="flex max-md:flex-col items-start md:justify-center gap-7 my-10  px-7 w-full">

                {/* Checkout Section */}
                <div className="md:w-[62%] w-full">
                    <CheckoutLoginComp 
                        userDetails={userDetails} 
                        view={Number(view)} 
                    />
                    <CheckoutDeliveryAddressComp 
                        userDetails={userDetails} 
                        view={Number(view)} 
                    />
                    <CheckoutCartDetailsComp 
                        userDetails={userDetails} 
                        view={Number(view)} 
                    />
                </div>

                {/* Price Details Section */}
                <PriceDetails 
                    cartProducts={cartProducts}
                    uniqueProductsOnCart={uniqueProductsOnCart}
                    outerDivStyle="md:w-[32%] w-full bg-white shadow p-6 h-fit rounded-sm my-5"
                />
            </div>
        </Layout>
    )
}
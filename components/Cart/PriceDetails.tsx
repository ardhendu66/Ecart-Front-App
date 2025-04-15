import { moneyComaSeperator } from "@/config/functions"
import { Product } from "@/config/types";

interface Props {
    cartProducts: string[],
    uniqueProductsOnCart: Product[],
    outerDivStyle: string
}

export default function PriceDetails({ 
    cartProducts, uniqueProductsOnCart, outerDivStyle
}: Props) {
    var subTotalPrice = 0, actualPrice = 0;
    for(const productId of cartProducts) {
        const product = uniqueProductsOnCart.find(p => p._id === productId);
        subTotalPrice += product?.price || 0;
        actualPrice += (product?.price! * (100 + product?.discountPercentage!)/100) || 0;
    }

    return (
        <div className={outerDivStyle}>
            <h2 className="text-xl font-bold text-gray-400 mb-4 uppercase tracking-wide">
                Price Details
            </h2>
            <hr className="mb-4" />
            <div className="space-y-4 text-gray-600">
                <div className="flex justify-between">
                    <span>Price ({cartProducts.length} items)</span>
                    <span>₹{moneyComaSeperator(Math.floor(actualPrice))}</span>
                </div>
                <div className="flex justify-between">
                    <span>Discount</span>
                    <span className="text-green-600">
                        —₹{moneyComaSeperator(Math.floor((actualPrice - subTotalPrice)))}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span>
                        <span className="line-through text-gray-400">₹120</span>{" "}
                        <span className="text-green-600">Free</span>
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Secured Packaging Fee</span>
                    <span>₹51</span>
                </div>
                <div className="flex justify-between">
                    <span>Protect Promise Fee</span>
                    <span>₹9</span>
                </div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-lg text-gray-800">
                <span className="font-semibold tracking-wide">Total Amount</span>
                <span className="font-semibold">
                    ₹{moneyComaSeperator(Math.floor(subTotalPrice + 51 + 9))}
                </span>
            </div>
            <div className="mt-4 text-green-600 font-medium text-sm">
                You will save ₹{moneyComaSeperator(Math.floor(actualPrice - subTotalPrice - 51 - 9))} on this order
            </div>
        </div>
    )
}
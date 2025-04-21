import { useContext } from "react";
import Link from "next/link";
import { Product } from "@/config/types";
import { CartContext, CartContextType } from "@/Context/CartContext";
import 'react-tooltip/dist/react-tooltip.css';
import { UserDetailsContext, UserDetailsContextType } from "@/Context/UserDetails";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { withSwal } from "react-sweetalert2";
import { moneyComaSeperator } from "@/config/functions";
import { loaderColor } from "@/config/config";
import { ClipLoader } from "react-spinners";

interface Props {
    products: Product[];
    swal: any;
}

const CartProductsComponent = ({ products, swal }: Props) => {
    const {
        cartProducts,
        addProductToCart,
        removeProductFromCart,
        removeCertainProduct,
    } = useContext(CartContext) as CartContextType;
    const { userDetails } = useContext(UserDetailsContext) as UserDetailsContextType;

    const confirmDeleteAction = (productId: string) => {
        swal
            .fire({
                title: `Hey ${userDetails.name}`,
                text: "Do you want to remove this item from your cart ?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: loaderColor,
                confirmButtonText: "Yes, delete it!",
                reverseButtons: true,
            })
            .then((result: any) => {
                if (result.isConfirmed) {
                    removeCertainProduct(productId);
                    swal.fire("Deleted!", "Item removed from cart successfully.", "success");
                }
            })
            .catch((err: any) => swal.fire(err.message, "", "error"));
    };

    return (
        <div className="mb-10 space-y-6">
            {products.length > 0 ? (
                products.map((product, index) => {
                    const quantity = cartProducts.filter((id) => id === product._id).length;
                    return (
                        <div
                            key={product._id}
                            className="flex flex-col md:flex-row justify-between p-5 border-[1.3px] rounded-sm bg-white"
                        >
                            <div className="flex gap-x-6 max-sm:flex-col">
                                <Link href={`/products/${product._id}`} className="max-sm:w-full max-sm:flex max-sm:items-center max-sm:justify-center max-sm:mb-3">
                                    <img
                                        src={product.images[0]}
                                        alt=""
                                        className="w-32 h-24 object-contain"
                                    />
                                </Link>
                                <div className="flex flex-col justify-between">
                                    <Link
                                        href={`/products/${product._id}`}
                                        className="text-gray-400 font-semibold hover:underline tracking-wide font-mono"
                                    >
                                        {product.name}
                                    </Link>
                                    <div className="mt-2 flex items-center text-sm">
                                        <span className="line-through text-gray-400 mr-2">
                                            ₹{moneyComaSeperator(Math.floor(product.price * (100 + product.discountPercentage) / 100))}
                                        </span>
                                        <span className="text-lg font-semibold mr-2">
                                            ₹{moneyComaSeperator(product.price)}
                                        </span>
                                        <span className="text-green-600 font-medium">
                                            {product.discountPercentage}% OFF
                                        </span>
                                    </div>
                                    <div className="mt-3 flex items-center gap-3 text-gray-600 text-sm">
                                        <span className="font-medium">Qty:</span>
                                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1 text-lg">
                                            <button
                                                type="button"
                                                className={`text-gray-500 hover:text-red-500 transition ${quantity === 1 && "cursor-not-allowed opacity-50"
                                                    }`}
                                                id={`remove-icon-${product._id}`}
                                                onClick={() => removeProductFromCart(product._id)}
                                                disabled={quantity === 1}
                                            >
                                                —
                                            </button>
                                            {quantity === 1 && (
                                                <Tooltip
                                                    key={`tooltip-remove-${product._id}`}
                                                    place="top"
                                                    anchorId={`remove-icon-${product._id}`}
                                                    style={{ fontSize: "15px" }}
                                                    content="Quantity Cannot Be Reduced Further"
                                                />
                                            )}
                                            <span className="text-gray-700">{quantity}</span>
                                            <button
                                                type="button"
                                                className="text-gray-700 hover:text-blue-600 transition"
                                                onClick={() => addProductToCart(product._id)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    className="uppercase text-red-500 text-lg font-semibold tracking-wider max-md:mt-3"
                                    id={`delete-icon-${product._id}`}
                                    onClick={() => confirmDeleteAction(product._id)}
                                >REMOVE</button>
                                <Tooltip
                                    place="top"
                                    anchorId={`delete-icon-${product._id}`}
                                    content="Remove this product from Cart"
                                />
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="text-xl font-semibold text-gray-700 text-center">
                    No products found.
                </div>
            )}
        </div>
    );
};

const Cartproducts = withSwal(({ products, swal }: Props, ref: any) => (
    <CartProductsComponent swal={swal} products={products} />
));

export default Cartproducts;
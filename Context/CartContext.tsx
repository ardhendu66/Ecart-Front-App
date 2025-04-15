import { 
    createContext, useState, useEffect, Dispatch, SetStateAction, useContext 
} from "react";
import { useSession } from "next-auth/react";
import { checkFrequency } from "@/config/functions";
import toast from "react-hot-toast";
import { ProductsDetailsContext, ProductsDetailsContextType } from "./ProductContext";
import { Product } from "@/config/types";
import axios, { AxiosError } from "axios";

export interface CartContextType {
    cartProducts: string[],
    setCartProducts: Dispatch<SetStateAction<string[]>>,
    uniqueProductsOnCart: Product[],
    setUniqueProductsOnCart: Dispatch<SetStateAction<Product[]>>,
    addProductToCart: (params: string) => void,
    removeProductFromCart: (params: string) => void,
    removeCertainProduct: (params: string) => void,
    clearCartProducts: () => void,
    fetchCartProducts: () => void,
    isLoadingCart: boolean,
    setIsLoadingCart: Dispatch<SetStateAction<boolean>>,
}

export const CartContext = createContext<CartContextType | Object>({});

export default function CartProvider({children}: any) {
    const [cartProducts, setCartProducts] = useState<string[]>([]);
    const [uniqueProductsOnCart, setUniqueProductsOnCart] = useState<Product[]>([]);
    const [isLoadingCart, setIsLoadingCart] = useState(false);
    const { data: session } = useSession();
    const { 
        productsDetails 
    } = useContext(ProductsDetailsContext) as ProductsDetailsContextType;

    const fetchCartProducts = () => {
        setIsLoadingCart(true);
        axios.get(`/api/cart/find/all-productIds?userId=${session?.user._id!}`)
            .then(res => {
                if(res.status === 200) {
                    axios.post('/api/cart/find/all-items', {
                        ids: res.data
                    })
                        .then(resp => setUniqueProductsOnCart(resp.data))
                        .catch((err: AxiosError) => {
                            console.error({
                                message: err.message,
                                name: err.name,
                                response: err.response?.data,
                                statusCode: err.response?.status || err.status
                            })
                            console.error(err.toJSON());
                        });

                    setCartProducts(res.data);
                }
            })
            .catch((err: AxiosError) => {
                console.error(err.toJSON());                
            })
            .finally(() => setIsLoadingCart(false));
    }

    useEffect(() => {
        fetchCartProducts();
    }, [session])


    const addProductToCart = (productId: string) => {
        if(!session) {
            toast.error("Please Log in to add products to cart");
            return;
        }

        let totalPrice = 0;
        for (const id of cartProducts) {
            const productPrice = productsDetails.find(p => p._id === id)?.price || 0;
            totalPrice += productPrice;
        }

        const newProductPrice = productsDetails.find(p => p._id === productId)?.price || 0;
        if(totalPrice + newProductPrice > 800000) {
            toast.error(
                `Maximum Cart price of ₹800,000 exceeded. Cannot add item  with price ₹${newProductPrice}.`
            );
            return;
        }

        if(cartProducts.length >= 10) {
            toast.error(
                "Maximum 10 items can be added to Cart at a time", 
                { position: "top-center" }
            );
            return;
        }

        axios.post(`/api/cart/add-to-cart?userId=${session.user._id!}&productId=${productId}`)
            .then(res => {
                if(res.status === 200 || res.status === 201) {
                    setCartProducts(prev => {
                        if(!prev.find(p => p === productId)) {
                            toast.success(
                                "One '" + 
                                uniqueProductsOnCart.find(p => p._id === productId)?.name 
                                + "' added to Cart"
                            );
                        }
                        return [...prev, productId as string]
                    });
                    toast.success(
                        "One more '" + 
                        uniqueProductsOnCart.find(p => p._id === productId)?.name 
                        + "' added to Cart"
                    );
                }
                else {
                    toast.error(
                        uniqueProductsOnCart.find(p => p._id === productId)?.name 
                        + "' not added to Cart"
                    );
                }
            })
            .catch((err: AxiosError) => toast.error(err?.message));
    }

    const removeProductFromCart = (productId: string) => {
        if(!session) {
            toast.error("Please Log in to remove products from cart");
            return;
        }

        if(cartProducts.find(p => p === productId)?.length === 1) {
            return;
        }

        axios.delete(
            `/api/cart/remove/single-item?userId=${session.user._id!}&productId=${productId}`
        )
            .then(res => {
                if(res.status === 200 || res.status === 202) {
                    setCartProducts(prev => {
                        if(checkFrequency(prev) && prev.length === 1) {
                            return prev;
                        }
                        const pos = prev.indexOf(productId);
                        if(pos === -1) {
                            return prev;
                        }
                        return prev.filter((value, index) => index !== pos);
                    })
                    toast.success(
                        "One '" + 
                        uniqueProductsOnCart.find(p => p._id === productId)?.name 
                        + "' removed from Cart"
                    );
                }
                else {
                    toast.error( 
                        uniqueProductsOnCart.find(p => p._id === productId)?.name 
                        + "' not removed from Cart"
                    );
                }
            })
            .catch((err: AxiosError) => toast.error(err?.message));
    }

    const removeCertainProduct = (productId: string) => {
        axios.delete(
            `/api/cart/remove/all-same-items?userId=${session?.user._id!}&productId=${productId}`
        )
            .then(res => {
                if(res.status === 202) {
                    setCartProducts(prev => {
                        return prev.filter(
                            (id: string) => id.toString() !== productId
                        );        
                    });
                    setUniqueProductsOnCart(prev => {
                        return prev.filter(p => p._id !== productId);
                    });
                }
                else {
                    toast.success(
                        uniqueProductsOnCart.find(p => p._id === productId)?.name 
                        + "' not removed from Cart"
                    );
                }
            })
            .catch((err: AxiosError) => {
                toast.error(err?.message);
            });
    }
    

    return (
        <CartContext.Provider value={{
            cartProducts,
            addProductToCart,
            removeProductFromCart,
            removeCertainProduct,
            fetchCartProducts,
            uniqueProductsOnCart,
            isLoadingCart,
            // clearCartProducts,
            // setCartProducts,
            // setIsLoadingCart,
            // setUniqueProductsOnCart,
        }}>
            {children}
        </CartContext.Provider>
    )
}
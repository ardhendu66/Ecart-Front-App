import { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import { checkFrequency } from "@/config/functions";
import { toast } from "react-toastify";

export interface CartContextType {
    cartProducts: string[],
    setCartProducts: Dispatch<SetStateAction<string[]>>,
    addProductToCart: (params: string) => void,
    removeProductFromCart: (params: string) => void,
    removeCertainProduct: (params: string) => void,
    clearCartProducts: () => void,
}

export const CartContext = createContext<CartContextType | Object>({})

export default function CartProvider({children}: any) {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const [cartProducts, setCartProducts] = useState<string[]>([]);
    const [clearCart, setClearCart] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        if (cartProducts?.length > 0) {
            ls?.setItem('cart', JSON.stringify(cartProducts));
        }
    }, [cartProducts]);

    useEffect(() => {
        if(clearCart === true) {
            ls?.setItem('cart', JSON.stringify([]))
        }
    }, [clearCart])

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')!));
        }
    }, []);

    const addProductToCart = (productId: string) => {
        if(!session) {
            toast.error("Please Log in to add products to cart", { position: "top-center" });
            return;
        }
        setCartProducts(prev => [...prev, productId as string]);
        toast.success("Product added to Cart", { position: "top-center" });
    }

    const removeProductFromCart = (productId: string) => {
        setCartProducts(prev => {
            if(checkFrequency(prev) && prev.length === 1) {
                setClearCart(true);
            }
            const pos = prev.indexOf(productId);
            if(pos === -1) {
                return prev;
            }
            return prev.filter((value, index) => index !== pos);
        })
    }

    const clearCartProducts = () => {
        setClearCart(true);
        setCartProducts([]);
    }

    const removeCertainProduct = (productId: string) => {
        setCartProducts(prev => {
            if(checkFrequency(prev)) {
                setClearCart(true);
            }
            const array: string[] = [];
            for(let i = 0; i < prev.length; i++) {
                if(prev[i] !== productId) {
                    array.push(prev[i]);
                }
            }
            return array;           
        })
    }
    

    return (
        <CartContext.Provider value={{
            cartProducts,
            setCartProducts,
            addProductToCart,
            removeProductFromCart,
            removeCertainProduct,
            clearCartProducts,
        }}>
            {children}
        </CartContext.Provider>
    )
}
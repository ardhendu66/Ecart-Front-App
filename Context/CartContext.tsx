import { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { checkFrequency } from "@/config/functions";

export interface CartContextType {
    cartProducts: string[],
    setCartProducts: Dispatch<SetStateAction<string[]>>,
    addProductToCart: (params: string) => void,
    removeProductFromCart: (params: string) => void,
    removeCertainProduct: (params: string) => void,
}

export const CartContext = createContext<CartContextType | Object>({})

export default function CartProvider({children}: any) {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const [cartProducts, setCartProducts] = useState<string[]>([]);
    const [clearCart, setClearCart] = useState(false);

    useEffect(() => {
        if (cartProducts?.length > 0) {
            ls?.setItem('cart', JSON.stringify(cartProducts));
        }

        if(clearCart === true) {
            ls?.setItem('cart', JSON.stringify([]))
        }
    }, [cartProducts, clearCart]);

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')!));
        }
    }, []);

    const addProductToCart = (productId: string) => {
        setCartProducts(prev => [...prev, productId as string]);
    }

    const removeProductFromCart = (productId: string) => {
        setCartProducts(prev => {
            const pos = prev.indexOf(productId);
            if(pos === -1) {
                return prev;
            }
            return prev.filter((value, index) => index !== pos);
        })
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
        }}>
            {children}
        </CartContext.Provider>
    )
}
import { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";

export interface CartContextType {
    cartProducts: string[],
    setCartProducts: Dispatch<SetStateAction<string[]>>,
    addProductToCart: (params: string) => void,
}

export const CartContext = createContext<CartContextType | Object>({})

export default function CartProvider({children}: any) {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const [cartProducts, setCartProducts] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (cartProducts?.length > 0) {
            ls?.setItem('cart', JSON.stringify(cartProducts));
        }
    }, [cartProducts]);

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')!));
        }
    }, []);

    const addProductToCart = (productId: string) => {
        setCartProducts(prev => [...prev, productId as string]);
    }
    

    return (
        <CartContext.Provider value={{
            cartProducts,
            setCartProducts,
            addProductToCart,
        }}>
            {children}
        </CartContext.Provider>
    )
}
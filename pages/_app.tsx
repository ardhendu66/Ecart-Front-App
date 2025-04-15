import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import CartProvider from '@/Context/CartContext';
import UserDetailsProvider from '@/Context/UserDetails';
import ProductsDetailsProvider from '@/Context/ProductContext';
import CategoryDetailsProvider from '@/Context/CategoryContext';
import { ToastContainer } from 'react-toastify';
import { Toaster } from "react-hot-toast";
import "react-toastify/ReactToastify.css";

export default function App({Component, pageProps: {session, ...pageProps}}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ProductsDetailsProvider>
        <UserDetailsProvider>
          <CategoryDetailsProvider>
            <CartProvider>
              <Head>
                <title>
                  Online Shopping Ecomstore
                </title>
              </Head>
              <Component {...pageProps} />
              <ToastContainer />
              <Toaster />
            </CartProvider>
          </CategoryDetailsProvider>
        </UserDetailsProvider>
      </ProductsDetailsProvider>
    </SessionProvider>
  )
}
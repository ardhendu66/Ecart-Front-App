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
              <Toaster
                toastOptions={{
                  position: "bottom-center",
                  style: {
                    background: "#1a1919",
                    color: "#fff",
                    fontSize: "18px",
                    fontWeight: "900",
                    lineHeight: "1.5rem",
                    padding: "1rem",
                    borderRadius: "2px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                    margin: "0.5rem",
                    letterSpacing: "1px",
                    minWidth: '400px',
                    maxWidth: '600px',
                  },
                  success: {
                    icon: (
                      <span style={{ fontSize: '24px' }}>
                        ✅
                      </span>
                    ),
                  },
                  error: {
                    icon: (
                      <span style={{ fontSize: '22px' }}>
                        ❌
                      </span>
                    ),
                  }
                }}
              />
            </CartProvider>
          </CategoryDetailsProvider>
        </UserDetailsProvider>
      </ProductsDetailsProvider>
    </SessionProvider>
  )
}
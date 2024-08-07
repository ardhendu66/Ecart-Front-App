import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import CartProvider from '@/Context/CartContext'
import UserDetailsProvider from '@/Context/UserDetails'
import { ToastContainer } from 'react-toastify'
import "react-toastify/ReactToastify.css"

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <UserDetailsProvider>
        <CartProvider>
          <Head>
            <title>Ecommerce</title>
          </Head>
          <Component {...pageProps} />
          <ToastContainer />
        </CartProvider>
      </UserDetailsProvider>
    </SessionProvider>
  )
}
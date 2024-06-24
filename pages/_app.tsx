import Head from 'next/head'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import CartProvider from '@/Context/CartContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Head>
        <title>Ecommerce</title>
      </Head>
      <Component {...pageProps} />
    </CartProvider>
  )
}
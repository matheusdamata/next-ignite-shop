import type { AppProps } from 'next/app'
import Image from 'next/image'

import { globalStyles } from '../styles/global'

import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app'
import Link from 'next/link'

import { SideRightCart } from '../components/SideRightCart'
import { ContextProvider } from '../context/Context'
import { Cart } from '../components/Cart'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Container>
        <Header>
          <Link href="/">
            <Image src={logoImg} alt="" />
          </Link>

          <Cart />
        </Header>

        <SideRightCart />
        <Component {...pageProps} />
      </Container>
    </ContextProvider>
  )
}

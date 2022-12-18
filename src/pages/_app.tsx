import type { AppProps } from 'next/app'
import Image from 'next/image'

import { globalStyles } from '../styles/global'

import logoImg from '../assets/logo.svg'
import { Container, Header, ButtonCart } from '../styles/pages/app'
import Link from 'next/link'

import { Handbag } from 'phosphor-react'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href="/">
          <Image src={logoImg} alt="" />
        </Link>

        <ButtonCart>
          <Handbag size={24} weight="bold" />
        </ButtonCart>
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}

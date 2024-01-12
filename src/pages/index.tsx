import { useContext } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useKeenSlider } from 'keen-slider/react'

import { stripe } from '../lib/stripe'

import {
  ButtonCart,
  FooterProductDetails,
  HomeContainer,
  Product,
} from '../styles/pages/home'

import 'keen-slider/keen-slider.min.css'

import Stripe from 'stripe'
import { Handbag } from 'phosphor-react'
import { Context } from '../context/Context'
import { HomeProps, ProductType } from '../@types/global'

export default function Home({ products }: HomeProps) {
  const { dispatch } = useContext(Context)

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  function handleAddCart(product: ProductType) {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        description: product.description,
        defaultPriceId: product.defaultPriceId,
        quantity: 1,
      },
    })
  }

  return (
    <>
      <Head>
        <title>Home | E-commerce Exemplo</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Product className="keen-slider__slide" key={product.id}>
              <Link href={`/product/${product.id}`} prefetch={false}>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
              </Link>

              <footer>
                <FooterProductDetails>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </FooterProductDetails>

                <div>
                  <ButtonCart onClick={() => handleAddCart(product)}>
                    <Handbag size={32} weight="bold" />
                  </ButtonCart>
                </div>
              </footer>
            </Product>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
      description: product.description,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}

import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useContext, useState } from 'react'
import Stripe from 'stripe'
import { ProductProps } from '../../@types/global'
import { Context } from '../../context/Context'
import { stripe } from '../../lib/stripe'
import {
  Button,
  ButtonsContainer,
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/products'

export default function Product({ product }: ProductProps) {
  const { dispatch } = useContext(Context)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      // Conectar com uma ferramente de observabilidade (Datadog / Sentry)

      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  function handleAddCart() {
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
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <ButtonsContainer>
            <Button
              disabled={isCreatingCheckoutSession}
              onClick={handleBuyProduct}
              bgColor="dark"
            >
              Comprar agora
            </Button>

            <Button
              disabled={isCreatingCheckoutSession}
              onClick={handleAddCart}
              bgColor="transparent"
            >
              Adicionar ao carrinho
            </Button>
          </ButtonsContainer>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: 'prod_MvH89Ak3JEvVM4',
        },
      },
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}

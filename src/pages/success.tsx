import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { stripe } from '../lib/stripe'
import {
  SuccessContainer,
  ImageContainer,
  ImageContent,
} from '../styles/pages/success'
import Stripe from 'stripe'

interface StripeDataProps {
  id: string
  price: {
    id: string
    product: {
      images: Array<string>
    }
  }
}

interface SuccessProps {
  customerName: string
  products: StripeDataProps[]
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageContainer>
          {products.map((item) => (
            <ImageContent key={item.id}>
              <Image
                src={item.price?.product.images[0]}
                width={120}
                height={110}
                alt=""
              />
            </ImageContent>
          ))}
        </ImageContainer>

        <p>
          Uhuul! <strong>{customerName}</strong>, sua compra de{' '}
          {products.length} {products.length > 1 ? 'camisetas' : 'camiseta'} já
          está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name
  const products = session.line_items as Stripe.ApiList<Stripe.LineItem>
  // const product = session.line_items?.data[0].price?.product as Stripe.Product

  const { data } = products

  return {
    props: {
      customerName,
      products: data,
    },
  }
}

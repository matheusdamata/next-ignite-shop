export type HomeProps = {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
    quantity: number
  }[]
}

export type ProductProps = {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
    quantity: number
  }
}

export type ProductType = {
  id: string
  name: string
  imageUrl: string
  price: string
  description: string
  defaultPriceId: string
  quantity: number
}

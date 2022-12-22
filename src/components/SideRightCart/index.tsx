import { useContext, useEffect, useState } from 'react'
import { X } from 'phosphor-react'
import {
  CartInfoBottom,
  CartInfoTop,
  Container,
  Content,
  Header,
  ProductList,
  ProductListItem,
} from '../../styles/components/siderightcart'
import { Context } from '../../context/Context'
import Image from 'next/image'

interface SideRightCartProps {
  isActive: boolean
}

export function SideRightCart({ isActive }: SideRightCartProps) {
  const { carts } = useContext(Context)

  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(isActive)
  }, [isActive])

  return (
    <>
      {active ? (
        <Container>
          <Header>
            <button onClick={() => setActive(!active)}>
              <X size={24} />
            </button>
          </Header>

          <Content>
            <h1>Sacola de compras</h1>

            <ProductList>
              {carts.map((cart) => (
                <ProductListItem key={cart.id}>
                  <Image src={cart.imageUrl} alt="" width={95} height={95} />
                </ProductListItem>
              ))}
            </ProductList>

            <footer>
              <CartInfoTop>
                <strong>Quantidade</strong>
                <span>3 itens</span>
              </CartInfoTop>

              <CartInfoBottom>
                <strong>Valor total</strong>
                <span>R$270,00</span>
              </CartInfoBottom>

              <button>Finalizar compra</button>
            </footer>
          </Content>
        </Container>
      ) : null}
    </>
  )
}

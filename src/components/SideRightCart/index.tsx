import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'

import {
  CartInfoBottom,
  CartInfoTop,
  Container,
  Content,
  Header,
  ProductList,
  ProductListInfo,
  ProductListInfoContainer,
  ProductListInfoPrice,
  ProductListInfoTitle,
  ProductListItem,
  ProductListItemImage,
} from '../../styles/components/siderightcart'
import { X } from 'phosphor-react'

import { Context } from '../../context/Context'
import { priceFormatter } from '../../utils/formatter'

interface SideRightCartProps {
  isActive: boolean
}

export function SideRightCart({ isActive }: SideRightCartProps) {
  const { carts, dispatch } = useContext(Context)

  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(isActive)
  }, [isActive])

  function handleDeleteCart(id: string) {
    dispatch({
      type: 'REMOVE_CART',
      payload: id,
    })
  }

  const subTotal = carts.reduce(
    (total, cart) => total + parseFloat(cart.price.slice(3)),
    0,
  )

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
                  <ProductListItemImage>
                    <Image src={cart.imageUrl} alt="" width={95} height={95} />
                  </ProductListItemImage>

                  <ProductListInfoContainer>
                    <ProductListInfo>
                      <ProductListInfoTitle>{cart.name}</ProductListInfoTitle>
                      <ProductListInfoPrice>{cart.price}</ProductListInfoPrice>
                    </ProductListInfo>

                    <button onClick={() => handleDeleteCart(cart.id)}>
                      Remover
                    </button>
                  </ProductListInfoContainer>
                </ProductListItem>
              ))}
            </ProductList>

            <footer>
              <CartInfoTop>
                <strong>Quantidade</strong>
                <span>{carts ? carts.length : '0'} itens</span>
              </CartInfoTop>

              <CartInfoBottom>
                <strong>Valor total</strong>
                <span>{priceFormatter.format(subTotal)}</span>
              </CartInfoBottom>

              <button>Finalizar compra</button>
            </footer>
          </Content>
        </Container>
      ) : null}
    </>
  )
}

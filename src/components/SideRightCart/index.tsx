import { useContext, useState } from 'react'
import Image from 'next/image'

import {
  CartEmpty,
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
import axios from 'axios'

export function SideRightCart() {
  const { carts, openCart, dispatch } = useContext(Context)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  function handleShowCart() {
    dispatch({
      type: 'SHOW_CART',
      payload: openCart,
    })
  }

  function handleDeleteCart(id: string) {
    dispatch({
      type: 'REMOVE_CART',
      payload: id,
    })
  }

  async function handleBuyCart() {
    try {
      setIsCreatingCheckoutSession(true)

      const cartList = carts.map((cart) => ({
        price: cart.defaultPriceId,
        quantity: 1,
      }))

      const response = await axios.post('/api/checkout', {
        cart: cartList,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  const subTotal = carts.reduce(
    (total, cart) => total + parseFloat(cart.price.slice(3)),
    0,
  )

  return (
    <>
      {openCart ? (
        <Container>
          <Header>
            <button onClick={handleShowCart}>
              <X size={24} />
            </button>
          </Header>

          <Content>
            <h1>Sacola de compras</h1>

            {carts.length > 0 ? (
              <ProductList>
                {carts.map((cart) => (
                  <ProductListItem key={cart.id}>
                    <ProductListItemImage>
                      <Image
                        src={cart.imageUrl}
                        alt=""
                        width={95}
                        height={95}
                      />
                    </ProductListItemImage>

                    <ProductListInfoContainer>
                      <ProductListInfo>
                        <ProductListInfoTitle>{cart.name}</ProductListInfoTitle>
                        <ProductListInfoPrice>
                          {cart.price}
                        </ProductListInfoPrice>
                      </ProductListInfo>

                      <button onClick={() => handleDeleteCart(cart.id)}>
                        Remover
                      </button>
                    </ProductListInfoContainer>
                  </ProductListItem>
                ))}
              </ProductList>
            ) : (
              <CartEmpty>
                <h2>Carrinho vazio</h2>
              </CartEmpty>
            )}
            <footer>
              <CartInfoTop>
                <strong>Quantidade</strong>
                <span>{carts ? carts.length : '0'} itens</span>
              </CartInfoTop>

              <CartInfoBottom>
                <strong>Valor total</strong>
                <span>{priceFormatter.format(subTotal)}</span>
              </CartInfoBottom>

              <button
                disabled={carts.length === 0 || isCreatingCheckoutSession}
                onClick={handleBuyCart}
              >
                Finalizar compra
              </button>
            </footer>
          </Content>
        </Container>
      ) : null}
    </>
  )
}

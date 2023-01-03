import { useContext } from 'react'
import { ButtonCart } from '../../styles/components/cart'
import { Handbag } from 'phosphor-react'
import { Context } from '../../context/Context'

export function Cart() {
  const { carts, openCart, dispatch } = useContext(Context)

  function handleShowCart() {
    dispatch({
      type: 'SHOW_CART',
      payload: openCart,
    })
  }

  return (
    <ButtonCart onClick={handleShowCart}>
      <Handbag size={24} weight="bold" />
      {carts.length > 0 ? <span>{carts.length}</span> : null}
    </ButtonCart>
  )
}

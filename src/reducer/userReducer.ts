import produce from 'immer'

export type CartProps = {
  id: string
  name: string
  imageUrl: string
  price: string
  description: string
  defaultPriceId: string
  quantity: number
}

export type UserType = {
  carts: CartProps[]
  openCart: boolean
}

export const userReducer = (state: UserType, action: any) => {
  switch (action.type) {
    case 'INIT_STORED': {
      return produce(state, (draft) => {
        draft.carts = action.payload.carts
        draft.openCart = action.payload.openCart
      })
    }
    case 'SHOW_CART': {
      return produce(state, (draft) => {
        draft.openCart = !action.payload
      })
    }
    case 'ADD_TO_CART': {
      const currentProductIndex = state.carts.findIndex((cart) => {
        return cart.id === action.payload.id
      })

      if (currentProductIndex < 0) {
        return produce(state, (draft) => {
          draft.carts.push(action.payload)
        })
      }

      return state
    }
    case 'REMOVE_CART': {
      return {
        ...state,
        carts: state.carts?.filter((cart) => cart.id !== action.payload),
      }
    }
    default:
      return state
  }
}

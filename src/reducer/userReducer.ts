import produce from 'immer'

export type CartProps = {
  id: string
  name: string
  imageUrl: string
  price: string
  description: string
  defaultPriceId: string
}

export type UserType = {
  carts: CartProps[]
}

export const userReducer = (state: UserType, action: any) => {
  switch (action.type) {
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

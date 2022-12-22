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
      return produce(state, (draft) => {
        draft.carts.push(action.payload)
      })
    }
    default:
      return state
  }
}

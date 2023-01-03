import React, { createContext, ReactNode, useReducer } from 'react'
import { CartProps, userReducer } from '../reducer/userReducer'

type ContextType = {
  carts: CartProps[]
  openCart: boolean
  dispatch: React.Dispatch<any>
}

type ContextProviderType = {
  children: ReactNode
}

export const Context = createContext({} as ContextType)

export const ContextProvider = ({ children }: ContextProviderType) => {
  const [userState, dispatch] = useReducer(userReducer, {
    carts: [],
    openCart: false,
  })

  const { carts, openCart } = userState

  return (
    <Context.Provider value={{ carts, openCart, dispatch }}>
      {children}
    </Context.Provider>
  )
}

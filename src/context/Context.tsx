import React, { createContext, ReactNode, useEffect, useReducer } from 'react'
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

  useEffect(() => {
    const storedStateAsJSON = localStorage.getItem(
      '@ignite-shop:ignite-shop-state-1.0.0',
    )

    if (storedStateAsJSON) {
      dispatch({
        type: 'INIT_STORED',
        payload: JSON.parse(storedStateAsJSON),
      })
    }
  }, [])

  const { carts, openCart } = userState

  useEffect(() => {
    const stateJSON = JSON.stringify(userState)

    localStorage.setItem('@ignite-shop:ignite-shop-state-1.0.0', stateJSON)
  }, [userState])

  return (
    <Context.Provider value={{ carts, openCart, dispatch }}>
      {children}
    </Context.Provider>
  )
}

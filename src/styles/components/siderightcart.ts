import { keyframes } from '@stitches/react'
import { styled } from '..'

export const showSidebar = keyframes({
  from: {
    opacity: 0,
    width: 0,
  },
  to: {
    opacity: 1,
    width: 480,
  },
})

export const hideSidebar = keyframes({
  from: {
    opacity: 1,
    width: 480,
  },
  to: {
    opacity: 0,
    width: 0,
  },
})

export const Container = styled('div', {
  width: '100%',
  maxWidth: 480,
  height: '100vh',

  display: 'flex',
  flexDirection: 'column',

  top: 0,
  right: 0,
  bottom: 0,

  position: 'absolute',
  background: '$gray800',
  zIndex: 5,

  h1: {
    fontSize: '$lg',
    marginBottom: '2rem',
  },
})

export const Header = styled('header', {
  display: 'flex',
  justifyContent: 'flex-end',

  padding: '1.5rem 1.5rem 0',

  button: {
    display: 'flex',
    background: 'transparent',
    border: 0,
  },

  svg: {
    color: '$gray500',
  },
})

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  height: '100%',

  padding: '1.5rem 3rem',

  footer: {
    display: 'flex',
    flexDirection: 'column',

    button: {
      width: '100%',
      marginTop: '3.4375rem',
      backgroundColor: '$green500',
      border: 0,
      color: '$white',
      borderRadius: 8,
      padding: '1.25rem',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '$md',

      '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed',
      },

      '&:not(:disabled):hover': {
        backgroundColor: '$green300',
      },
    },
  },
})

export const ProductList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: '1rem',
})

export const ProductListItem = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
})

export const ProductListItemImage = styled('div', {
  width: '100%',
  maxWidth: 102,
  height: 93,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
})

export const ProductListInfoContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  button: {
    width: '4.0625rem',

    fontSize: '1rem',
    textAlign: 'left',
    fontWeight: 'bold',
    color: '$green500',

    border: 0,

    background: 'transparent',
  },
})

export const ProductListInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  gap: '0.5rem',
})

export const ProductListInfoTitle = styled('span', {
  fontSize: '$md',
})

export const ProductListInfoPrice = styled('strong', {
  fontSize: '$md',
  fontWeight: 'bold',
})

export const CartEmpty = styled('div', {
  height: '100%',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  h2: {
    color: '$gray500',
  },
})

export const CartInfoTop = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',

  strong: {
    fontSize: '1rem',
    fontWeight: 'initial',
  },

  span: {
    fontSize: '$md',
  },
})

export const CartInfoBottom = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',

  marginTop: 7,

  strong: {
    fontSize: '$md',
  },

  span: {
    fontSize: '$xl',
    fontWeight: 'bold',
  },
})

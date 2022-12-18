import { styled } from "..";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
})


export const ButtonCart = styled('button', {
  width: '3rem',
  height: '3rem',

  border: 0,
  borderRadius: '6px',
  background: '$gray800',

  svg: {
    color: '$gray500',
  },

  '&:hover': {
    transition: 'all 0.2s ease',
    opacity: 0.8,

    svg: {
      color: '$green300',
    }
  }
})
import { styled } from '..'

export const ButtonCart = styled('button', {
  width: '3rem',
  height: '3rem',

  border: 0,
  borderRadius: '6px',
  background: '$gray800',

  position: 'relative',

  svg: {
    color: '$gray500',
  },

  span: {
    width: '1.5rem',
    height: '1.5rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: '50%',
    position: 'absolute',

    marginTop: '-50px',
    marginLeft: '30px',

    color: '$gray100',
    background: '$green500',
  },

  '&:hover': {
    transition: 'all 0.2s ease',
    opacity: 0.8,

    svg: {
      color: '$green300',
    },
  },
})

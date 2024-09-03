import RateStarStyled from './styled'

interface RateStarProps {
  isActive: boolean
}

function RateStar({ isActive }: RateStarProps) {
  return (
    <RateStarStyled isActive={isActive}>
      <div className='rate-star w-100 h-100' />
    </RateStarStyled>
  )
}

export default RateStar

import styled from 'styled-components'

interface RateStarStyledProps {
  isActive: boolean
}

const RateStarStyled = styled.div<RateStarStyledProps>`
  width: 16px;
  height: 16px;

  .rate-star {
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    background-color: ${({ theme, isActive }) => (isActive ? theme.color.yellow : theme.color.grey)};
  }
`

export default RateStarStyled

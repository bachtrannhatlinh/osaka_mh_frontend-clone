import styled from 'styled-components'
const StarInStyled = styled.div`
  text-align: center;
  font-weight: 500;
  display: block;
  width: 100px;
  .star-in {
    font-size: 12px;
    color: ${({ theme }) => theme.color.grey};
    line-height: 14.4px;
  }

  .hour-minute-sec {
    font-size: 24px;
    line-height: 28.8px;
    color: ${({ theme }) => theme.color.yellow};
  }
`

export default StarInStyled
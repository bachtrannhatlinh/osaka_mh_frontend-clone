import styled from 'styled-components'

const LiveStyled = styled.div`
  .starts-in {
    color: ${({ theme }) => theme.color.red};
    column-gap: 8px;

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 20px;

      background-color: ${({ theme }) => theme.color.red};
    }

    .live {
      font-size: 24px;
      line-height: 20px;
    }
  }
`

export default LiveStyled

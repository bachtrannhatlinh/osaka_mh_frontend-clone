import styled from 'styled-components'

const CloneCommonLayoutStyled = styled.div`
  background-color: ${({ theme }) => theme.color.darkBlue};

  .header-container {
    border-bottom: 1px solid ${({ theme }) => theme.color.headerBorder};
    z-index: 1;
  }

  .content-container {
    min-height: 100vh;
  }
`

export default CloneCommonLayoutStyled

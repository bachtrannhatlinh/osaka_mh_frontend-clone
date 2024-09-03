import { createGlobalStyle } from 'styled-components'

const CustomBootstrapStyles = createGlobalStyle`
  .container {
    ${({ theme }) => theme.media.greaterThan(theme.size.xxl)} {
      max-width: 1240px;
      padding: 0;
    }
  }
`

export default CustomBootstrapStyles

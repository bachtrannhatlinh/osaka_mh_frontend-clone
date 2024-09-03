import styled from 'styled-components'

const OpenStyled = styled.div`
  .head-container {
    margin-bottom: 10px;

    ${({ theme }) => theme.media.lessThan(theme.size.md)} {
      margin-bottom: 12px;
    }

    .title {
      font-size: 24px;
      line-height: 20px;

      ${({ theme }) => theme.media.lessThan(theme.size.md)} {
        font-size: 18px;
      }
    }
  }

  .search-container {
    column-gap: 38px;

    ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
      row-gap: 24px;
    }

    .class-filter-container {
      width: 420px;

      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        width: auto;
      }
    }
  }

  .content-container {
    padding-top: 10px;
  }
`

export default OpenStyled

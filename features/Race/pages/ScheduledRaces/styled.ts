import styled from 'styled-components'

const ScheduledRacesStyled = styled.div`
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

    ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
      row-gap: 24px;
    }
  }

  .content-container {
    padding-top: 10px;
  }
`

export default ScheduledRacesStyled

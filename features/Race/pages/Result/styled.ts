import { FILTER_BTN_BG } from 'assets/images'
import styled from 'styled-components'

const ResultStyled = styled.div`
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
    gap: 24px;
    margin-bottom: 30px;

    .filter-container {
      width: 99px;
      height: 32px;
      background-image: url(${FILTER_BTN_BG});

      .filter {
        gap: 8px;

        .filter-icon {
          width: 24px;
          aspect-ratio: 1 / 1;
        }

        .filter-text {
          font-size: 16px;
          line-height: 20px;
        }

        .button-filter {
          background-color: #191d2c;
          border: none;
        }
      }
    }
  }

  .content-container {
  }
`

export default ResultStyled

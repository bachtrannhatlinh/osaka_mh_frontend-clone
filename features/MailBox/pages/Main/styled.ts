import styled from 'styled-components'

const MailBoxStyled = styled.div`
  padding-top: 18px;

  .title-tabs-container {
    margin-bottom: 12px;

    ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
      overflow-x: scroll;
    }

    .title-tabs {
      column-gap: 10px;

      ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
        width: fit-content;
      }

      .tab-link {
        text-decoration: none;
        color: ${({ theme }) => theme.color.grey};
        font-size: 32px;
        line-height: 26px;

        width: 256px;

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          font-size: 26px;
        }

        ${({ theme }) => theme.media.lessThan(theme.size.md)} {
          font-size: 20px;
          line-height: 20px;
        }

        ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
          min-width: 160px;
          width: auto;
        }
      }
    }
  }

  .content {
  }
`

export default MailBoxStyled

import { FOOTER_BG } from 'assets/images'
import styled from 'styled-components'

const FooterStyled = styled.div`
  .footer {
    background-image: url(${FOOTER_BG});
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;

    height: 80px;
    padding: 36px 65px 25px;

    ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
      background-image: none;
      background-color: ${({ theme }) => theme.color.black};

      padding: 12px;
      height: auto;
      row-gap: 10px;
    }

    .copyright-container {
      margin-right: 44px;

      ${({ theme }) => theme.media.lessThan(theme.size.md)} {
        margin-right: 36px;
      }

      .copyright {
        margin-right: 10px;
      }

      .company {
        font-size: 16px;
        line-height: 19px;

        ${({ theme }) => theme.media.lessThan(theme.size.md)} {
          font-size: 14px;
        }
      }
    }

    .service,
    .policy {
      font-size: 16px;
      line-height: 19px;

      ${({ theme }) => theme.media.lessThan(theme.size.md)} {
        font-size: 14px;
      }

      &:hover {
        color: ${({ theme }) => theme.color.white};
      }
    }
  }
`

export default FooterStyled

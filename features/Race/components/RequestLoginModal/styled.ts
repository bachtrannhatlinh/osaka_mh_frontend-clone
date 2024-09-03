import { OPEN_RACE_BTN_BORDER } from 'assets/images'
import styled from 'styled-components'

const RequestLoginModalStyled = styled.div`
  .request-login-modal {
    background-color: ${({ theme }) => theme.color.neutral};
    clip-path: polygon(0 0, 100% 0, 100% 100%, 40px 100%, 0 calc(100% - 40px));
    padding: 32px;

    min-width: 450px;
    min-height: 220px;

    .btn-container {
      .cancel-btn {
        background-color: ${({ theme }) => theme.color.transparent};
        background-image: url(${OPEN_RACE_BTN_BORDER});
        background-repeat: no-repeat;
        background-size: contain;
        border: none;

        width: 110px;
        aspect-ratio: 110 / 34;

        font-size: 16px;

        ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
          width: 90px;
          font-size: 12px;
        }

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          width: 110px;
          font-size: 16px;
        }

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          width: 140px;
        }
      }
    }
  }
`

export default RequestLoginModalStyled

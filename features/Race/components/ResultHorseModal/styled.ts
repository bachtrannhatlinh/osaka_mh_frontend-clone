import styled from 'styled-components'

const ChooseHorseModalStyled = styled.div`
  .choose-horse-modal {
    background-color: ${({ theme }) => theme.color.neutral};
    clip-path: polygon(0 0, 100% 0, 100% 100%, 40px 100%, 0 calc(100% - 40px));
    padding: 32px;
    position: relative;
    min-height: 326px;
    min-width: 615px;
    max-width: 700px;
    .close-btn {
      top: 10px;
      right: 10px;
      background-color: ${({ theme }) => theme.color.transparent};
      border: none;
      z-index: 1;
    }

    .race-name-container {
      .race-name {
        font-size: 24px;
        line-height: 20px;
        margin-bottom: 28px;
        span {
          margin-bottom: 4px;
        }
      }
    }

    .confirm-horse {
      &-btns {
        margin-top: 26px;
        position: absolute;
        bottom: 32px;
        right: 32px;
        button {
          border: 0;
          background: none;
          padding: 0;
          margin: 0;
        }
      }
      &-message {
        opacity: 1;
      }

      .confirm-horse-message {
        font-size: 24px;
        .reject-msg-failed {
          width: 600px;
        }
        & > div {
          white-space: pre-line;
        }
      }
    }
  }
`

export default ChooseHorseModalStyled

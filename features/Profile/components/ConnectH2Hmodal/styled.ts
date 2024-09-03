import styled from 'styled-components'

const ConnectH2hModalStyled = styled.div`
  background-color: ${({ theme }) => theme.color.neutral};
  clip-path: polygon(0 0, 100% 0, 100% 100%, 40px 100%, 0 calc(100% - 40px));
  padding: 52px 0;
  width: 768px;
  position: relative;
  .h2h-connect-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .h2h-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      img {
        width: 93px;
        height: 93px;
        object-fit: cover;
        margin-bottom: 20px;
      }
      h4 {
        font-size: 20px;
        margin-bottom: 0;
      }
    }
    form {
      .user-h2h-input {
        span.user-h2h-title {
          font-weight: 400;
          font-size: 21px;
          line-height: 20px;
          display: block;
          text-transform: capitalize;
          margin-bottom: 12px;
        }
        span.user-h2h-input-container {
          display: block;
          margin-bottom: 20px;
        }
      }
      .not-account-h2h {
        margin-bottom: 45px;
        text-align: center;
        span {
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
        }
      }
      div.button-h2h-group {
        display: flex;
        justify-content: space-between;
        align-items: align-items;
        button {
          background-color: ${({ theme }) => theme.color.neutral};
          border: none;
        }
      }
    }
  }
  .right-line-modal {
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .width-msg-error {
    width: 435px;
  }
`

export default ConnectH2hModalStyled

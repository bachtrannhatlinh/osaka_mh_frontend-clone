import styled from 'styled-components'

const MailItemModalStyled = styled.div`
  background-color: ${({ theme }) => theme.color.neutral};
  clip-path: polygon(0 0, 100% 0, 100% 100%, 40px 100%, 0 calc(100% - 40px));
  padding: 25px 35px;
  position: relative;
  color: white;
  width: 600px;
  min-height: 500px;
  max-height: 600px;
  word-wrap: break-word;
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: ${({ theme }) => theme.color.transparent};
    border: none;
    z-index: 1;
  }

  .title-mail-item {
    font-size: 30px;
    color: green;
    justify-content: center;
  }

  .content-mail-item {
    margin-top: 10px;
    font-size: 20px;
    white-space: pre-line;
    max-height: 400px;
  }

  .item-mail-items {
    margin-top: 30px;
    .e-htc {
      position: relative;
      width: 70px;
      text-align: center;
      span {
        position: absolute;
        z-index: 1;
        left: 35px;
        top: -12px;
      }
      .game-token-e-htc {
        position: absolute;
        height: 18px;
        z-index: 1;
        top: -9px;
        left: 12px;
      }
    }

    .e-prz {
      position: relative;
      width: 70px;
      text-align: center;
      span {
        position: absolute;
        z-index: 1;
        left: 33px;
        top: -12px;
      }
      .game-token-e-prz {
        position: absolute;
        height: 20px;
        z-index: 1;
        top: -9px;
        left: 15px;
      }
    }
  }

  .claim-content {
    margin-top: 30px;
    button {
      background: #191d2c;
      border: none;
    }
  }
`

export default MailItemModalStyled

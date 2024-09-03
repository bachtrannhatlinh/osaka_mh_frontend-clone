import styled from 'styled-components'

const WithdrawFreePRZModalStyled = styled.div`
  background-color: ${({ theme }) => theme.color.neutral};
  clip-path: polygon(0 0, 100% 0, 100% 100%, 40px 100%, 0 calc(100% - 40px));
  padding: 16px 35px;
  position: relative;
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: ${({ theme }) => theme.color.transparent};
    border: none;
    z-index: 1;
  }

  .title-exchange {
    border-bottom: 2px solid ${({ theme }) => theme.color.black};
    .withdraw {
      font-size: 24px;
      color: ${({ theme }) => theme.color.white};
    }

    .claim {
      font-size: 14px;
      color: #979797;
      margin-top: 17px;
    }
  }

  .e-prz {
    position: relative;
    color: white;
    font-size: 24px;
    margin-top: 30px;
    .game-token-e-prz {
      position: absolute;
      top: 30px;
      right: 156px;
      width: 28px;
      height: 50px;
    }

    .value-e-prz {
      position: absolute;
      top: 35px;
      left: 61px;
      color: #d9d9d9;
    }

    .search-input {
      background-color: ${({ theme }) => theme.color.transparent};
      border: none;

      font-size: 24px;
      line-height: 20px;
      color: ${({ theme }) => theme.color.white};

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: ${({ theme }) => theme.color.grey};
      }
    }

    .value-balance {
      position: absolute;
      top: 0;
      right: 61px;
      color: #979797;
    }

    .title-z-prz {
      position: absolute;
      top: 35px;
      right: 75px;
      color: #d9d9d9;
    }

    .title-e-prz {
      position: absolute;
      top: 35px;
      right: 76px;
      color: #d9d9d9;
    }
  }

  .notice-exchange {
    color: #d9d9d9;
    font-size: 18px;
  }

  .btn-connect-wallet {
    cursor: pointer;
    button {
      background-color: #191d2c;
      border: none;
    }
  }
`

export default WithdrawFreePRZModalStyled

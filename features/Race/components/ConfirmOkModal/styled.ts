import styled from 'styled-components'

const ChooseCancelStyled = styled.div`
  .choose-horse-modal {
    background-color: ${({ theme }) => theme.color.neutral};
    clip-path: polygon(0 0, 100% 0, 100% 100%, 40px 100%, 0 calc(100% - 40px));
    padding: 32px;
    position: relative;
    min-width: 470px;
    .close-btn {
      top: 10px;
      right: 10px;
      background-color: ${({ theme }) => theme.color.transparent};
      border: none;
      z-index: 1;
    }

    .race-fee {
      margin: 34px 0 40px 0;
      max-width: 300px;
      span {
        margin-left: 5px;

        img {
          width: 15px;
          height: 15px;
          margin-top: -3px;
          margin-left: -1px;
        }
      }
    }

    .race-name-container {
      margin-bottom: 16px;

      .line-bottom {
        display: flex;
      }
      .race-name {
        font-size: 24px;
        line-height: 20px;
      }
    }

    .race-info-container {
      gap: 32px;
      padding-bottom: 25px;
      border-bottom: 2px solid ${({ theme }) => theme.color.black};

      .race-info-item {
        gap: 8px;

        .race-info-title {
          font-size: 12px;
          line-height: 14px;
        }

        .race-info-content {
          font-size: 16px;
          line-height: 19px;
        }

        img {
          width: 15px;
          height: 15px;
          margin-top: -3px;
          margin-left: 2px;
        }
      }
    }

    .search-horse-container {
      margin: 21px 0 16px 0;
      .no-horse {
        color: #a3a5ab;
      }

      .search-title {
        font-size: 16px;
        line-height: 24px;
      }

      .search-input {
        background-color: ${({ theme }) => theme.color.black};
        opacity: 0.85;
        width: 240px;
      }
    }

    .horse-list-container {
      max-height: 450px;
      .active {
        background: ${({ theme }) => theme.color.primary};
      }
    }

    .horse-list-container::-webkit-scrollbar-track {
      border: 1px solid #000;
      padding: 2px 0;
      background-color: #000;
    }

    .horse-list-container::-webkit-scrollbar {
      width: 5px;
    }

    .horse-list-container::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #2f323e;
      border: 1px solid #000;
    }

    .confirm-horse {
      .confirm-borrow-question {
        font-size: 24px;
        margin-bottom: 8px;
      }
      margin-top: 35px;
      &-btns {
        margin-top: 26px;
        gap: 20px;
        button {
          border: 0;
          background: none;
          padding: 0;
          margin: 0 40px;
        }
      }
      &-title {
        font-size: 20px;
        line-height: 24px;
        text-align: center;
      }
      .text {
        color: white;
        font-size: 20px;
        text-align: center;
        .farm-Service {
          text-align: left;
          white-space: pre-line;
        }
      }
    }

    .message-error {
      color: #e01621;
      text-align: start;
      padding-top: 8px;
      font-size: 16px;
    }
  }
`

export default ChooseCancelStyled

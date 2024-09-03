import styled from 'styled-components'

const ChooseHorseModalStyled = styled.div`
  .choose-horse-modal {
    background-color: ${({ theme }) => theme.color.neutral};
    clip-path: polygon(0 0, 100% 0, 100% 100%, 40px 100%, 0 calc(100% - 40px));
    padding: 32px;
    position: relative;
    min-height: 300px;
    min-width: 700px;
    .close-btn {
      top: 10px;
      right: 10px;
      background-color: ${({ theme }) => theme.color.transparent};
      border: none;
      z-index: 1;
    }

    .race-name-container {
      margin-bottom: 16px;

      .race-name {
        font-size: 24px;
        line-height: 20px;
      }
      .gate-no {
        background-color: #267e5a;
        border-radius: 4px;
        font-size: 18px;
        padding: 2px 10px;
      }
    }

    .race-info-container {
      gap: 32px;
      padding-bottom: 25px;
      border-bottom: 2px solid ${({ theme }) => theme.color.black};

      .race-info-item {
        gap: 8px;

        .race-info-title {
          font-size: 14px;
          line-height: 14px;
        }

        .race-info-content {
          font-size: 16px;
          line-height: 19px;

          img {
            width: 15px;
            height: 15px;
            margin-top: -5px;
            margin-left: 3px;
          }
        }
      }
    }

    .search-horse-container {
      margin: 21px 0 16px 0;
      .search-title {
        font-size: 16px;
        line-height: 24px;
      }

      .search-input {
        background-color: ${({ theme }) => theme.color.black};
        opacity: 0.85;
        width: 240px;
        font-size: 16px;
      }
    }
    .no-horse {
      color: #a3a5ab;
      font-size: 18px;
      padding-top: 20px;
    }

    .horse-list-container {
      max-height: 450px;
      overflow-y: scroll;
      gap: 16px;
      min-height: 180px;
    }

    .horse-list-container-clone {
      max-height: 450px;
      gap: 16px;
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
  }
`

export default ChooseHorseModalStyled

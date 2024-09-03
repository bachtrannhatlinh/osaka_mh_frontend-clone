import styled from 'styled-components'

const StyledBalance = styled.div`
  background-color: transparent;
  text-align: center;
  .disable {
    display: none;
  }
  .balance-container {
    width: 750px;
    margin: auto;
    .balance {
      margin-top: 34px;
      .title {
        text-decoration: none;
        color: #4bf296;
        font-size: 32px;
        line-height: 26px;
        text-transform: uppercase;
      }
    }
    .wallet-icon {
      margin-right: 20px;
    }
    .icon-coin {
      height: 30px;
      text-align: center;
    }
    .wallet {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      align-items: center;
      margin: 20px 0px;
      .wallet-title {
        color: #4bf296;
        text-align: start;
        font-size: 20px;
      }
      .wallet-item {
        font-size: 20px;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 14px 100%, 0 calc(100% - 14px));
        background-color: #191d2c;
        width: 337px;
        height: 70px;
        display: grid;
        grid-template-columns: 1fr 1fr 2fr;
        color: white;
        align-items: center;
        padding: 0 20px;
        margin: 12px 0px;
        .value-coin {
          text-align: end;
          grid-column: 3 / span 2;
        }
        .name-coin {
          text-align: start;
        }
      }
    }

    .exchange {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      align-items: center;
      margin-left: auto;
      margin-right: auto;
      .exchange-title {
        color: #4bf296;
        text-align: start;
        font-size: 20px;
      }
      .exchange-container {
        position: relative;
        margin-bottom: 20px;
        cursor: pointer;
        .background-line {
          position: absolute;
          top: -12px;
          left: 0px;
          z-index: 1;
        }
        .exchange-item {
          clip-path: polygon(24px 0px, 100% 0px, 100% 100%, 0px 100%, 0px 24px);
          background: linear-gradient(90deg, rgb(105, 209, 130) 0%, rgb(3, 62, 26) 104.33%);
          padding: 2px;
          margin: 12px 0px;
          .exchange-background {
            width: 337px;
            height: 78px;
            display: grid;
            grid-template-columns: auto auto auto;
            color: white;
            align-items: center;
            padding: 0 20px;
            text-align: center;

            clip-path: polygon(24px 0px, 100% 0px, 100% 100%, 0px 100%, 0px 24px);
            background: rgb(25, 29, 44);
            padding: 23px 16px;
          }
        }
      }
      .exchange-container:hover {
        transform: scale(1.1);
        transition-duration: 0.5s;
        filter: drop-shadow(-2px 2px 26px rgb(11 136 235));
      }
    }
  }
`

export default StyledBalance

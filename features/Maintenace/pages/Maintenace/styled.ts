import { LOGIN_BTN_OUTLINE } from 'assets/images'
import styled from 'styled-components'

const StyledMaintenace = styled.div`
  background-color: #121520;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 40px 100%, 0 calc(100% - 40px));
  min-height: 500px;
  min-width: 700px;
  text-align: center;
  position: relative;
  padding: 5px;
  .setting-icon {
    margin: 20px 0px;
    .setting-icon-item {
      padding: 8px;
    }
    .setting-icon-item:nth-child(2) {
      filter: brightness(0.75);
    }
    .setting-icon-item:nth-child(3) {
      filter: brightness(0.5);
    }
    .setting-icon-item:nth-child(4) {
      filter: brightness(0.35);
    }
    .setting-icon-item:nth-child(5) {
      filter: brightness(0.25);
    }
  }
  .header {
    padding: 20px 100px;
    border-bottom: 1px solid #2d3936;
    .header-right {
      margin-right: 15%;
      .login-btn {
        background-color: ${({ theme }) => theme.color.transparent};
        background-image: url(${LOGIN_BTN_OUTLINE});
        background-repeat: no-repeat;
        background-size: contain;
        border: none;

        width: 118px;
        height: 34px;
        position: relative;

        text-decoration: none;

        span {
          font-size: 16px;
        }

        img {
          width: 21px;
          height: 12px;
          object-fit: contain;

          bottom: -6px;
          right: 22px;
        }
      }
    }
  }
  .maintenace {
    height: 100vh;
    margin-top: 64px;
    .title {
      text-decoration: none;
      color: #8d8d8d;
      font-size: 32px;
      line-height: 26px;
    }

    .watting-transaction {
      font-size: 16px;
    }

    .content {
      font-size: 16px;
    }
  }
`

export default StyledMaintenace

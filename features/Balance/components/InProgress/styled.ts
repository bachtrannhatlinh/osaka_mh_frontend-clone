import styled from 'styled-components'

const StyledInProgressBalance = styled.div`
  background-color: #121520;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 40px 100%, 0 calc(100% - 40px));
  min-height: 500px;
  min-width: 700px;
  text-align: center;
  position: relative;
  padding: 5px;
  .balance {
    margin-top: 64px;
    .title {
      text-decoration: none;
      color: #8d8d8d;
      font-size: 32px;
      line-height: 26px;
    }

    .loading {
      background: #121520;
      padding: 50px;
    }

    ul {
      position: absolute;
      top: 25%;
      left: 50%;
      transform: translate(-50%, 50%);
      margin: 0;
      padding: 0;
      display: flex;
    }

    ul li {
      list-style: none;
      width: 40px;
      height: 40px;
      background: #fff;
      border-radius: 50%;
      animation: animate 1.6s ease-in-out infinite;
      margin: 0 10px;
    }

    @keyframes animate {
      0%,
      40%,
      100% {
        transform: scale(0.2);
      }
      20% {
        transform: scale(1);
      }
    }

    ul li:nth-child(1) {
      animation-delay: -1.4s;
      background: #ffff00;
      box-shadow: 0 0 50px #ffff00;
    }

    ul li:nth-child(2) {
      animation-delay: -1.2s;
      background: #F06292;
      box-shadow: 0 0 50px #76FF03;
    }

    ul li:nth-child(3) {
      animation-delay: -1s;
      background: #F06292;
      box-shadow: 0 0 50px #F06292;
    }

    ul li:nth-child(4) {
      animation-delay: 0.8s;
      background: #4FC3F7;
      box-shadow: 0 0 50px #4FC3F7;
    }

    ul li:nth-child(5) {
      animation-delay: 0.6s;
      background: #BA68C8;
      box-shadow: 0 0 50px #BA68C8;
    }

    ul li:nth-child(6) {
      animation-delay: 0.4s;
      background: #F57C00;
      box-shadow: 0 0 50px #F57C00;
    }

    ul li:nth-child(7) {
      animation-delay: 0.2s;
      background: #673AB7;
      box-shadow: 0 0 50px #673AB7;
    }


    .watting-transaction {
      font-size: 20px;
    }

    .content {
      font-size: 20px;
      margin-top: 10px;
    }
  }
`

export default StyledInProgressBalance

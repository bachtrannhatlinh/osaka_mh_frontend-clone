import styled from 'styled-components'

const MailBoxStyled = styled.div`
  background-color: #191d2c;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 40px 100%, 0 calc(100% - 40px));
  min-width: 700px;
  padding: 5px;
  .close-btn {
    top: 10px;
    right: 10px;
    background-color: ${({ theme }) => theme.color.transparent};
    border: none;
    z-index: 1;
  }

  .content-left {
    width: 30%;
    ul {
      cursor: pointer;
    }

    ul li {
      margin-top: 5px;
      list-style: none;
      padding: 10px;
      width: 100%;
      background: #296b9d;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      transition: transform 0.5s;
      color: white;
      border-radius: 10px;
      text-align: center;
    }
    ul li span {
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: #25bcff;
      color: #fff;
      display: inline-block;
      border-radius: 50%;
      margin-right: 40px;
      font-size: 16px;
      font-weight: bold;
    }

    ul:hover li {
      opacity: 0.2;
    }
    ul li:hover {
      transform: scale(1.1);
      z-index: 10;
      background: #25bcff;
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
      color: #fff;
      opacity: 1;
    }
    ul li:hover span {
      background: #fff;
      color: #25bcff;
    }
  }

  .content-right {
    width: 70%;
    max-height: 450px;
    overflow-y: scroll;
    padding-right: 1px;
  }
`

export default MailBoxStyled

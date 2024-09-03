import styled from 'styled-components'

const StyledMobile = styled.div`
  background-color: #121520;
  // clip-path: polygon(0 0, 100% 0, 100% 100%, 40px 100%, 0 calc(100% - 40px));
  height: 100vh;
  text-align: center;
  position: relative;
  padding: 5px;
  .header {
    padding: 20px 100px;
    border-bottom: 1px solid #2d3936;
  }
  .mobile {
    height: 100vh;
    margin-top: 64px;
    .title {
      text-decoration: none;
      font-size: 20px;
      line-height: 26px;
    }
    .title-404 {
      font-size: 30px;
    }
    .watting-transaction {
      font-size: 16px;
    }

    .btn-back {
      font-size: 24px;
      padding-top: 20px;
      a {
        text-decoration: none;
      }
      .btn-download {
        border-radius: 4px;
        padding: 4px;
        color: #000000;
        background: #adb5bd;
      }
    }

    .content {
      font-size: 16px;
    }
  }
`

export default StyledMobile

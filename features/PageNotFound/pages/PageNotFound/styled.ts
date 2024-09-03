import styled from 'styled-components'

const StyledPageNotFound = styled.div`
  background-color: #121520;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 40px 100%, 0 calc(100% - 40px));
  min-height: 500px;
  min-width: 700px;
  text-align: center;
  position: relative;
  padding: 5px;
  .header {
    padding: 20px 100px;
    border-bottom: 1px solid #2d3936;
  }
  .page-not-found {
    height: 100vh;
    margin-top: 64px;
    .title {
      text-decoration: none;
      font-size: 32px;
      line-height: 26px;
    }
    .title-404 {
      font-size: 120px;
    }
    .watting-transaction {
      font-size: 16px;
    }

    .btn-back {
      font-size: 24px;
      padding-top: 20px;
    }

    .content {
      font-size: 16px;
    }
  }
`

export default StyledPageNotFound

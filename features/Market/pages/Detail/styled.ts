import styled from 'styled-components'

const HorseModalAvailableStyled = styled.div`
  position: relative;
  .horse-detail-container {
    width: 100%;
    height: 100%;
    min-height: 500px;
    gap: 12px;
    display: grid;
    grid-template-columns: auto auto auto;
    ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
      row-gap: 40px;
    }
    .quick-view-left {
      /* background: rgba(4, 9, 24, 0.7); */
      width: 300px;
      display: flex;
      align-items: center;
      padding: 10px;
    }

    .quick-view-center {
      width: auto;
      padding: 16px 10px;
    }

    .quick-view-right {
      width: 300px;
      padding-top: 10px;
      .right-bottom {
        position: absolute;
        bottom: 0px;
        right: 0px;
      }
    }
  }
  .btn-bottom {
    gap: 20px;
    display: flex;
    padding-top: 50px;
    justify-content: space-around;
  }
`
export default HorseModalAvailableStyled

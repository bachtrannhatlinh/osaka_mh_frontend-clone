import styled from 'styled-components'

const ModalCommon = styled.div`
  position: relative;
  max-width: 1300px;
  .close-btn {
    top: 10px;
    right: 50px;
    background-color: ${({ theme }) => theme.color.transparent};
    border: none;
    z-index: 1;
  }
  .quick-view {
    background-color: ${({ theme }) => theme.color.neutral};
    margin: 0 16px;
    padding: 40px 0;
    max-height: 700px;
    .container {
      width: 100%;
      height: 100%;
      .quick-view-box {
        width: 100%;
        height: 100%;
        ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
          padding: 20px;
        }
        position: relative;
        padding: 20px;
        .quick-view-container {
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
            width: 550px;
          }
          .quick-view-right {
            /* background: rgba(4, 9, 24, 0.7); */
            width: 320px;
            padding: 0px 10px 0px 10px;
            position: relative;
          }
          .btn-bottom {
            gap: 20px;
            position: absolute;
            display: flex;
            bottom: 0;
            right: 10px;
          }
          .right-bottom {
            right: 10px;
            bottom: 0px;
            position: absolute;
          }
        }
      }
    }
  }
`

export default ModalCommon

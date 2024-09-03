import styled from 'styled-components'

const HourseModalStyle = styled.div`
  .choose-horse-modal {
    background-color: ${({ theme }) => theme.color.neutral};
    clip-path: polygon(0 0, 100% 0, 100% 100%, 40px 100%, 0 calc(100% - 40px));
    padding: 32px;
    position: relative;
    .close-btn {
      top: 15px;
      right: 15px;
      background-color: ${({ theme }) => theme.color.transparent};
      border: none;
      z-index: 1;
    }

    .race-name-container {
      position: absolute;
      left: 25px;
      top: 15px;
      .race-name {
        font-size: 24px;
        line-height: 20px;
        margin-bottom: 28px;
        span{
          margin-bottom: 4px;
        }
      }
    }

    .confirm-horse {
      margin-top: 50px;
      &-btns {
        margin-top: 26px;
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
        margin-bottom: 50px;
      }
    }
  }
`

export default HourseModalStyle

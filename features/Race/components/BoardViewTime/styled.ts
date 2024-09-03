import styled from 'styled-components'
import { BOARD_VIEW_TIME } from 'assets/images'

const BoardViewTimeStyled = styled.div`
  .board-view-time {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url(${BOARD_VIEW_TIME});
    ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
      background-image: none;
    }
    width: 100%;
    height: 170px;
    ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
      left: -30px;
    }
    background-repeat: no-repeat;
    background-position: center;
    .time-remains {
      position: absolute;
      color: #a2a3a9;
      left: 46%;
      line-height: 20px;
      font-size: 18px;
      top: 8px;
      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        left: 33%;
      }
      ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
        left: 18%;
      }
    }

    .display-time {
      color: ${({ theme }) => theme.color.white};
      line-height: 48px;
      font-size: 40px;
      display: flex;
    }

    .hour-min-sec {
      color: #484b54;
      line-height: 14.4px;
      font-size: 12px;
      display: flex;
      span {
        margin-left: 25px;
        margin-right: 25px;
      }
    }

    .finished-race {
      font-size: 40px;
      line-height: 48px;
      color: ${({ theme }) => theme.color.white};
    }

    .processing-race {
      font-size: 40px;
      line-height: 48px;
      color: ${({ theme }) => theme.color.white};
    }

    .orange-line-lean {
      display: flex;
      .orange-line-lean-left {
        display: flex;
        margin-top: 10px;
      }

      .orange-line-lean-right {
        display: flex;
        margin-top: 10px;
      }

      .polygon {
        padding-left: 20.94px;
        padding-right: 20.94px;
        margin-top: 5px;
      }
    }
  }
`
export default BoardViewTimeStyled

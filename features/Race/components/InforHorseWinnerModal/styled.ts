import { BACKGROUND_WINNER, TOP_HORSE_GOLD_CIRCLE } from 'assets/images'
import styled from 'styled-components'

const InforHorseWinnerModalStyled = styled.div`
  .winner-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .winner-background {
      background-image: url(${BACKGROUND_WINNER});
      background-repeat: no-repeat;
      background-size: contain;
      width: 700px;

      .winner-top {
        z-index: 1;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        position: relative;
        top: -100px;
        .first-winner {
          z-index: 1;
          height: 125px;
        }
        .avatar-horse {
          background-image: url(${TOP_HORSE_GOLD_CIRCLE});
          background-repeat: no-repeat;
          background-size: contain;
          width: 160px;
          height: 160px;
          margin-bottom: 10px;
          .avatar {
            z-index: 1;
            width: 85%;
            height: 85%;
            margin: 13px 0 0 13px;
            border-radius: 50%;
          }
        }
      }
      .infor-horse {
        z-index: 1;
        display: flex;
        color: white;

        width: 100%;
        justify-content: space-between;
        padding: 30px;
        position: relative;
        top: -100px;
        .title {
          font-size: 16px;
          color: #b3b3b3;
          text-transform: uppercase;
        }
        .content {
          font-size: 20px;
          .e-prz {
            color: #5d9f48;
          }
          .free-e-prz {
            color: #faa34f;
          }
        }

        .infor-horse-exp {
          color: rgba(255, 245, 102, 1);
        }

        .infor-horse-price {
          color: rgba(78, 240, 118, 1);
        }
      }
    }
  }
`

export default InforHorseWinnerModalStyled

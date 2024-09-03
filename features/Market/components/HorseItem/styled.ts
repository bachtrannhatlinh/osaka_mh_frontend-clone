import { HORSE_AVATAR_BG, OPEN_RACE_TOP_FRAME } from 'assets/images'
import styled from 'styled-components'

const HorseItemStyled = styled.div`
  .no-data {
    font-weight: 800;
    background-color: #191d2c;
    padding: 20px;
    color: #ed842a;
    text-align: center;
  }
  .market-container {
    display: grid;
    gap: 25px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

    .btn-detail-container {
      position: absolute;
      top: 45%;
      left: 25%;
      display: none;
      clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0% calc(100% - 14px));
      background: linear-gradient(90deg, #4ef07621 0%, #48f7ba17 100%);

      padding: 1px;
      width: 103px;
      height: 34px;
      aspect-ratio: 100 / 42;

      .btn-detail {
        clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0% calc(100% - 14px));
        border: none;
        background: linear-gradient(
          178.19deg,
          rgba(78, 240, 118, 0.5) 1.64%,
          rgba(72, 247, 186, 0) 47.93%,
          rgba(78, 240, 118, 0.5) 97.84%
        );
        font-size: 16px;
        line-height: 20px;
        width: 100%;
        height: 100%;
      }
    }
    .horse-item:hover + .btn-detail-container,
    .btn-detail-container:hover {
      display: block;
    }
  }

  .top {
    padding: 4px;
    .top-frame {
      top: -1px;
      left: 0px;

      background-image: url(${OPEN_RACE_TOP_FRAME});
      background-size: 100%;
      background-repeat: no-repeat;
      width: 100%;
      height: 30px;

      ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
        height: 50px;
      }
    }
  }

  .horse-item {
    border-right: 2px solid #0d401ab5;
    border-left: 2px solid #56b56ebf;
    border-bottom: 2px solid #226634;
    position: relative;
    width: 100%;
    height: 254px;
    color: white;
    .header {
      display: flex;
      justify-content: space-between;
      margin: 12px;
      .horse-name {
        font-size: 18px;
        line-height: 16px;
        .icon-gender {
          margin-left: 8px;
          width: 16px;
          margin-top: -4px;
        }
      }
    }
    .horse-lending {
      font-size: 16px;
      color: #bd9f36;
    }
    .horse-type {
      font-size: 16px;
      color: #bd9f36;
      margin-top: -6px;
    }
    .background-container {
      .background {
        background-image: url(${HORSE_AVATAR_BG});
        background-repeat: no-repeat;
        background-position: center;
        background-size: 130px;
        position: absolute;
        top: 12%;

        .avatar {
          width: 200px;
          aspect-ratio: 300 / 300;
          object-fit: contain;
          object-position: center;

          ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
            width: 100%;
          }
        }
      }
    }
    .bottom-item {
      bottom: 0px;
      position: absolute;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      width: 100%;
      .price-lending {
        color: #5e7bea;
        font-size: 20px;
      }
    }
  }
  .view-more-container {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 16px;
    height: 80px;

    .btn-view-more {
      background: linear-gradient(
        178.19deg,
        rgb(240 241 240 / 82%) 1.64%,
        rgb(235 245 241 / 48%) 47.93%,
        rgb(251 251 251 / 63%) 97.84%
      );
      border-radius: 4px;
      height: 100%;
      width: 250px;
      font-size: 16px;
      &-text {
        margin: 16px;
        color: white;
      }
    }
    .btn-view-more:hover {
      background: linear-gradient(
        178.19deg,
        rgb(120 229 147 / 82%) 1.64%,
        rgb(52 255 184 / 48%) 47.93%,
        rgb(78 240 118 / 63%) 97.84%
      );
    }
    .btn-view-more:after {
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #f9fafb;
      content: '';
      position: relative;
      right: -5px;
      top: 11px;
    }
  }
`

export default HorseItemStyled

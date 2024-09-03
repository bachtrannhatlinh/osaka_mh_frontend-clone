import { OPEN_RACE_BTN_BORDER, OPEN_RACE_FRAME, OPEN_RACE_TOP_FRAME, SLOT_FRAME } from 'assets/images'
import styled from 'styled-components'

const enterBtnDimensionRatio = 3.235

const OpenRaceStyled = styled.div`
  .open-race {
    background-image: url(${OPEN_RACE_FRAME});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center auto;
    position: relative;

    width: fit-content;
    height: 326px;

    ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
      width: 270px;
      margin: auto;
    }

    ${({ theme }) => theme.media.lessThan(theme.size.md)} {
      width: 100%;
    }

    ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
      height: 420px;
      width: 350px;
    }

    .top {
      padding: 4px;
      height: 150px;

      .top-frame {
        top: -6px;
        left: 0;

        background-image: url(${OPEN_RACE_TOP_FRAME});
        background-size: contain;
        background-repeat: no-repeat;
        width: 100%;
        height: 30px;

        ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
          height: 50px;
        }
      }

      .classtag {
        position: absolute;
        top: 18px;
        left: 5px;
      }

      img {
        border-top-left-radius: 50px 20px;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .slot {
        background-image: url(${SLOT_FRAME});
        background-repeat: no-repeat;
        width: 50px;
        height: 50px;
        top: 10px;
        right: 10px;
        font-size: 13px;

        span {
        }
      }
    }

    .bottom {
      padding: 24px;
      padding-top: 12px;

      ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
        padding: 16px;
        padding-top: 8px;
      }

      .city {
        font-size: 18px;
        line-height: 17px;

        ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
          font-size: 12px;
          line-height: 15px;
        }

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          font-size: 18px;
          line-height: 17px;
        }

        ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
          font-size: 18px;
          line-height: 20px;
        }
      }

      .name {
        font-size: 18px;
        line-height: 17px;

        ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
          font-size: 16px;
          line-height: 18px;
          margin-bottom: 12px;
        }

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          font-size: 20px;
          line-height: 22px;
          margin-bottom: 28px;
        }

        ${({ theme }) => theme.media.lessThan(theme.size.md)} {
          margin-bottom: 18px;
        }

        ${({ theme }) => theme.media.lessThan(theme.size.md)} {
          font-size: 24px;
          line-height: 26px;
          margin-bottom: 30px;
        }
        .race-name {
          white-space: nowrap;
          width: 225px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .action {
        .price {
          font-size: 18px;
          line-height: 20px;

          ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
            font-size: 16px;
            line-height: 18px;
          }

          ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
            font-size: 18px;
            line-height: 20px;
          }

          ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
            font-size: 20px;
            line-height: 22px;
          }

          img {
            width: 25px;
            height: 25px;
            margin-top: -3px;
            margin-left: 3px;
          }
        }

        .enter-btn {
          background-color: ${({ theme }) => theme.color.transparent};
          background-image: url(${OPEN_RACE_BTN_BORDER});
          background-repeat: no-repeat;
          background-size: contain;
          border: none;

          width: 110px;
          height: calc(110px / ${enterBtnDimensionRatio});

          font-size: 16px;
          text-decoration: none;

          &:hover {
            color: ${({ theme }) => theme.color.secondary};
          }

          ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
            width: 90px;
            height: calc(90px / ${enterBtnDimensionRatio});

            font-size: 12px;
          }

          ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
            width: 110px;
            height: calc(110px / ${enterBtnDimensionRatio});

            font-size: 16px;
          }

          ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
            width: 140px;
            height: calc(140px / ${enterBtnDimensionRatio});
          }
        }
      }
    }
  }
`

export default OpenRaceStyled

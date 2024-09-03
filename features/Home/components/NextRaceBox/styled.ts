import { NEXT_RACE_BORDER } from 'assets/images'
import styled from 'styled-components'

const nextRaceDimensionRatio = 3.078

const NextRaceStyled = styled.div`
  width: 277px;
  height: calc(277px / ${nextRaceDimensionRatio});
  padding: 8px;
  padding-right: 6px;
  position: relative;

  background-image: url(${NEXT_RACE_BORDER});
  background-repeat: no-repeat;
  background-size: contain;

  ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
    width: 300px;
    height: calc(300px / ${nextRaceDimensionRatio});
  }

  ${({ theme }) => theme.media.lessThan(theme.size.md)} {
    width: 250px;
    height: calc(250px / ${nextRaceDimensionRatio});
  }

  ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
    width: 100%;
    height: 114px;
    padding: 28px;
  }

  .next-race {
    text-decoration: none;
    &-tag {
      .tag {
        left: 50%;
      }
    }
    .left {
      padding-top: 8px;
      padding-left: 5px;
      .city {
        font-size: 12px;
        line-height: 14.4px;
      }
      .next-race-tag {
        height: 24px;
        .tag {
          left: 35%;
          font-size: 13px;
        }
      }
      .race-name {
        font-size: 16px;
        line-height: 19.2px;
        margin-bottom: 4px;
        max-width: 170px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .price {
        font-size: 16px;
        line-height: 19.2px;

        img {
          width: 15px;
          height: 15px;
          margin-top: -3px;
          margin-left: 3px;
        }
      }

      .text {
        margin-left: 10px;
        margin-top: -5px;
        span {
          margin-top: 2px;
        }
      }
    }

    .center {
      .text {
        font-size: 13px;
      }
    }

    .right {
      .thumbnail {
        width: 130px;
        height: 70px;
        object-fit: fill;
      }
    }
  }

  .bottom-frame {
    bottom: -8px;
    right: 0;

    ${({ theme }) => theme.media.lessThan(theme.size.md)} {
      width: 100%;
    }
  }
`

export default NextRaceStyled

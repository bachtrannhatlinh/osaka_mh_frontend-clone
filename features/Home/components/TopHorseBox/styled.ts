import { TOP_HORSE_BG, TOP_HORSE_BORDER_BRONZE, TOP_HORSE_BORDER_SLIVER } from 'assets/images'
import styled from 'styled-components'

enum Rank {
  FIRST = '1st',
  SECOND = '2nd',
  THIRD = '3rd'
}

type Position = '1st' | '2nd' | '3rd'

interface TopHorseBoxStyledProps {
  circle: string
  position: Position
}

const avatarContainerDimension = {
  default: 120,
  lg: 90,
  md: 60,
  xl: 160
}
const avatarDimension = {
  default: 110,
  lg: 80,
  md: 50
}

const TopHorseBoxStyled = styled.div<TopHorseBoxStyledProps>`
  .top-horse {
    background-image: url(${({ position }) =>
      (position === Rank.FIRST && TOP_HORSE_BG) ||
      (position === Rank.SECOND && TOP_HORSE_BORDER_SLIVER) ||
      (position === Rank.THIRD && TOP_HORSE_BORDER_BRONZE)});
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: contain;
    cursor: pointer;
    width: 270px;
    margin-top: ${({ position }) => (position === Rank.SECOND || position === Rank.THIRD) && '41px'};

    ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
      width: 100%;
    }

    .left-stick {
      top: 24px;
      right: 100%;
    }
    .right-stick {
      top: 24px;
      left: 100%;
    }
    .first-left-frame {
      right: calc(100% + 6px);
      bottom: 8px;
      display: none;
      display: ${({ position }) => position === Rank.FIRST && 'block'};

      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        display: none;
      }
    }
    .first-right-frame {
      left: calc(100% + 6px);
      bottom: 8px;
      display: none;
      display: ${({ position }) => position === Rank.FIRST && 'block'};
      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        display: none;
      }
    }
    .second-left-frame {
      right: 100%;
      bottom: 8px;
      display: none;
      display: ${({ position }) => position === Rank.SECOND && 'block'};
      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        display: none;
      }
    }
    .second-right-frame {
      left: 100%;
      bottom: 8px;
      display: none;
      display: ${({ position }) => position === Rank.SECOND && 'block'};
      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        display: none;
      }
    }

    .avatar-container {
      background-image: url(${({ circle }) => circle});
      background-repeat: no-repeat;
      background-size: contain;

      width: ${({ position }) =>
        position === Rank.FIRST ? `${avatarContainerDimension.xl}px` : `${avatarContainerDimension.default}px`};
      height: ${({ position }) =>
        position === Rank.FIRST ? `${avatarContainerDimension.xl}px` : `${avatarContainerDimension.default}px`};
      margin-bottom: 10px;

      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        width: ${avatarContainerDimension.lg}px;
        height: ${avatarContainerDimension.lg}px;
        margin-bottom: 18px;
      }

      ${({ theme }) => theme.media.lessThan(theme.size.md)} {
        width: ${avatarContainerDimension.md}px;
        height: ${avatarContainerDimension.md}px;
      }

      .avatar {
        width: ${avatarDimension.default}px;
        height: ${avatarDimension.default}px;
        object-fit: contain;
        border-radius: 50%;

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          width: ${avatarDimension.lg}px;
          height: ${avatarDimension.lg}px;
        }

        ${({ theme }) => theme.media.lessThan(theme.size.md)} {
          width: ${avatarDimension.md}px;
          height: ${avatarDimension.md}px;
        }
      }
    }

    .rank-container {
      .crown {
        margin-bottom: 6px;

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          width: 28px;
        }
      }

      .rank {
        font-size: 16px;
        line-height: 19px;

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          font-size: 14px;
        }
      }
    }

    .info-container {
      margin: 3px 0;
      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        margin-bottom: 20px;
      }

      .horse-name {
        font-size: 16px;
        line-height: 28px;
        white-space: nowrap;
        width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          font-size: 20px;
          line-height: 24px;
        }
      }

      .owner-name {
        font-size: 16px;
        line-height: 19px;

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          font-size: 12px;
          line-height: 15px;
        }
      }
    }

    .achievement-container {
      column-gap: 40px;
      margin-bottom: 20px;

      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        column-gap: 18px;
        margin-bottom: 20px;
      }

      .achievement {
        .title {
          column-gap: 4px;

          span {
            ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
              font-size: 14px;
            }
          }

          img {
            ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
              width: 16px;
            }
          }

          .img-achievement {
            margin-top: 5px;
          }
        }

        .times {
          font-size: 24px;
          line-height: 28px;

          ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
            font-size: 18px;
            line-height: 22px;
          }
        }

        .total-races {
          margin-top: 6px;
        }
      }
    }
  }
`

export default TopHorseBoxStyled

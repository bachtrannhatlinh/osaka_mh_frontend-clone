import styled from 'styled-components'

enum Rank {
  FIRST = '1st',
  SECOND = '2nd',
  THIRD = '3rd'
}

type Position = '1st' | '2nd' | '3rd'

interface TopUsesBoxStyledProps {
  position: Position
  topFrame: string
  boderFrame: string
  boderAvt: string
}

const avatarDimension = {
  default: 112,
  lg: 90,
  md: 50,
  sm: 90
}

const topStableDimension = {
  default: 270,
  xl: '100%',
  sm: 230
}

const TopStableBoxStyled = styled.div<TopUsesBoxStyledProps>`
  .top-stable {
    background-image: url(${({ boderFrame }) => boderFrame});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    cursor: pointer;
    // margin-top: ${({ position }) => (position === Rank.SECOND || position === Rank.THIRD) && '77px'};

    width: ${topStableDimension.default}px;
    padding: 70px 0px 0px;

    ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
      width: ${topStableDimension.xl};
      padding-bottom: 16px;
    }

    ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
      background-position: top;

      padding: 18px 0;
    }

    ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
      width: ${topStableDimension.sm}px;
      padding: 30px 0;
    }

    .top-frame {
      background-image: url(${({ topFrame }) => topFrame});
      background-size: contain;
      background-repeat: no-repeat;

      height: 15px;

      top: 22px;
      right: 0px;
    }

    .medal {
      top: 40px;
      right: 10px;

      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        width: 28px;
      }

      ${({ theme }) => theme.media.lessThan(theme.size.md)} {
        width: 18px;
        top: 10px;
      }

      ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
        width: 24px;
        top: 14px;
        right: 14px;
      }
    }

    .avatar-container {
      margin-bottom: 16px;
      width: 127px;
      aspect-ratio: 1 / 1;
      background-image: url(${({ boderAvt }) => boderAvt});
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;

      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        margin-bottom: 12px;
        background-image: none;
        width: auto;
      }

      .avatar {
        width: ${avatarDimension.default}px;
        aspect-ratio: 1 / 1;
        border-radius: 150px;

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          width: ${avatarDimension.lg}px;
        }

        ${({ theme }) => theme.media.lessThan(theme.size.md)} {
          width: ${avatarDimension.md}px;
        }

        ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
          width: ${avatarDimension.sm}px;
        }
      }
    }

    .name {
      font-size: 16px;
      line-height: 28px;

      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        font-size: 20px;
        line-height: 24px;
        margin-bottom: 20px;
      }
    }

    .achievement-container {
      column-gap: 50px;
      margin-bottom: 40px;

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

        .total-uses {
          margin-top: 6px;
        }
      }
    }
  }
`

export default TopStableBoxStyled

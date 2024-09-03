import { GRADIENT_TITLE, JOIN_NOW_BG, JOIN_NOW_BLOCK, JOIN_NOW_BTN_BG, OPEN_RACE_BG } from 'assets/images'
import styled from 'styled-components'

const streamTitleDimensionRatio = 3.84

const StyledHome = styled.div`
  .view-btn {
    text-decoration: none;

    span {
      font-size: 14px;
    }

    img {
      width: 11px;
      height: 8px;
      object-fit: contain;
      margin-left: 4px;
    }
  }

  .top-section {
    padding-top: 20px;
    column-gap: 20px;
    margin-bottom: 120px;

    ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
      row-gap: 80px;
      margin-bottom: 80px;
    }

    .top-left {
      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        width: 100%;
      }

      .banner {
        margin-bottom: 30px;

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          margin-bottom: 20px;
        }

        .logo-banner {
          ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
            width: 610px;
          }

          ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
            width: 100%;
          }
        }

        .stream-title {
          background-image: url(${GRADIENT_TITLE});
          background-size: contain;
          background-repeat: no-repeat;
          bottom: 0px;
          left: 0;

          width: 170px;
          height: calc(190px / ${streamTitleDimensionRatio});

          text-transform: uppercase;
          font-size: 18px;

          ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
            width: 170px;
            height: calc(220px / ${streamTitleDimensionRatio});

            font-size: 18px;
          }

          ${({ theme }) => theme.media.lessThan(theme.size.md)} {
            width: 180px;
            height: calc(180px / ${streamTitleDimensionRatio});

            font-size: 16px;
          }

          ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
            width: 130px;
            height: calc(130px / ${streamTitleDimensionRatio});

            font-size: 12px;
          }

          span {
            top: 12px;
            left: 26px;

            ${({ theme }) => theme.media.lessThan(theme.size.md)} {
              top: 9px;
            }

            ${({ theme }) => theme.media.lessThan(theme.size.md)} {
              top: 7px;
              left: 18px;
            }
          }
        }

        .banner-meta {
          .icon-meta {
            opacity: 0.4;
          }
          .icon-horse {
            margin-left: -30px;
            opacity: 0.4;
          }
          .active {
            opacity: 1;
            filter: brightness(5);
          }
        }
      }

      .video-container {
        .video {
          .youtube-video {
            width: 100%;
            aspect-ratio: 867 / 554;
          }
        }
      }
    }

    .top-right {
      position: relative;
      bottom: 12px;

      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        position: static;
        bottom: auto;
        width: 100%;
      }

      .head {
        .title {
          font-size: 24px;
          line-height: 20px;
        }
      }

      .content {
        min-height: 545px;
        min-width: 277px;

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          row-gap: 36px;

          width: 100%;
          min-height: auto;
          min-width: auto;
        }

        .race-item {
          margin-bottom: 24px;

          ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
            margin-bottom: 0;
          }

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }

  .bg-fluid {
    background-image: url(${OPEN_RACE_BG});
    background-repeat: no-repeat;
    background-size: contain;
    background-position-y: 310px;

    ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
      background-position-y: 92%;
    }

    ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
      background-image: none;
    }

    .open-race-section {
      margin-bottom: 170px;

      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        margin-bottom: 80px;
      }

      .head {
        margin-bottom: 40px;

        ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
          margin-bottom: 14px;
        }

        .title {
          font-size: 36px;
          line-height: 26px;

          ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
            font-size: 24px;
            line-height: 20px;
          }
        }
      }

      .content {
        margin-bottom: 50px;
        min-height: 326px;

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          row-gap: 24px;
        }
      }

      .class-category {
        column-gap: 10px;

        .arrow-left {
          cursor: pointer;
        }

        .arrow-right {
          cursor: pointer;
        }

        .category-content {
          column-gap: 12px;

          ${({ theme }) => theme.media.lessThan(theme.size.md)} {
            flex-wrap: wrap;
            row-gap: 12px;
          }
        }
      }
    }
  }

  .join-now-fluid-bg {
    background-image: url(${JOIN_NOW_BG});
    margin-bottom: 120px;

    ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
      margin-bottom: 80px;
    }

    .container {
      padding: 60px 0;

      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        padding: 40px 0;
      }

      .join-now {
        background-image: url(${JOIN_NOW_BLOCK});
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;

        padding: 60px 230px;

        ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
          padding: 20px 140px;
        }

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          background-size: cover;
        }

        .content {
          .title {
            text-transform: uppercase;
            font-size: 44px;
            line-height: 52.8px;

            margin-bottom: 20px;

            ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
              font-size: 34px;
              margin-bottom: 6px;
            }

            ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
              font-size: 28px;
              line-height: 30px;
            }

            ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
              margin-bottom: 14px;
            }
          }

          .input-name {
            border: none;
            border-bottom: 1px solid ${({ theme }) => theme.color.white};
            background-color: ${({ theme }) => theme.color.transparent};

            font-size: 16px;
            line-height: 19.2px;

            width: 386px;
            margin-bottom: 28px;

            &:focus {
              outline: none;
            }

            ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
              width: 280px;
            }
          }

          .join-now-btn {
            background-color: ${({ theme }) => theme.color.transparent};
            border: none;
            background-image: url(${JOIN_NOW_BTN_BG});
            background-size: contain;
            background-repeat: no-repeat;

            margin-top: 20px;
            font-size: 24px;
            line-height: 28px;

            width: 172px;
            height: 50px;

            ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
              font-size: 20px;

              width: 150px;
              height: 44px;
            }

            ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
              font-size: 16px;

              width: 110px;
              height: 32px;
            }

            img {
              bottom: -1px;
              right: 23px;

              width: 21px;
              height: 6px;
              object-fit: contain;

              ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
                right: 19px;
              }

              ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
                right: 14px;

                width: 16px;
                height: 5px;
              }
            }
          }
        }

        .horse-place {
          .horse {
            bottom: 53px;
            right: 105px;

            width: 443px;
            height: 332px;
            object-fit: contain;

            ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
              bottom: 10px;
              width: 40%;
            }
          }

          .shadow {
            bottom: 46px;
            right: 20px;

            ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
              bottom: 22px;
              width: 40%;
            }
          }
        }
      }
    }
  }

  .top-horse-section {
    margin-bottom: 120px;

    ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
      margin-bottom: 80px;
    }

    .top-horse {
      .top-horse-title {
        font-size: 36px;
        line-height: 26px;

        margin-bottom: 60px;

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          font-size: 24px;
          margin-bottom: 30px;
        }
      }

      .content {
        ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
          row-gap: 46px;
        }
      }
    }
  }

  .top-stable-section {
    margin-bottom: 104px;

    ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
      margin-bottom: 80px;
    }

    .top-stable {
      .top-stable-title {
        font-size: 36px;
        line-height: 26px;

        margin-bottom: 30px;

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          font-size: 24px;
          margin-bottom: 30px;
        }
      }

      .content {
        ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
          row-gap: 46px;
        }
      }
    }
  }
`

export default StyledHome

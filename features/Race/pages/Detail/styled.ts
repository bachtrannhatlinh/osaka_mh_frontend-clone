import styled from 'styled-components'

const SchedulingLiveStyled = styled.div`
  .open-detail {
    padding-bottom: 16px;
    .btn-back {
      cursor: pointer;
      font-size: 16px;
      color: ${({ theme }) => theme.color.white};
      .img-text-btn {
        text-decoration: none;
        color: ${({ theme }) => theme.color.white};
      }
    }

    .line-grey {
      padding-top: 8px;
      border-bottom: 1px solid #2d3936;
      z-index: 1;
    }

    .container {
      .name-container {
        padding-top: 8px;
        margin-bottom: 10px;

        .name,
        .time-race {
          font-size: 16px;
          line-height: 20px;
        }
        .time-race {
          margin: 0px;
        }
      }

      .race-info-container {
        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          gap: 16px;
        }

        .info-left {
          ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
            padding-bottom: 10px;
          }

          ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
            overflow-x: scroll;
          }

          .left {
            gap: 28px;

            ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
              width: max-content;
            }

            .info-left-item {
              gap: 12px;

              .title {
                font-size: 14px;
                line-height: 14px;
                color: #ccc;
              }

              .value {
                font-size: 16px;
                line-height: 19px;
              }
            }
          }

          .time-race {
            font-size: 20px;
            line-height: 20px;
            margin: 0px;
          }
        }

        .title {
          color: #ccc;
          font-size: 14px;
        }
        .info-right {
          gap: 40px;
          .info-right-item {
            .title {
              font-size: 14px;
              line-height: 14px;
              margin-bottom: 12px;
              color: #ccc;
            }

            .value {
              font-size: 16px;
              line-height: 19px;

              img {
                width: 15px;
                height: 15px;
                margin-top: -3px;
                margin-left: 3px;
              }

              .game-token-e-prz {
                width: 10px;
                height: 20px;
                margin-top: -3px;
              }
            }
          }
        }

        .replay-btn-container {
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0% calc(100% - 14px));
          background: ${({ theme }) => theme.color.primary};

          padding: 1px;
          width: 112px;
          aspect-ratio: 146 / 42;
          margin: 6px 0px;

          .replay-btn {
            clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0% calc(100% - 14px));
            border: none;
            background-color: ${({ theme }) => theme.color.black};

            font-size: 16px;
            line-height: 20px;
          }
        }
      }
    }

    .table-container {
      margin-top: 40px;
    }

    .prize-border {
      left: 0;
      top: -6px;
      width: 65px;
      height: 8px;
    }
    .career-horse {
      color: #fff566 !important;
    }
    .horse-gender {
      width: 15px;
      margin-top: -3px;
    }
  }
`

export default SchedulingLiveStyled

import { HORSE_AVATAR_BG, LEVEL_FRAME } from 'assets/images'
import styled from 'styled-components'

const HorseDetailStyled = styled.div`
  .horse-detail {
    padding: 44px 0;
    .container-horse-detail {
      max-width: 1300px;
      margin-left: auto;
      margin-right: auto;
      padding: 0;

      .horse-detail-container {
        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          row-gap: 40px;
        }

        .horse-detail-left {
          padding: 0 40px;

          ${({ theme }) => theme.media.lessThan(theme.size.xxl)} {
            padding: 0 20px;
          }

          ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
            padding-left: 0;
            padding-right: 40px;
          }

          ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
            padding-right: 0;
          }

          .left {
            .name {
              ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
                font-size: 24px;
                line-height: 20px;
              }
            }

            .background-container {
              .background {
                background-image: url(${HORSE_AVATAR_BG});
                background-repeat: no-repeat;
                background-position: center;

                ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
                  background-size: cover;
                }

                .avatar {
                  width: 400px;
                  aspect-ratio: 300 / 300;
                  object-fit: contain;
                  object-position: center;

                  ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
                    width: 100%;
                  }
                }
              }
            }

            .energy-container {
              font-size: 16px;
              line-height: 20px;
              gap: 32px;

              .custom-energy {
              }
            }
          }
        }

        .horse-detail-right {
          .right {
            .name {
              font-size: 24px;
              line-height: 20px;
              margin-bottom: 24px;

              .class-tag {
                /* margin-top: -14px; */
              }
            }

            .my-avatar {
              img {
                border-radius: 50%;
              }
            }

            .attribute-container {
              margin-bottom: 34px;
            }

            .ability-container {
              margin-bottom: 50px;
            }

            .point-stats {
              position: relative;
              font-size: 20px;
              .point {
                position: absolute;
                top: 10px;
                left: 40px;
                color: #4ef076;
              }

              .using {
                position: absolute;
                right: 20px;
                top: 10px;
                color: #fff566;
              }
              margin-bottom: 50px;
            }

            .level-stats-container {
              margin-top: 80px;
              gap: 40px;

              ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
                gap: 30px;
              }

              .level-container {
                &:hover {
                  .info-dropdown {
                    display: block;
                  }

                  .energy-exp-bar {
                    display: block;
                  }

                  .energy-text-horse-detail {
                    display: block;
                    min-width: 100px;
                    text-align: right;
                  }

                  .level-up {
                    display: block;
                  }
                }

                .info-dropdown {
                  top: 71%;
                  left: 16%;
                  display: none;
                }

                .energy-exp-bar {
                  display: none;
                  top: 90%;
                  left: 17.5%;
                  width: 250px;
                }

                .energy-text-horse-detail {
                  display: none;
                  top: 87%;
                  left: 28%;
                }

                .level-up {
                  display: none;
                  top: 92%;
                  left: 17.5%;
                  width: 250px;
                  font-size: 20px;
                  span .exp {
                    color: #ff7a00;
                  }
                }

                .level-bg {
                  width: 140px;
                  aspect-ratio: 1;
                  background-image: url(${LEVEL_FRAME});
                  background-size: contain;
                  background-position: center;
                  background-repeat: no-repeat;

                  ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
                    width: 120px;
                  }

                  .pick-up-level {
                    position: absolute;
                    top: -21px;
                    right: -21px;
                    cursor: pointer;
                    .blink-me {
                      animation: blinker 3s linear infinite;
                    }

                    @keyframes blinker {
                      50% {
                        opacity: 0;
                      }
                    }
                  }

                  .level {
                    font-size: 50px;
                    line-height: 60px;

                    ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
                      font-size: 36px;
                    }
                  }

                  .level-text {
                    font-size: 32px;
                    bottom: 19px;
                    left: -8px;

                    ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
                      font-size: 24px;
                    }
                  }
                }
              }

              .stats-container {
                gap: 13px;

                ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
                  gap: 10px;
                }
              }
            }
            .btn-save {
              button {
                background-color: #121520;
                border: none;
                .class-tag {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }

      .horse-career-container {
        margin-top: 120px;

        ${({ theme }) => theme.media.lessThan(theme.size.xxl)} {
          margin-top: 100px;
        }

        ${({ theme }) => theme.media.lessThan(theme.size.md)} {
          margin-top: 80px;
        }

        .horse-career-title {
          margin-bottom: 6px;

          ${({ theme }) => theme.media.lessThan(theme.size.md)} {
            margin-bottom: 14px;
          }

          .title {
            font-size: 24px;
            line-height: 20px;
          }

          .career {
            margin-right: 104px;
          }

          .win-rates {
            margin-right: 115px;
            .win-rates-count {
              font-size: 18px;
            }
          }

          .class {
            margin-right: 87px;
          }
        }

        .infor-horse {
          padding-bottom: 57px;
          .carrer {
            display: block;
            margin-right: 102px;
            .carrer-detail {
              font-size: 18px;
              .total {
                color: #fff566;
              }
            }
          }

          .win-rates {
            display: block;
            margin-right: 105px;
          }

          .class {
            display: block;
          }
        }

        .horse-career-total {
          font-size: 14px;
          line-height: 16px;
          gap: 16px;
          margin-bottom: 30px;

          ${({ theme }) => theme.media.lessThan(theme.size.md)} {
            margin-bottom: 14px;
          }
        }

        .horse-career {
          ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
            overflow-x: scroll;
          }

          color: #d9d9d9;
          font-size: 16px;

          .header-name {
            text-align: left;
          }

          .horse-career-table {
            border-collapse: separate;
            border-spacing: 0px 12px;

            ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
              min-width: 936px;
            }
            .career-link {
              text-decoration: none;
            }
          }
        }

        .paginate {
          display: flex;
          justify-content: center;
          .pagination {
            .page-item {
              .page-link {
                z-index: 3;
                color: #fff;
                background-color: #191d2c;
                border-color: #51c21a;
                &:focus {
                  box-shadow: none;
                }
              }
            }

            .page-item.active {
              .page-link {
                z-index: 3;
                color: #fff;
                background-color: #135200;
                border-color: #135200;
                font-weight: 700;
              }
            }

            .page-item.disabled {
              cursor: not-allowed;
              .page-link {
                z-index: 3;
                color: #fff;
                background-color: #191d2c;
                border-color: #191d2c;
              }
            }

            .page-item:hover {
              .page-link {
                z-index: 3;
                color: #fff;
                background-color: #135200;
                border-color: #191d2c;
              }
            }
          }
        }
      }
    }
  }
`

export default HorseDetailStyled

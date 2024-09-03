import { HORSE_AVATAR_BG } from 'assets/images'
import styled from 'styled-components'

const HorseModalStyled = styled.div`
  position: relative;
  width: 1400px;

  .close-btn {
    top: 10px;
    right: 90px;
    background-color: ${({ theme }) => theme.color.transparent};
    border: none;
    z-index: 1;
  }

  .quick-view {
    background-color: ${({ theme }) => theme.color.neutral};
    margin: 0 80px;
    padding: 50px 0;

    .quick-view-box {
      padding: 20px;

      ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
        padding: 20px;
      }

      .quick-view-container {
        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          row-gap: 40px;
        }

        .quick-view-left {
          padding-right: 40px;

          ${({ theme }) => theme.media.lessThan(theme.size.xxl)} {
            padding-right: 20px;
          }

          ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
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
              .horse-level {
                left: 34%;
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
              .custom-energy {
                width: 80%;
              }
            }

            .detail-btn-container {
              clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0% calc(100% - 14px));
              background: ${({ theme }) => theme.color.primary};

              padding: 1px;
              width: 146px;
              aspect-ratio: 146 / 42;

              .detail-btn {
                clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0% calc(100% - 14px));
                border: none;
                background-color: ${({ theme }) => theme.color.black};

                font-size: 20px;
                line-height: 20px;
              }
            }
          }
        }

        .quick-view-right {
          .right {
            width: 700px;
            .right-title {
              .title {
                margin-right: 50px;
              }

              .level-up {
                position: relative;
                width: 75px;
                span {
                  position: absolute;
                  left: 40%;
                  top: 20%;
                  font-size: 16px;
                  text-align: center;
                }
              }
            }

            .name {
              font-size: 24px;
              line-height: 20px;
              margin-bottom: 14px;
            }

            .name-user {
              margin-bottom: 10px;
            }
          }
        }
      }
    }
  }
`

export default HorseModalStyled

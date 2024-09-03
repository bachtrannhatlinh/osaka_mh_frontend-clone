import styled from 'styled-components'

import { LOGIN_BTN_OUTLINE } from 'assets/images'

const burgerDimension = {
  height: 30,
  width: 40
}

const HeaderStyled = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.darkBlue};

  .header {
    padding: 14px 0px;
    z-index: 2;
    background-color: ${({ theme }) => theme.color.darkBlue};

    .header-left {
      ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
        margin-left: 5%;
      }
      .link-logo {
        .logo {
          height: 34px;
          object-fit: contain;
        }
      }
    }

    .header-mid {
      margin-left: 60px;

      ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
        margin-left: 0;
        display: flex;
        justify-content: center;
      }

      .nav {
        text-transform: uppercase;

        .nav-item {
          margin-right: 45px;
          text-decoration: none;
          .active {
            font-size: 18px;
          }

          &:last-child {
            ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
              margin-right: 0;
            }
          }

          span {
            font-size: 16px;
          }

          img {
            margin-left: 6px;
          }
        }
      }
    }

    .header-right {
      .login-btn {
        background-color: ${({ theme }) => theme.color.transparent};
        background-image: url(${LOGIN_BTN_OUTLINE});
        background-repeat: no-repeat;
        background-size: contain;
        border: none;

        width: 118px;
        height: 34px;
        position: relative;

        text-decoration: none;

        span {
          font-size: 16px;
        }

        img {
          width: 21px;
          height: 12px;
          object-fit: contain;

          bottom: -6px;
          right: 22px;
        }
      }

      .login-info {
        gap: 16px;
        position: relative;

        .num {
          position: absolute;
          left: 21px;
          width: 10px;
          top: 4px;
          height: 10px;
          border-radius: 50%;
          background: #ff2c74;
          color: #fff;
          line-height: 16px;
          font-size: 11px;
          text-align: center;
        }

        .blink-me {
          animation: blinker 0.5s linear infinite;
        }

        @keyframes blinker {
          50% {
            opacity: 0;
            height: 10px;
            width: 10px;
          }
        }
      }

        .block-mail-box {
          margin-top: -5px;
          cursor: pointer;
        }

        .balance-container {
          font-size: 20px;
          gap: 8px;

          img {
            width: 20px;
            height: 20px;
            margin-top: -3px;
            margin-left: 3px;
          }

          .game-token-e-prz {
            width: 10px;
            height: 20px;
            margin-top: -3px;
          }
        }

        .separate-line {
          height: 32px;
          border: 1px solid ${({ theme }) => theme.color.grey};
        }

        .info-container {
          &:hover {
            .info-dropdown {
              display: block;
            }
          }

          .name {
            cursor: default;
            max-width: 200px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }

          .avatar {
            margin: 0px 5px 0px 8px;
            width: 24px;
            aspect-ratio: 1/ 1;
          }

          .info-dropdown {
            top: 100%;
            right: 0;
            display: none;

            .info {
              background-color: ${({ theme }) => theme.color.neutral};
              padding: 14px 20px;
              gap: 16px;
              width: 120px;
              clip-path: polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0 calc(100% - 20px));

              .info-link {
                text-decoration: none;
                font-size: 14px;
                line-height: 16px;

                &:hover {
                  color: ${({ theme }) => theme.color.white};
                }

                &.logout-btn {
                  background-color: ${({ theme }) => theme.color.transparent};
                  border: none;

                  &:hover {
                    color: ${({ theme }) => theme.color.red};
                  }
                }

              }

              .mailbox {
                background-color: #191d2c;
                border: none;
                color: white;
              }
            }
          }
        }
      }
    }

    .header-mb-right {
      .burger-btn {
        width: ${burgerDimension.width}px;
        height: ${burgerDimension.height}px;
        border: none;
        background-color: ${({ theme }) => theme.color.transparent};

        &.burger-btn--open {
          .stick-1 {
            transform: translateY(${burgerDimension.height / 2 - 2}px) rotate(45deg);
          }
          .stick-2 {
            opacity: 0;
          }
          .stick-3 {
            transform: translateY(-${burgerDimension.height / 2 - 2}px) rotate(-45deg);
          }
        }

        .stick {
          width: ${burgerDimension.width}px;
          height: 4px;
          background: ${({ theme }) => theme.color.primary};
          transition: 0.25s ease-in-out;
          pointer-events: none;
        }
      }
    }
  }

  .header-mb {
    bottom: 0;
    transition: all 0.25s ease-in-out 0s;
    z-index: 1;

    background-color: ${({ theme }) => theme.color.darkBlue};
    width: 100%;

    &.header-mb--open {
      transform: translateY(100%);
    }

    .header-mb-container {
      .nav {
        text-transform: uppercase;

        .nav-item {
          text-decoration: none;
          border-bottom: 1px solid ${({ theme }) => theme.color.headerBorder};

          span {
            font-size: 16px;
          }

          img {
            margin-left: 6px;
          }
        }
      }

      .login-container {
        border-bottom: 1px solid ${({ theme }) => theme.color.headerBorder};

        .login-btn {
          font-size: 20px;
        }

        .info-nav {
          .nav-item {
            text-decoration: none;
            border-bottom: 1px solid ${({ theme }) => theme.color.headerBorder};
            font-size: 16px;

            &:hover {
              color: ${({ theme }) => theme.color.white};
            }

            &:first-child {
              gap: 16px;

              .balance-container {
                font-size: 20px;
                gap: 6px;

                .balance {
                  img { 
                    width: 20px;
                    height: 20px;
                    margin-top: -3px;
                    margin-left: 3px;
                  }
                }
              }
            }

            &:last-child {
              color: ${({ theme }) => theme.color.red};
            }

            &.logout-btn {
              background-color: ${({ theme }) => theme.color.transparent};
              border: none;
            }

            .info-container {
              .avatar {
                margin: 0px 5px 0px 8px;
                width: 24px;
                aspect-ratio: 1/ 1;
              }

              .name {
                max-width: 140px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
`

export default HeaderStyled

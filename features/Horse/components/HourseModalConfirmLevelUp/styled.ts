import styled from 'styled-components'

interface HourseModalStyleProps {
  currentEnergy: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleTheme = (theme: any, currentEnergy: any) => {
  if (currentEnergy && currentEnergy <= 27) {
    return theme.color.orange
  }
  if (currentEnergy && currentEnergy <= 47) {
    return theme.color.yellow
  }
  if (currentEnergy && currentEnergy <= 73) {
    return theme.color.blue
  }
  if (currentEnergy && currentEnergy <= 100) {
    return theme.color.white
  }
}

const HourseModalStyle = styled.div<HourseModalStyleProps>`
  .choose-horse-modal {
    background-color: ${({ theme }) => theme.color.neutral};
    clip-path: polygon(0 0, 100% 0, 100% 100%, 40px 100%, 0 calc(100% - 40px));
    padding: 30px;
    position: relative;

    .content-horse-level-up {
      background-color: ${({ theme }) => theme.color.darkBlue};
      clip-path: polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0% calc(100% - 20px));
      padding: 20px;

      .left-container {
        .avatar-container {
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;

          margin-bottom: 10px;

          .avatar {
            width: 95px;
            aspect-ratio: 95/105;
            object-fit: contain;
            object-position: center;
          }
        }

        .energy-container {
          gap: 4px;

          .energy-icon {
            width: 20px;
            aspect-ratio: 1;
          }

          .energy-bar {
            width: 70px;
            height: 4px;
            background-color: rgba(255, 255, 255, 0.3);

            &:after {
              content: '';
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              width: ${({ currentEnergy }) => currentEnergy}%;
              height: 100%;
              background-color: ${({ theme, currentEnergy }) => handleTheme(theme, currentEnergy)};
            }
          }
        }

        .link-container {
          .link {
            font-size: 16px;
            line-height: 20px;
          }
        }
      }

      .right-container {
        position: relative;
        margin-left: 50px;
        .view-level-up {
          margin-left: 30px;
          .level-current {
            position: absolute;
            top: 47px;
            width: 50px;
            left: 40px;
            text-align: center;
            font-size: 35px;
          }

          .orange-arrow-right {
            margin-left: 15px;
          }

          .next-level-up {
            position: absolute;
            top: 47px;
            width: 100px;
            right: -8px;
            text-align: center;
            font-size: 35px;
          }

          .level-up {
            margin-left: 15px;
          }
        }
        .orange-frame {
          margin-left: 30px;
        }
      }
    }

    .title-levelup {
      font-size: 24px;
      padding-bottom: 5px;
      border-bottom: solid 2px black;
    }

    .close-btn {
      top: 15px;
      right: 15px;
      background-color: ${({ theme }) => theme.color.transparent};
      border: none;
      z-index: 1;
    }

    .race-name-container {
      position: absolute;
      left: 25px;
      top: 15px;
      .race-name {
        font-size: 24px;
        line-height: 20px;
        margin-bottom: 28px;
        span {
          margin-bottom: 4px;
        }
      }
    }

    .confirm-horse {
      margin-top: 40px;
      &-btns {
        margin-top: 26px;
        button {
          border: 0;
          background: none;
          padding: 0;
          margin: 0 40px;
        }
      }
      &-title {
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        margin-bottom: 50px;
      }
    }
  }
`

export default HourseModalStyle

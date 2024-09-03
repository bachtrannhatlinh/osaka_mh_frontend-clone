import { HORSE_AVATAR_BG } from 'assets/images'
import styled from 'styled-components'

const HorseAvatarStyled = styled.div`
  height: 100%;
  width: 100%;
  .horse-container {
    height: 100%;
    .top-horse {
      color: white;
      width: 100%;
      padding-bottom: 50px;
      .horse-info {
        display: flex;
        gap: 10px;
        font-size: 22px;
        .horse-name {
          font-size: 22px;
          text-transform: uppercase;
          font-weight: 600;
        }
        .horse-lending {
          font-size: 20px;
          color: #ffc700;
          width: 100%;
          justify-content: end;
          text-align: end;
        }
        .icon-gender {
          width: 20px;
          margin-top: -4px;
        }
      }
      .horse-level {
        position: relative;
        .horse-level-number {
          font-size: 20px;
          position: absolute;
          right: 15px;
          top: 18%;
        }
        .level-length {
          right: 12px;
        }
      }
    }

    .background-container {
      .background {
        background-image: url(${HORSE_AVATAR_BG});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

        ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
          background-size: cover;
        }

        .avatar {
          width: 100%;
          aspect-ratio: 300 / 300;
          object-fit: contain;
          object-position: center;

          ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
            width: 100%;
          }
        }
      }
    }
    .time-container {
      color: white;
      padding: 20px 0 0 28px;
      font-size: 18px;
      width: 255px;

      .time {
        display: flex;
        gap: 10px;
        justify-content: space-between;
        .title {
          color: #4ef076;
        }
        .day-time {
          color: #e8c033;
        }
      }
    }
  }
`

export default HorseAvatarStyled

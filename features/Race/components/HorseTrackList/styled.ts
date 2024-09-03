import { SPEED_UP } from 'apps/constants'
import styled from 'styled-components'

interface HorseTrackListStyledProps {
  distance: number
  translateX: number
}

export const HORSE_AVATAR_WIDTH = 43
export const START_AREA_WIDTH = 58

const HorseTrackListStyled = styled.div.attrs<HorseTrackListStyledProps>(({ translateX }) => {
  return {
    style: {
      transform: `translateX(-${translateX}px)`
    }
  }
})<HorseTrackListStyledProps>`
  transition-timing-function: linear;
  transition-duration: 0.5s;
  position: relative;
  .start {
    position: absolute;
    left: 75px;
    .title {
      font-size: 14px;
      line-height: 20px;
      color: ${({ theme }) => theme.color.yellow};
      margin-left: -10px;
    }

    .triangle {
      clip-path: polygon(0 0, 50% 100%, 100% 0);
      background-color: ${({ theme }) => theme.color.yellow};
      width: 10px;
      aspect-ratio: 1;
    }
  }

  .milestone-container {
    width: ${({ distance }) => START_AREA_WIDTH + HORSE_AVATAR_WIDTH + distance * SPEED_UP}px;
    height: 40px;
    padding-left: ${START_AREA_WIDTH + HORSE_AVATAR_WIDTH}px;

    .race-milestone-block {
      width: 300px;

      .milestone-title {
        gap: 4px;
        right: 0;
        transform: translateX(50%);

        .milestone {
          font-size: 14px;
          line-height: 20px;
        }

        .triangle {
          clip-path: polygon(0 0, 50% 100%, 100% 0);
          background-color: ${({ theme }) => theme.color.yellow};
          width: 10px;
          aspect-ratio: 1;
        }
      }
    }
  }

  .horse-track-container {
    gap: 10px;
  }
`

export default HorseTrackListStyled

import { SPEED_UP } from 'apps/constants'
import { CROWN_BRONZE, CROWN_GOLD, CROWN_SILVER } from 'assets/images'
import styled from 'styled-components'

interface HorseTrackStyledProps {
  distance: number
}

interface HorseAvatarStyledProps {
  distanceHorseMoved: number
}

interface trackListTranslateProps {
  trackListTranslate: number
}

const HOSRE_AVATAR_WIDTH = 43
const START_AREA_WIDTH = 58
const MILESTONE_DISTANCE = 300
export const EXTRA_DISTANCE = 50

export const HorseAvatarStyled = styled.img.attrs<HorseAvatarStyledProps>(({ distanceHorseMoved, ...props }) => ({
  style: {
    left: `${START_AREA_WIDTH + distanceHorseMoved}px`,
    ...props
  }
}))<HorseAvatarStyledProps>`
  width: 50px;
  height: 50px;
  object-fit: contain;
  object-position: right;
  transition-duration: 0.5s;
  transition-timing-function: linear;
  transform: scaleX(-1);
`

export const TrackListTransLate = styled.div.attrs<trackListTranslateProps>(({ trackListTranslate }) => ({
  style: {
    transform: `translateX(${trackListTranslate >= 0 && trackListTranslate}px)`
  }
}))<trackListTranslateProps>`
  z-index: 10;
  transition-duration: 0.5s;
  transition-timing-function: linear;
  position: absolute;
  height: 50px;
  left: 0;
  padding: 8px 12px;
  background: #191d2c;
`

const HorseTrackStyled = styled.div<HorseTrackStyledProps>`
  height: 50px;
  position: relative;
  &.active {
    &:after {
      content: '';
      width: ${({ distance }) => START_AREA_WIDTH + HOSRE_AVATAR_WIDTH + distance * SPEED_UP + EXTRA_DISTANCE + 4}px;
      height: calc(100% + 2px);
      background: #2c7033;
      display: block;
      position: absolute;
      top: -2px;
      left: 0;
      -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 14px 100%, 0% calc(100% - 14px));
      clip-path: polygon(0 0, 100% 0, 100% 100%, 14px 100%, 0% calc(100% - 14px));
    }
    &:before {
      content: '';
      width: 2px;
      height: 100%;
      // background: ${({ theme }) => theme.color.primary};
      display: block;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 2;
    }
  }
  .horse-track {
    z-index: 1;
    height: 100%;
    width: ${({ distance }) => START_AREA_WIDTH + HOSRE_AVATAR_WIDTH + distance * SPEED_UP + EXTRA_DISTANCE}px;
    background-color: ${({ theme }) => theme.color.neutral};
    padding: 12px;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 14px 100%, 0% calc(100% - 14px));

    &-active {
      left: 2px;
      height: calc(100% - 2px);
      background: #191d2cf2;
    }

    .gate-container {
      width: 34px;
      aspect-ratio: 1;
      background-color: ${({ theme }) => theme.color.positionTrack};
      clip-path: polygon(0 0, 100% 0, 100% 100%, 8px 100%, 0% calc(100% - 8px));

      .gate-number {
        font-size: 16px;
        line-height: 20px;
      }
    }

    .milestone-list-container {
      left: ${START_AREA_WIDTH + HOSRE_AVATAR_WIDTH}px;

      .milestone-block {
        width: ${MILESTONE_DISTANCE}px;
        height: 34px;
        border-right: 2px solid ${({ theme }) => theme.color.yellow};
      }

      .milestone-block:last-child {
        border-right: 2px solid #15e133;
      }
    }
  }
  .first-rank-track {
    background: #3a342f;
    .milestone-block:last-child {
      &:before {
        background-image: url(${CROWN_GOLD});
        content: '';
        width: 100%;
        height: 100%;
        display: block;
        position: relative;
        left: ${MILESTONE_DISTANCE + 10}px;
        background-repeat: no-repeat;
        top: 8px;
      }
    }
  }
  .second-rank-track {
    background: #2b2a2a;
    .milestone-block:last-child {
      &:before {
        background-image: url(${CROWN_SILVER});
        content: '';
        width: 100%;
        height: 100%;
        display: block;
        position: relative;
        left: ${MILESTONE_DISTANCE + 10}px;
        background-repeat: no-repeat;
        top: 8px;
      }
    }
  }
  .third-rank-track {
    background: #232128;
    .milestone-block:last-child {
      &:before {
        background-image: url(${CROWN_BRONZE});
        content: '';
        width: 100%;
        height: 100%;
        display: block;
        position: relative;
        left: ${MILESTONE_DISTANCE + 10}px;
        background-repeat: no-repeat;
        top: 8px;
      }
    }
  }
`

export default HorseTrackStyled

import { HORSE_RANK_AVATAR_FRAME } from 'assets/images'
import styled from 'styled-components'

interface HorseRankBoxStyledProps {
  currentRank: number
  isHover: boolean
}

const DISTANCE_FROM_TOP_TO_RANK_BOX_EVERY_RANK = 60

const HorseRankBoxStyled = styled.div.attrs<HorseRankBoxStyledProps>(({ currentRank }) => ({
  style: {
    top: currentRank * DISTANCE_FROM_TOP_TO_RANK_BOX_EVERY_RANK
  }
}))<HorseRankBoxStyledProps>`
  transition-duration: 0.5s;
  transform: ${({ isHover }) => (isHover ? 'scale(1.15)' : 'scale(1)')};
  background-color: ${({ isHover }) => (isHover ? '#ffff' : 'none')};
  &:hover {
    transform: scale(1.15);
  }
  &.active {
    &:after {
      content: '';
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      background: #2c7033;
      display: block;
      position: absolute;
      top: -2px;
      left: -2px;
      -webkit-clip-path: polygon(17% 0, 84% 0, 100% 12%, 100% 96%, 80% 96%, 79% 100%, 0 100%, 0 4%, 14% 4%);
      clip-path: polygon(11% 0, 94% 0, 100% 16%, 100% 96%, 90% 96%, 90% 100%, 0 100%, 0 4%, 10% 4%);
      z-index: 0;
    }
  }

  .horse-rank-box {
    padding: 12px 9px;
    height: 50px;
    width: 257px;
    gap: 12px;
    background-color: ${({ theme }) => theme.color.neutral};
    clip-path: polygon(11% 0, 94% 0, 100% 16%, 100% 96%, 90% 96%, 90% 100%, 0 100%, 0 4%, 10% 4%);

    &-active {
      z-index: 1;
      position: relative;
      background: #191d2cf2;
    }

    .avatar-container {
      width: 38px;
      aspect-ratio: 1;
      background-image: url(${HORSE_RANK_AVATAR_FRAME});
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;

      .avatar {
        width: 30px;
        aspect-ratio: 1;
      }
    }

    .gate {
      color: #3fbc71;
      .gate-rank {
        font-size: 24px;
      }
    }

    .name-container {
      .horse-name {
        font-size: 16px;
        line-height: 20px;
        text-transform: capitalize;
      }
    }
    .rank-bg {
      width: 0px;
      padding-bottom: 60px;
      left: 125px;
    }
  }
  .top-rank {
    background: ${({ currentRank }) => {
      switch (currentRank) {
        case 0:
          return '#3A342F'
        case 1:
          return '#2B2A2A'
        case 2:
          return '#232128'
        default:
          return ''
      }
    }};
  }
`

export default HorseRankBoxStyled

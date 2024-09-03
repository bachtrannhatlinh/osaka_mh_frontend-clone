import styled from 'styled-components'

interface StatsBarRaceViewStyledProps {
  currentStatsValue: number
  countStats: number
}

const StatsBarRaceViewStyled = styled.div<StatsBarRaceViewStyledProps>`
  .stats-bar {
    gap: 13px;
    position: relative;
    font-weight: 500;

    .stats-type {
      font-size: 20px;
      line-height: 16px;
      min-width: 60px;
      color: #4ef076;
      width: 66px;
      text-align: right;
    }

    .progress {
      height: 2px;
      background-color: ${({ theme }) => theme.color.neutral};

      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        background-color: ${({ theme }) => theme.color.orange};
        height: 100%;
        width: ${({ currentStatsValue, countStats }) => currentStatsValue + countStats}%;
        background: linear-gradient(
          to right,
          ${({ theme }) => theme.color.orange}
            ${({ currentStatsValue, countStats }) => (currentStatsValue * 100) / (currentStatsValue + countStats)}%,
          blue 20%,
          green 10%
        );
      }
    }

    .current-value {
      position: absolute;
      top: -13px;
      left: 50%;
    }

    .colorValue {
      color: #4ef076;
    }

    .stats-rank {
      width: 24px;
      font-size: 14px;
      line-height: 16px;
    }

    .decrease {
      background-color: #121520;
      border: none;
      color: ${({ theme }) => theme.color.white};
      font-size: 16px;
      box-shadow: 1px 1px 10px 1px #888888;
      width: 20px;
    }

    .increase {
      background-color: #121520;
      border: none;
      color: ${({ theme }) => theme.color.white};
      font-size: 16px;
      box-shadow: 1px 1px 10px 1px #888888;
      width: 20px;
    }
    .disabled {
      opacity: 0.7;
      box-shadow: 0px 0px 0px 1px #3a3939a3;
    }
  }
`

export default StatsBarRaceViewStyled

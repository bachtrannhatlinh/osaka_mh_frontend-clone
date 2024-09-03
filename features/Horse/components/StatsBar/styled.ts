import styled from 'styled-components'

interface StatsBarStyledProps {
  currentStatsValue: number
  countStats: number
}

const StatsBarStyled = styled.div<StatsBarStyledProps>`
  .stats-bar {
    gap: 17px;
    position: relative;
    font-weight: 500;

    .stats-type {
      font-size: 22px;
      line-height: 16px;
      min-width: 80px;
      color: #4ef076;
      width: 66px;
      text-align: right;
    }

    .progress {
      height: 3px;
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
      top: -18px;
      left: 50%;
      font-size: 20px;
    }

    .colorValue {
      color: #4ef076;
    }

    .stats-rank {
      width: 24px;
      font-size: 20px;
      line-height: 16px;
      .animation-text {
        animation: blinker 0.5s linear infinite;
        color: #fff566;
        font-size: 22px;
      }
    }

    .decrease {
      background-color: #121520;
      border: none;
      color: ${({ theme }) => theme.color.white};
      font-size: 24px;
      box-shadow: 1px 1px 10px 1px #888888;
      width: 30px;
    }

    .count {
      font-size: 20px;
      width: 15px;
    }
    .increase {
      background-color: #121520;
      border: none;
      color: ${({ theme }) => theme.color.white};
      font-size: 24px;
      box-shadow: 1px 1px 10px 1px #888888;
      width: 30px;
    }
    .disabled {
      opacity: 0.7;
      box-shadow: 0px 0px 0px 1px #3a3939a3;
    }
  }
`

export default StatsBarStyled

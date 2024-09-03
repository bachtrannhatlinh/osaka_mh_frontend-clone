import styled from 'styled-components'

interface EnergyExpBarStyledProps {
  currentEnergyPercent: number
}

const EnergyExpBarStyled = styled.div<EnergyExpBarStyledProps>`
  .energy-bar {
    gap: 12px;

    .energy-icon {
      width: 20px;
      height: 20px;
      object-fit: cover;
      object-position: center;

      top: 4px;
    }

    .energy-content {
      gap: 4px;
      .energy-text {
        font-size: 16px;
        line-height: 16px;
        .current-exp {
          color: #ff7a00;
          width: 100px;
        }
      }

      .bar {
        height: 8px;
        background-color: rgba(255, 255, 255, 0.3);

        &:after {
          content: '';
          display: block;
          height: 8px;
          position: absolute;
          top: 0;
          left: 0;
          width: ${({ currentEnergyPercent }) => currentEnergyPercent}%;
          background-color: ${({ theme }) => theme.color.orange};
        }
      }
    }
  }
`

export default EnergyExpBarStyled

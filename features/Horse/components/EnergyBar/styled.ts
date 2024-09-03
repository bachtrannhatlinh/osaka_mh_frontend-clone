import styled from 'styled-components'

interface EnergyBarStyledProps {
  currentEnergyPercent: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleTheme = (theme: any, currentEnergyPercent: number) => {
  if (currentEnergyPercent && currentEnergyPercent <= 27) {
    return theme.color.orange
  }
  if (currentEnergyPercent && currentEnergyPercent <= 47) {
    return theme.color.yellow
  }
  if (currentEnergyPercent && currentEnergyPercent <= 73) {
    return theme.color.blue
  }
  if (currentEnergyPercent && currentEnergyPercent <= 100) {
    return theme.color.white
  }
}

const EnergyBarStyled = styled.div<EnergyBarStyledProps>`
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
        font-size: 14px;
        line-height: 16px;
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
          background-color: ${({ theme, currentEnergyPercent }) => handleTheme(theme, currentEnergyPercent)};
        }
      }
    }
  }
`

export default EnergyBarStyled

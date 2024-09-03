import styled from 'styled-components'

const QuickStatsBoxStyled = styled.div`
  .quick-stats-box {
    .top-line {
      width: 23px;
      height: 2px;
      background-color: ${({ theme }) => theme.color.grey};
      margin-bottom: 3px;
    }

    .content {
      gap: 12px;
      margin: 8px 0;
      width: 123px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .stats-type {
        font-size: 20px;
        line-height: 14px;
        color: #4ef076;
      }

      .current-value {
        font-size: 16px;
        line-height: 19px;
      }
      .stats-type-text {
        font-size: 20px;
        font-weight: 600;
      }
    }

    .grey-line {
      min-width: 132px;
      height: 3px;
    }
  }
`

export default QuickStatsBoxStyled

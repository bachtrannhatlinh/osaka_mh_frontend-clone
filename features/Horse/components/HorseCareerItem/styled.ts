import styled from 'styled-components'

const HorseCareerItemStyled = styled.tr`
  background-color: ${({ theme }) => theme.color.neutral};
  clip-path: polygon(100% 0, 100% 100%, 22px 100%, 0 calc(60px - 22px), 0 0);
  cursor: pointer;
  td {
    text-align: left;
    vertical-align: middle;
    padding: 12px 0;
    font-size: 16px;
    line-height: 20px;

    .class-tag {
      top: 4px;
    }

    .unit {
      font-size: 12px;
    }

    .total-prize {
      img {
        width: 20px;
        height: 20px;
        margin-top: -3px;
        margin-left: 3px;
      }
    }

    .entry-fee {
      img {
        width: 20px;
        height: 20px;
        margin-top: -3px;
        margin-left: 3px;
      }
    }
  }

  .total-prize-table {
    text-align: left;
    img {
      width: 15px;
      height: 15px;
      margin-top: -3px;
    }
  }

  .entry-fee-table {
    text-align: left;
    img {
      width: 10px;
      height: 20px;
      margin-top: -3px;
    }
  }
  .top-10 {
    top: 10px;
  }
`

export default HorseCareerItemStyled

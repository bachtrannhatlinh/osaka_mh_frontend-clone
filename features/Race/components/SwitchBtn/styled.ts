import styled from 'styled-components'

const SwitchBtnStyled = styled.div`
  column-gap: 12px;

  .switch-title {
    font-size: 16px;
    line-height: 20px;

    ${({ theme }) => theme.media.lessThan(theme.size.md)} {
      font-size: 14px;
    }
  }

  .switch-btn {
    padding: 2px;
    width: 45px;

    background: ${({ theme }) => theme.color.neutral};
    border: none;
    border-radius: 100px;

    &.switch-btn--on {
      background: ${({ theme }) => theme.color.primary};

      .circle {
        background-color: ${({ theme }) => theme.color.neutral};
        transform: translateX(21px);
      }
    }

    .circle {
      width: 20px;
      height: 20px;

      background-color: ${({ theme }) => theme.color.silverSand};
      border-radius: 100px;

      transition: all 0.25s ease-in-out 0s;
      transform: scaleX(0px);
    }
  }
`

export default SwitchBtnStyled

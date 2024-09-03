import styled from 'styled-components'

interface ToolTipStyledProps {
  name: string
}

const ToolTipStyled = styled.div<ToolTipStyledProps>`
  position: absolute;
  top: 10px;
  left: 0px;
  width: 130px;
  &:hover {
    .content-name {
      display: block;
    }
  }

  .content-name {
    display: none;
    position: absolute;
    top: -25px;
    width: max-content;
    height: 24px;
    line-height: 24px;
    background: #03a9f4;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    transition: 0.5s;
    padding: 0px 8px;
  }

  .content-name::before {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: rotate(45deg) translateX(-50%);
    width: 10px;
    height: 10px;
    background-color: #03a9f4;
    z-index: 1;
  }

  .content-name-horver {
    position: absolute;
    left: 0px;
    top: 3px;
    /* min-width: max-content; */
  }
`

export default ToolTipStyled

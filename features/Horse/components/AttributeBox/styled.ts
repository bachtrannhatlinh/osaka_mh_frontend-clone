import styled from 'styled-components'

const AttributeBoxStyled = styled.div`
  clip-path: polygon(calc(100% - 16px) 0%, 100% 16px, 100% 100%, 0 100%, 0 0);
  background-color: ${({ theme }) => theme.color.yellow};
  padding: 1px;

  .attribute-box {
    clip-path: polygon(calc(100% - 16px) 0%, 100% 16px, 100% 100%, 0 100%, 0 0);
    background-color: ${({ theme }) => theme.color.neutral};
    padding: 10px 15px;

    .title {
      font-size: 20px;
      line-height: 14px;
      margin-bottom: 4px;
    }

    .value {
      font-size: 20px;
      line-height: 19px;
    }

    .line {
      top: 0;
      left: 0;
    }
  }
`

export default AttributeBoxStyled

import styled from 'styled-components'

const InputStyled = styled.div`
  width: 435px;
  padding: 8px 12px;
  column-gap: 8px;

  background-color: #8D8D8D;
  clip-path: polygon(419px 0, 100% 16px, 100% 100%, 0 100%, 0 0);

  ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
    width: 100%;
    clip-path: none;
  }

  margin-top: 5px;

  .orange-line {
    right: 0;
    bottom: 0;

    width: 68px;
    height: 2px;
  }

  .search-icon {
    width: 20px;
  }

  .search-input {
    background-color: #8D8D8D;
    border: none;

    font-size: 16px;
    line-height: 20px;
    color: white;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #BEBEBE;
      font-size: 16px;
    }
  }
`

export default InputStyled

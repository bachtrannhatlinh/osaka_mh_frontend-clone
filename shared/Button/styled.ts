import styled from 'styled-components'

const ButtonStyled = styled.div`
  cursor: pointer;
  column-gap: 8px;
  width: fit-content;
  .btn-container- {
    position: relative;
    &:hover {
      filter: brightness(1.5);
    }
    .background-btn {
    }
  }
  .btn-container-disable {
    position: relative;
    filter: brightness(0.5);
  }

  .ant-spin-dot-item {
    background-color: #4ef076 !important;
  }

  .btn-name {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 22px;
    color: white;
    width: max-content;
    gap: 8px;
    display: flex;
  }
`

export default ButtonStyled

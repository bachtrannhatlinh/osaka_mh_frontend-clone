import styled from 'styled-components'

const ModalStyled = styled.div`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
  }
`

export default ModalStyled

import styled from 'styled-components'

const CustomDropDownStyled = styled.div`
  .dropdownToggle {
    color: white;
    position: relative;
  }

  .dropdown-menu-ui {
    position: absolute;
    inset: 0px auto auto 0px;
    transform: translate(0px, 40px);
    overflow-y: scroll;
    height: 200px;
    padding-bottom: 77px;
  }

  .dropdown-toggle::after {
    position: absolute;
    display: inline-block;
    margin-left: 0.5em;
    top: 1em;
    vertical-align: 0.255em;
    content: "";
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
  }

  btn-check:focus+.btn, .btn:focus {
    outline: 0;
    box-shadow: none;
  }
`
export default CustomDropDownStyled
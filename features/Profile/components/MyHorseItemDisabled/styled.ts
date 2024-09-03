import styled from 'styled-components'

const MyHorseItemDisabledStyled = styled.tr`
  clip-path: polygon(0 0, 100% 0, 100% 100%, 14px 100%, 0 calc(100% - 14px));
  background-color: #4b4d55 !important;
  vertical-align: middle;

  cursor: pointer;
  td {
    padding: 8px 0;
    font-size: 16px;
    line-height: 20px;

    .horse-avatar {
      width: 50px;
    }

    .horse-class {
      top: 4px;
    }
  }

  .width-25 {
    width: 25%;
    text-align: left;
  }

  .width-20 {
    width: 20%;
    text-align: left;
  }

  .width-18 {
    width: 18%;
  }

  .width-15 {
    width: 15%;
  }

  .width-15-name {
    width: 15%;
    text-align: left;
  }

  .width-10 {
    width: 10%;
  }

  .padding-left-name {
    padding-left: 7.5%;
  }

  .padding-left {
    padding-left: 7.5%;
  }

  .padding-left-5 {
    padding-left: 5%;
  }

  .padding-left-4 {
    padding-left: 4%;
  }

  .padding-left-59 {
    padding-left: 5.8%;
  }

  .padding-left-6 {
    padding-left: 6.4%;
  }

  .width-15 {
    width: 15%;
  }

  .width-5 {
    width: 5%;
  }

  .stt {
    width: 50px;
  }

  .gender {
    text-transform: lowercase;
  }
  .gender:first-line {
    text-transform: capitalize;
  }
`

export default MyHorseItemDisabledStyled

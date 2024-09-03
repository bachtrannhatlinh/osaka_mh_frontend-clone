import styled from 'styled-components'

const SelectBoxStyled = styled.div`
  min-width: 125px;
  position: relative;
  .select-box-customs {
    color: #8d8d8d;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    position: relative;
    width: 100%;
    height: 32px;
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 3px;
    img {
      transform: scaleY(-1);
      width: 100%;
      height: inherit;
    }
    span.select-name {
      position: absolute;
      display: flex;
      top: 5px;
      text-align: center;
      width: 90%;
      justify-content: center;
    }
    img.select-drop-icon {
      position: absolute;
      width: 25px;
      height: 25px;
      right: 50%;
      transform: translateX(220%);
      top: 5px;
    }
    img.up-down-icon {
      transform: scaleY(-1) translateX(220%);
    }
  }

  ul.select-content-dropdown {
    z-index: 1;
    position: absolute;
    top: 35px;
    left: 0;
    right: 0;
    width: 100%;
    background-color: transparent;
    margin: 0;
    margin-top: 3px;
    padding: 0;
    list-style: none;
    border-top: 1px solid #8d8d8d;
    li {
      color: #ffffff;
      padding: 6px 20px;
      font-weight: 400;
      font-size: 15px;
      line-height: 18px;
      background-color: #191d2c;
      border-left: 1px solid #8d8d8d;
      border-right: 1px solid #8d8d8d;
      cursor: pointer;
    }
    li.active {
      color: #f55555;
    }

    .polygon {
      display: flex;
      height: 20px;
      .rect {
        width: 80%;
        background-color: #191d2c;
        border-left: 1px solid #8d8d8d;
        border-bottom: 1px solid #8d8d8d;
      }
      .triangle {
        position: relative;
        border-color: #8d8d8d transparent transparent transparent;
        border-style: solid;
        border-width: 20px 25px 4px 0px;
        height: 0px;
        width: 0px;
        .triangle-border {
          position: absolute;
          top: -21px;
          border-color: #191d2c transparent transparent transparent;
          border-style: solid;
          border-width: 20px 25px 4px 0px;
          height: 0px;
          width: 0px;
        }
      }
    }
  }
`

export default SelectBoxStyled

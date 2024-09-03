import styled from 'styled-components'

const SelectCustomStyled = styled.div`
  width: 150px;
  position: relative;
  background: #080707;
  height: 32px;

  .select-box-customs {
    color: #8d8d8d;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    width: 100%;
    height: 32px;
    font-weight: 400;
    font-size: 16px;
    .filter-icon {
      margin-right: 8px;
    }

    span.select-name {
      position: absolute;
      display: flex;
      top: 4px;
      text-align: center;
      justify-content: center;
      padding-left: 14px;
    }
    img.select-drop-icon {
      position: absolute;
      width: 25px;
      height: 25px;
      transform: translateX(220%);
      top: 4px;
    }
    img.up-down-icon {
      transform: scaleY(-1) translateX(220%);
    }
    .orange-line {
      right: 0;
      bottom: -2px;

      width: 100%;
      height: 3px;
    }
  }

  ul.select-content-dropdown {
    z-index: 1;
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    width: 100%;
    background-color: transparent;
    margin: 0;
    margin-top: 3px;
    padding: 0;
    list-style: none;
    /* border-top: 1px solid #8d8d8d; */
    background: linear-gradient(180deg, rgba(25, 29, 43, 0.8) 0%, #090911 100%);
    li {
      color: #ffffff;
      padding: 6px 12px;
      font-weight: 400;
      font-size: 18px;
      line-height: 18px;
      /* background-color: #10102080; */
      border-left: 1px solid #eec32c;
      border-right: 1px solid #eec32c;
      cursor: pointer;
    }
    li.active {
      background: linear-gradient(
        90deg,
        rgba(227, 109, 2, 0) -2.08%,
        rgba(255, 122, 0, 0.45) 47.38%,
        rgba(227, 109, 2, 0) 101.56%
      );
    }
    li:hover {
      background: linear-gradient(
        90deg,
        rgba(227, 109, 2, 0) -2.08%,
        rgba(255, 122, 0, 0.45) 47.38%,
        rgba(227, 109, 2, 0) 101.56%
      );
      filter: grayscale(1);
    }

    .polygon {
      display: flex;
      height: 20px;
      border-right: 1px solid #eec32c;
      .rect {
        width: 100%;
        /* background-color: #10102080; */
        border-left: 1px solid #eec32c;
        border-bottom: 1px solid #eec32c;
      }
      .triangle {
        /* position: relative;
        border-color: #eec32c transparent transparent transparent;
        border-style: solid;
        border-width: 20px 25px 4px 0px;
        height: 0px;
        width: 0px; */
        .triangle-border {
          /* position: absolute;
          top: -21px;
          border-color: #10102080 transparent transparent transparent;
          border-style: solid;
          border-width: 20px 25px 4px 0px;
          height: 0px;
          width: 0px;
          clip-path: polygon(0 0, 0 93%, 91% 0); */
        }
      }
    }
  }
`

export default SelectCustomStyled

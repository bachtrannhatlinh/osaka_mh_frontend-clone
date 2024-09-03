import styled from 'styled-components'

const LendingTableStyled = styled.div`
  .right-top {
    .horse-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .horse-lending {
        font-size: 20px;
        color: #ffc700;
      }
    }
  }
  .horse-table-container {
    .info {
      &-owner-wrap{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .info-owner {
          display: flex;
          align-items: center;
          font-size: 20px;
          padding: 8px 0px;
          gap: 10px;
          &-name {
            .owner-name {
              font-size: 17px;
            }
          }
          .avatar {
            width: 50px;
            height: 50px;
            aspect-ratio: 1/ 1;
          }
        }
        .info-owner-percent{
          font-size: 17px;
          padding-right : 4px;
          transform: translateY(-12px);
        }
     }
    }
    .horse-table-header {
      color: #bd9f36;
      font-size: 18px;
    }
    .horse-item {
      height: 28px;
      background: linear-gradient(90deg, rgba(63, 67, 83, 0) 0%, #3c4153 41.94%, rgba(57, 62, 82, 0.1) 101.94%);
      width: 100%;
      margin: 8px 0px 8px 0px;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 10px 100%, 0% calc(100% - 10px));
      .lease-price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-input {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          padding-left: 7px;
          input[type='checkbox'] {
            transform: scale(2);
          }
        }
        .price-input {
          width: 75px;
          color: white;
          padding: 2px;
          margin-right: 10px;
          height: 28px;
          text-align: end;
          padding-right: 8px;
        }
        .day-input {
          width: 50px;
          color: white;
          padding: 2px;
          margin-right: 10px;
          height: 28px;
          text-align: end;
          padding-right: 8px;
        }
        .percent {
          position: absolute;
          left: 50px;
        }
        .unit {
          padding-right: 4px;
        }
      }
    }
    input[type='number'] {
      background: #7d878dad;
      border: none;
    }
    .active input[type='number'] {
      background: #7d878dad;
      border: none;
    }
    .out-line input[type='number'] {
      background: #8d8d8d;
      border: none;
      outline: -webkit-focus-ring-color auto 1px;
    }
    .horse-item.active {
      background: linear-gradient(90deg, rgba(63, 67, 83, 0) 0%, #40a948 41.94%, rgba(57, 62, 82, 0.1) 101.94%);
    }
    .ant-select {
      width: 75px;
      margin-right: 10px;
      .ant-select-selector {
        height: 28px;
        background-color: #7d878dad;
        color: white;
        .ant-select-selection-item {
          top: -3px;
        }
      }
    }
    .unit-select {
      top: 10px;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type='number'] {
      -moz-appearance: textfield;
    }
    input::-webkit-input-placeholder {
      color: #493636bf;
    }
    input:-moz-placeholder {
      color: white;
    }
  }
`
export default LendingTableStyled

import styled from 'styled-components'

import { OPEN_RACE_BTN_BORDER } from 'assets/images'

interface RaceTableStyled {
  isRowClickable: boolean
}

const enterBtnDimensionRatio = 3.235

const RaceTableStyled = styled.div<RaceTableStyled>`
  .race-table-container {
    .race-table {
      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        overflow-x: scroll;
      }

      .no-data {
        font-weight: 800;
        background-color: #191d2c;
        padding: 20px;
        color: #ed842a;
        text-align: center;
      }

      .loading {
        color: ${({ theme }) => theme.color.grey};
        height: 50px;
        width: 50px;
      }

      .table {
        min-width: 936px;
        border-collapse: separate;
        border-spacing: 0px 8px;

        > :not(caption) > * > * {
          padding: 0.5rem 0;
        }

        .table-head {
          border-bottom: 2px solid ${({ theme }) => theme.color.black};

          .table-row {
            .th {
              color: ${({ theme }) => theme.color.grey};
              font-size: 18px;
              line-height: 20px;
            }
          }
        }

        .table-body {
          border-top: none;

          &.highlight tr {
            background-color: ${({ theme }) => theme.color.neutralOpacity};
          }

          &.highlight tr:nth-child(1) {
            background-color: #3a342f;
          }

          &.highlight tr:nth-child(2) {
            background-color: #2a2a2a;
          }

          &.highlight tr:nth-child(3) {
            background-color: #232128;
          }

          .table-row {
            border-color: ${({ theme }) => theme.color.transparent};
            height: 50px;
            position: relative;
            background-color: ${({ theme }) => theme.color.neutral};
            cursor: ${({ isRowClickable }) => (isRowClickable ? 'pointer' : 'default')};

            &-primary {
              & > td > div {
                color: #4cf394;
              }
            }

            &::after {
              content: '';
              position: absolute;
              bottom: -12px;
              left: -12px;
              width: 10px;
              height: 10px;
              border-color: transparent transparent ${({ theme }) => theme.color.darkBlue} transparent;
              transform: rotate(225deg);
              border-width: 12px 12px 12px 12px;
              border-style: solid;
            }

            .table-data-empty {
              position: relative;
              background-color: ${({ theme }) => theme.color.detailEmptyColor};
              vertical-align: middle;
              text-align: center;
              font-size: 20px;
              line-height: 20px;
              color: ${({ theme }) => theme.color.detailEmptyBorder};
              border: 2px solid ${({ theme }) => theme.color.detailEmptyBorder};

              .btn-select-gate {
                width: 100%;
                background: transparent;
                color: #fff;
                border: none;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
              }
            }

            .name {
              width: 250px;
            }
            .table-data.horse_name {
              text-transform: capitalize;
            }

            .table-data {
              vertical-align: middle;
              color: ${({ theme }) => theme.color.white};
              font-size: 18px;
              line-height: 20px;
              border: none;

              .table-data-container {
                .race-name {
                  .content-name-horver {
                    white-space: nowrap;
                    width: 230px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-align: start;
                  }
                }
                .total-prize {
                  display: flex;
                  justify-content: space-between;
                  width: 100%;
                  margin-right: 10px;
                }
                .revert_prz {
                  flex-direction: row-reverse;
                }
              }
              .table-gate-no {
                background: #267e5a;
                width: 30px;
                height: 30px;
                text-align: center;
                border-radius: 4px;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              .unit {
                font-size: 12px;
              }

              .starts-in {
                column-gap: 8px;

                .dot {
                  width: 8px;
                  height: 8px;
                  border-radius: 20px;

                  background-color: ${({ theme }) => theme.color.red};
                }

                .live-text {
                  font-size: 16px;
                  line-height: 20px;
                }
              }

              .register-btn {
                background-color: ${({ theme }) => theme.color.transparent};
                background-image: url(${OPEN_RACE_BTN_BORDER});
                background-repeat: no-repeat;
                background-size: contain;
                border: none;

                width: 110px;
                height: calc(110px / ${enterBtnDimensionRatio});

                font-size: 16px;

                ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
                  width: 90px;
                  height: calc(90px / ${enterBtnDimensionRatio});

                  font-size: 12px;
                }

                ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
                  width: 110px;
                  height: calc(110px / ${enterBtnDimensionRatio});

                  font-size: 16px;
                }

                ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
                  width: 140px;
                  height: calc(140px / ${enterBtnDimensionRatio});
                }
              }

              .horse-avatar {
                width: 50px;
              }
            }

            .btn-disable-ct {
              /* display: none; */
            }
          }

          .highlight-class {
            background-color: gray;
          }
        }

        .cancel-count-down {
          &.cancel tr {
            color: red;
          }
        }
        .count-down-btns {
          button {
            background: transparent;
            border: 0;
            padding: 0;
            &.btn-waiting-cancel {
              position: relative;
              span {
                position: absolute;
                font-size: 14px;
                right: 8px;
                top: 51%;
                transform: translateY(-50%);
                &.color-yellow {
                  color: #fff566 !important;
                }
              }
            }
          }

          .highlight-class {
            background-color: gray;
          }
        }
        .register {
          display: flex;
          align-items: center;
          .icon-lock {
            margin-left: 27px;
          }
        }
      }
    }
    .e-htc {
      width: 15px;
      height: 15px;
      margin-top: -3px;
      margin-left: -2px;
    }

    .game-token-e-prz {
      width: 10px;
      height: 20px;
      margin-top: -3px;
      margin-left: 3px;
    }

    .game-token-z-prz {
      width: 10px;
      height: 20px;
      margin-top: -3px;
      margin-left: 3px;
    }

    .first-item .content-name-horver {
      margin: 0 12px;
    }
  }
`

export default RaceTableStyled

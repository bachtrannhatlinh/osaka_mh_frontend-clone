import styled from 'styled-components'

const FilterResultRaceModalStyled = styled.div`
  .choose-horse-modal {
    background-color: ${({ theme }) => theme.color.neutral};
    clip-path: polygon(0 0, 100% 0, 100% 100%, 40px 100%, 0 calc(100% - 40px));
    padding: 32px;
    position: relative;
    width: 675px;
    .style-field-type {
      margin-right: 50px;
    }

    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: ${({ theme }) => theme.color.transparent};
      border: none;
      z-index: 1;
    }

    .race-name-container {
      margin-bottom: 16px;

      .race-name {
        font-size: 24px;
        line-height: 20px;
        .row-yellow {
          padding: 5px;
        }
      }

      .class-filter-container {
        padding: 29px 0px;
        border-bottom: 2px solid #000000;
      }
      .class-filter {
        display: grid;
        grid-template-columns: auto auto auto auto;
        padding: 30px 80px;
      }
      .filed-type {
        /* display: grid;
        grid-template-columns: auto auto;
        padding: 30px 195px; */
        text-align: center;
      }
    }

    .btn-reset-filter {
      cursor: pointer;
      .reset {
        border: none;
        color: #ffa51e;
        text-align: center;
        padding-right: 38px;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        background-color: #191d2c;
        font-size: 24px;
      }
    }

    .select-date {
      padding-bottom: 25px;
      border-bottom: 2px solid #000000;
      .row-yellow {
        padding: 5px;
        margin-left: 35px;
      }

      .react-datepicker {
        position: absolute;
        z-index: 5;
      }
    }

    .class {
      margin: 21px 0 16px 0;
    }

    .distance {
      margin: 21px 0 16px 0;
      .distance-block {
        padding-top: 24px;
        padding-bottom: 30px;
        position: relative;
        .dropdown-left {
          position: absolute;
          top: 26px;
          left: 100px;
        }

        .img-row-yellow {
          position: absolute;
          left: 47.5%;
          top: 45%;
        }

        .dropdown-right {
          position: absolute;
          top: 26px;
          right: 100px;
        }
      }
    }

    .race-info-container {
      gap: 32px;
      padding-bottom: 25px;
      border-bottom: 2px solid ${({ theme }) => theme.color.black};

      .race-info-item {
        gap: 8px;

        .race-info-title {
          font-size: 12px;
          line-height: 14px;
        }

        .race-info-content {
          font-size: 16px;
          line-height: 19px;
        }
      }
    }

    .search-horse-container {
      margin: 21px 0 16px 0;
      .no-horse {
        color: #a3a5ab;
      }

      .search-title {
        font-size: 16px;
        line-height: 24px;
      }

      .search-input {
        background-color: ${({ theme }) => theme.color.black};
        opacity: 0.85;
        width: 240px;
      }
    }

    .horse-list-container {
      max-height: 450px;
      overflow-y: scroll;
      gap: 16px;
    }

    .horse-list-container::-webkit-scrollbar-track {
      border: 1px solid #000;
      padding: 2px 0;
      background-color: #000;
    }

    .horse-list-container::-webkit-scrollbar {
      width: 5px;
    }

    .horse-list-container::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #2f323e;
      border: 1px solid #000;
    }
  }
`

export default FilterResultRaceModalStyled

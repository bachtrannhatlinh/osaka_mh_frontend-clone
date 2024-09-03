import styled from 'styled-components'

const MyLendingStyled = styled.div`
  .my-lending-container {
    .profit-container {
      .tab-lend {
        display: flex;
        gap: 20px;
        .tab-link {
          width: 180px;
          font-size: 22px;
          cursor: pointer;
          .line {
            position: relative;
            top: -20px;
            width: 100%;
          }
        }
      }
    }

    .top-lending {
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
      .search-horse-input {
        height: 32px;
        background-color: #00000085;
      }
      .lending-search {
        display: flex;
        gap: 20px;
        .btn-profit {
          cursor: pointer;
        }
        .btn-profit:hover {
          filter: brightness(1.5);
        }
      }
      .lending-sort {
        width: 200px;
      }
    }
  }
`

export default MyLendingStyled

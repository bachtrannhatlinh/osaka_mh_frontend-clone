import styled from 'styled-components'

const MailRaceStyled = styled.div`
  .block-read-all-mail {
    cursor: pointer;
  }
  
  .race-mail {
    border-collapse: separate;
    border-spacing: 0px 16px;
    width: 100%;

    ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
      min-width: 760px;
    }

  }

  .paginate {
    display: flex;
    justify-content: center;
    .pagination {
      .page-item {
        .page-link {
          z-index: 3;
          color: #fff;
          background-color: #191d2c;
          border-color: #51c21a;
          &:focus {
            box-shadow: none;
          }
        }
      }

      .page-item.active {
        .page-link {
          z-index: 3;
          color: #fff;
          background-color: #135200;
          border-color: #135200;
          font-weight: 700;
        }
      }

      .page-item.disabled {
        cursor: not-allowed;
        .page-link {
          z-index: 3;
          color: #fff;
          background-color: #191d2c;
          border-color: #191d2c;
        }
      }

      .page-item:hover {
        .page-link {
          z-index: 3;
          color: #fff;
          background-color: #135200;
          border-color: #191d2c;
        }
      }
    }
  }
`

export default MailRaceStyled

import styled from 'styled-components'

interface ProfileCloneStyledProp {
  total: number
}

const ProfileCloneStyled = styled.div<ProfileCloneStyledProp>`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .avatar {
    width: 100px;
    height: 100px;
    display: inline-block;
    vertical-align: middle;
    background-size: cover;
    background-position: top center;
    border-radius: 50%;
  }

  .avatar img {
    width: 100%;
  }

  .name-profile {
    font-size: 22px;
  }

  .address-wallet {
    font-size: 16px;
    span {
      color: #bebebe;
    }
  }

  .disableH2H {
    font-size: 14px;
    span {
      color: #bebebe;
      margin-left: 12px;
    }
  }

  .undisableH2H {
    font-size: 20px;
    .setting {
      button {
        background-color: #121520;
        border: none;
      }
    }
    .connect-h2h {
      button {
        background-color: #121520;
        border: none;
      }
    }
    span {
      color: #bebebe;
      margin-left: 7px;
    }
  }

  .attribute-container {
    width: 100%;
    .width-attributeBox {
      // flex: 0 0 auto;
      min-width: ${({ total }) => (total > 1000 ? 10.5 : 8.5)}%;
      margin-right: 1%;
      margin-left: 1%;
    }
  }

  .search-my-horse {
    display: flex;
    margin-top: 8px;
    width: 700px;
    justify-content: space-between;
    .title {
      font-size: 22px;
    }
    .search-container {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      & > div {
        height: 34px;
      }
    }
  }

  .my-horse-container {
    background-color: #121520;
    padding: 32px 64px;
    width: 832px;

    ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
      padding: 32px;
    }

    ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
      padding: 16px 12px;
    }
    ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
      overflow-x: scroll;
    }

    .header-horse {
      font-size: 16px;
      span {
        color: #8d8d8d;
      }

      .horse {
        padding-left: 30px;
      }

      .classes {
        width: 12%;
      }

      .status {
        margin-left: 35px;
      }
    }

    .my-horse-table {
      width: 705px;
      border-collapse: separate;
      border-spacing: 0px 16px;

      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        min-width: 760px;
      }

      tr {
        background-color: #252b43;
      }
    }

    .margin-left-11 {
      margin-left: 11px;
    }

    .width-27 {
      width: 27%;
    }

    .width-25 {
      width: 25%;
    }

    .width-20 {
      width: 20%;
    }

    .width-22 {
      width: 22%;
    }

    .width-15 {
      width: 15%;
    }

    .width-5 {
      width: 5%;
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
  }
`

export default ProfileCloneStyled

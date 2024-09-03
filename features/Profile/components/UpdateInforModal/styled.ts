import styled from 'styled-components'

const UpdateInforModalStyled = styled.div`
  background-color: ${({ theme }) => theme.color.neutral};
  clip-path: polygon(0 0, 100% 0, 100% 100%, 40px 100%, 0 calc(100% - 40px));
  padding: 25px 146px 60px 186px;
  width: 768px;
  position: relative;
  height: 487px;

  .avatar-design {
    .avatar-box {
      aspect-ratio: 1 / 1;
      width: 115px;

      ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
        width: 114px;
      }

      &:hover {
        .avatar-overlay {
          display: flex;
        }
      }

      .center {
        .avatar {
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
      }

      .avatar-overlay {
        background-color: rgb(0 0 0 / 25%);
        bottom: 0;
        left: 0;
        display: none;

        img {
          ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
            width: 17px;
          }
        }

        .circel-primary {
          position: absolute;
          top: -64px;
          height: 122px;
        }

        .overlay-text {
          font-size: 14px;
          line-height: 20px;

          ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
            font-size: 12px;
            line-height: 14px;
          }
        }
      }
    }
  }

  .user-name-input {
    margin-top: 50px;
    padding-bottom: 100px;
    .user-name-title {
      font-size: 22px;
    }

    .search-container {
      padding-top: 10px;
    }
  }

  .btn-cancel-save {
    button {
      background-color: ${({ theme }) => theme.color.neutral};
      border: none;
    }

    .btn-cancel {
      margin-left: -6px;
    }

    .btn-save {
      margin-right: -6px;
    }
  }

  .column {
    top: 0;
    right: 0;
  }
`

export default UpdateInforModalStyled

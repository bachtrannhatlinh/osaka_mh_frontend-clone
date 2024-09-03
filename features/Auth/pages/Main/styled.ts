import styled from 'styled-components'

const AuthStyled = styled.div`
  .login {
    .container {
      .title-container {
        margin-top: 64px;

        .title {
          font-size: 32px;
          line-height: 26px;

          margin-bottom: 12px;
        }

        .sub-title {
          font-size: 16px;
          line-height: 20px;
        }
      }

      .login-container {
        margin-top: 40px;

        .login-wrapper {
          gap: 24px;

          .login-btn {
            border: none;
            opacity: 0.8;

            ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
              width: 100%;
              max-width: 273px;
            }

            &.login-btn--loading {
              opacity: 0.6;
            }

            .login-img {
              ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
                width: 100%;
              }
            }
            .login-img:hover {
              box-shadow: 0px 0 10px #f5cc00, 0 0 5px #f5cc00, 0 0 14px #2196f3;
            }
          }

          .login-btn:hover{
            opacity: 1;
          }
        }
      }

      .err-container {
        margin-top: 40px;
      }
    }
  }
`

export default AuthStyled

import styled from 'styled-components'

const MailBoxItemRead = styled.tr`
  .mail-container {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 14px 100%, 0 calc(100% - 14px));
    background-color: #191d2c;
    vertical-align: middle;
    cursor: pointer;
    display: flex;
    align-items: center;
    .block-title-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      gap: 20px;
      font-size: 16px;
      line-height: 20px;
      .title {
        width: 300px;
        span {
          font-size: 20px;
        }
      }

      .content {
        width: 790px;
        font-size: 20px;
      }
    }

    .delete-mail-item {
      text-align: end;
      font-size: 16px;
      line-height: 20px;
    }

    .width-20 {
      width: 20%;
    }
  }
  .mail-viewed {
    background-color: #48578e;
  }
`

export default MailBoxItemRead

import { createGlobalStyle } from 'styled-components'

const CommonStyle = createGlobalStyle`
  body {
    font-family: 'BlenderPro-Book';
    background-color: #262626;
  }

  .font-bold {
    font-family: 'BlenderPro-Bold';
  }

  .color-primary {
    background: ${({ theme }) => theme.color.primary};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .color-secondary {
    color: ${({ theme }) => theme.color.secondary}
  }

  .color-white {
    color: ${({ theme }) => theme.color.white};
  }

  .color-neutral_gray {
    color: ${({ theme }) => theme.color.neutralGray}
  }

  .color-grey {
    color: ${({ theme }) => theme.color.grey}
  }

  .color-orange {
    color: ${({ theme }) => theme.color.orange}
  }

  .color-yellow {
    color: ${({ theme }) => theme.color.yellow}
  }

  .color-red {
    color: ${({ theme }) => theme.color.red}
  }

  .color-turf-field {
    color: #25D8FD;
  }

  .color-e-htc {
    color: #5778F6
  }

  .color-need-e-htc {
    color: #FF7A00; 
  }

  .color-e-prz {
    color: #5D9F48
  }

  .color-z-prz {
    color: #FAA34F
  }

  .max-width-150 {
    width: 150px;
  }

  .max-width-50 {
    width: 50px;
  }

  .max-width-60 {
    width: 60px;
  }

  .max-width-70 {
    width: 70px;
  }

  .max-width-80 {
    width: 80px;
  }

  .padding-left-header-10 {
    padding-left: 10px !important;
  }

  .padding-left-header-41 {
    padding-left: 41px !important;
  }

  .class-tag {
    margin-top: -25px;
  }

  .level-up-disable {
    position: relative;
    width: 75px;
    left: 30px;
    top: -18px;
    span {
      position: absolute;
      left: 53%;
      top: 28%;
      font-size: 16px;
      text-align: center;
    }
  }

  .font-size-20 {
    font-size: 20px;
  }

  .font-size-18 {
    font-size: 18px;
  }

  .body-content {
    white-space: pre-line;
  }
  .Toastify__toast-container--bottom-center {
    top: 40%
  }

  .ant-notification {
  .toast-normal {
    background-color: white;
    border-radius: 10px;
  }

  .toast-error {
    background-color: #e74c3c;
    border-radius: 10px;
  }

  .ant-notification-notice-content {
    padding-right: 0.5rem;
  }

  .toast-success {
    background-color: #107c20d6;
    border-radius: 10px;
  }
   .toast-warning {
    background-color: #f1c40f;
    border-radius: 10px;
  }

  .ant-notification-notice-description {
    font-size: 20px;
    font-weight: 700;
    color: white;
  }
  .ant-notification-notice-message {
    display: none;
  }
}

  
`

export default CommonStyle

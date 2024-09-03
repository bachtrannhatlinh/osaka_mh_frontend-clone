import styled from 'styled-components'

interface SelectDatePickerStyled {
  customClass?: string
}

const SelectDatePickerStyled = styled.div<SelectDatePickerStyled>`
  position: relative;
  margin-left: ${({ customClass }) => customClass};
  .calendar {
    position: absolute;
    top: 8px;
    right: 10px;
  }

  .time-calendar {
    position: absolute;
    top: 20%;
    left: 25%;
  }
  .cursor-pointer {
    cursor: pointer;
  }

  .react-datepicker {
    .react-datepicker__month-container{
      .react-datepicker__header {
        button {
          height: 30px;
        }
        p {
          margin-top: 5px;
          padding-left: 5px;
          padding-right: 5px;
        }
      }
    }
  }
`
export default SelectDatePickerStyled

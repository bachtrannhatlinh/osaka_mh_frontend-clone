import styled from 'styled-components'

const RadioButtonStyled = styled.div`
  .radio-btn {
    margin: 0px 16px;

    input[type='radio'] {
      &:checked + label:before {
        border-color: $md-radio-checked-color;
        animation: ripple 0.2s linear forwards;
      }

      &:checked + label:after {
        transform: scale(1);
      }
    }

    label {
      display: inline-block;
      height: $md-radio-size;
      position: relative;
      padding: 0 ($md-radio-size + 10px);
      margin: 0 8px;
      cursor: pointer;
      vertical-align: bottom;

      &:before,
      &:after {
        position: absolute;
        content: '';
        border-radius: 50%;
        transition: all 0.3s ease;
        transition-property: transform, border-color;
      }

      &:before {
        left: 0;
        top: 0;
        width: $md-radio-size;
        height: $md-radio-size;
        border: 2px solid $md-radio-border-color;
      }

      &:after {
        top: $md-radio-size / 2 - $md-radio-checked-size / 2;
        left: $md-radio-size / 2 - $md-radio-checked-size / 2;
        width: $md-radio-checked-size;
        height: $md-radio-checked-size;
        transform: scale(0);
        background: $md-radio-checked-color;
      }
    }
  }
`

export default RadioButtonStyled

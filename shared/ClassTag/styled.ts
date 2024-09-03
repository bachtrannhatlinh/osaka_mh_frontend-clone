import {
  CLASS_FIVE,
  CLASS_FOUR,
  CLASS_FREE_STYLE,
  CLASS_ONE,
  CLASS_SEVEN,
  CLASS_SIX,
  CLASS_THREE,
  CLASS_TWO,
  INACTIVE_TAG_BG,
  RACE_HOME
} from 'assets/images'
import styled from 'styled-components'

interface ClassTagStyledProps {
  isActive: boolean
  canBeClicked: boolean
  isInHomePage: boolean
  valueText: string
}

const handleBackgroundClass = (valueText: string) => {
  if (valueText === 'Class 1') {
    return CLASS_ONE
  }

  if (valueText === 'Class 2') {
    return CLASS_TWO
  }

  if (valueText === 'Class 3') {
    return CLASS_THREE
  }

  if (valueText === 'Class 4') {
    return CLASS_FOUR
  }

  if (valueText === 'Class 5') {
    return CLASS_FIVE
  }

  if (valueText === 'Class 6') {
    return CLASS_SIX
  }

  if (valueText === 'Class 7') {
    return CLASS_SEVEN
  }

  if (valueText === 'FreeStyle') {
    return CLASS_FREE_STYLE
  }
}

const ClassTagStyled = styled.div<ClassTagStyledProps>`
  height: ${({ isInHomePage }) => (isInHomePage ? '25px' : '31px')};
  width: ${({ isInHomePage }) => (isInHomePage ? '60px' : '70px')};
  margin-left: ${({ isInHomePage }) => (isInHomePage ? '10px' : '0px')};
  margin-top: ${({ isInHomePage }) => (isInHomePage ? '-3px' : '0px')};

  background-image: url(${({ isActive, isInHomePage, valueText }) =>
    isInHomePage ? RACE_HOME : isActive ? handleBackgroundClass(valueText) : INACTIVE_TAG_BG});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;

  cursor: ${({ canBeClicked }) => (canBeClicked ? 'pointer' : 'default')};

  .tag {
    font-size: 15px;
    line-height: 20px;
    color: ${({ theme, isActive }) => (isActive ? theme.color.white : theme.color.grey)};

    top: ${({ isInHomePage }) => (isInHomePage ? '32%' : '40%')};
    left: 35%;
    transform: translate(-50%, -50%);
    height: 15px;
    text-transform: uppercase;
  }
`

export default ClassTagStyled

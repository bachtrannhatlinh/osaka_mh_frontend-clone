import { ACTIVE_TAG_BG, CLASS_ALL, CLASS_DIRT, CLASS_FIVE, CLASS_FOUR, CLASS_FREE_STYLE, CLASS_ONE, CLASS_SEVEN, 
  CLASS_SIX, CLASS_THREE, CLASS_TURF, CLASS_TWO, INACTIVE_TAG_RESULT_BG, RACE_HOME } from 'assets/images'
import styled from 'styled-components'

interface ClassTagResultStyledProps {
  isActive: boolean
  canBeClicked: boolean
  isInHomePage: boolean
  valueText: string
  atResultRace: boolean
}

const handleBackgroundClass = (valueText: string) => {
  if(valueText === 'All'){
    return CLASS_ALL
  }

  if(valueText === 'Class 1'){
    return CLASS_ONE
  }

  if(valueText === 'Class 2'){
    return CLASS_TWO
  }

  if(valueText === 'Class 3'){
    return CLASS_THREE
  }

  if(valueText === 'Class 4'){
    return CLASS_FOUR
  }

  if(valueText === 'Class 5'){
    return CLASS_FIVE
  }

  if(valueText === 'Class 6'){
    return CLASS_SIX
  }

  if(valueText === 'Class 7'){
    return CLASS_SEVEN
  } 

  if(valueText === 'FreeStyle'){
    return CLASS_FREE_STYLE
  } 

  if(valueText === 'FreeStyle'){
    return CLASS_FREE_STYLE
  } 

  if(valueText === 'TURF'){
    return CLASS_TURF
  } 

  if(valueText === 'DIRT'){
    return CLASS_DIRT
  } 
}

const ClassTagResultStyled = styled.div<ClassTagResultStyledProps>`
  height: ${({ isInHomePage }) => (isInHomePage ? '25px' : '31px')};
  width: ${({ isInHomePage }) => (isInHomePage ? '60px' : '70px')};
  margin-left: ${({ isInHomePage }) => (isInHomePage ? '10px' : '0px')};
  margin-top: ${({ isInHomePage }) => (isInHomePage ? '-3px' : '0px')};

  background-image: url(${({ isActive, isInHomePage, valueText, atResultRace }) =>
    isInHomePage ? RACE_HOME : isActive ? handleBackgroundClass(valueText) || ACTIVE_TAG_BG : atResultRace ? INACTIVE_TAG_RESULT_BG : INACTIVE_TAG_RESULT_BG});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;

  cursor: ${({ canBeClicked }) => (canBeClicked ? 'pointer' : 'default')};

  .tag {
    font-size: ${({ isActive }) => (isActive ? '18px' : '16px')};
    line-height: 20px;
    color: ${({ theme, isActive }) => (isActive ? theme.color.white : theme.color.grey)};

    top: ${({ isInHomePage }) => (isInHomePage ? '32%' : '40%')};
    left: ${({ isActive }) => (isActive ? '40%' : '50%')};
    transform: translate(-50%, -50%);
    height: 15px;
  }
`

export default ClassTagResultStyled

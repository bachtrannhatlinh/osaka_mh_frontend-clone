import StarInStyled from './Styled'
import { formatTimeMS } from 'utils/helper'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { useTranslation } from 'react-i18next'

interface StarInProps {
  firstTime?: number
}

function StarIn({ firstTime }: StarInProps) {
  const { t } = useTranslation()
  return (
    <StarInStyled>
      <div className='star-in'>{t(`${NOTIFICATION_MESSAGE}.startIn`)}</div>
      <div className='hour-minute-sec'>{formatTimeMS(firstTime ?? 0)}</div>
    </StarInStyled>
  )
}

export default StarIn

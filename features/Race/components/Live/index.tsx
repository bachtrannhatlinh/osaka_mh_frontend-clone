import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { useTranslation } from 'react-i18next'
import LiveStyled from './styled'

function StarIn() {
  const { t } = useTranslation()
  return (
    <LiveStyled>
      <div className='starts-in d-flex align-items-center font-bold'>
        <div className='dot' />
        <span className='live font-bold'>{t(`${NOTIFICATION_MESSAGE}.live`)}</span>
      </div>
    </LiveStyled>
  )
}

export default StarIn

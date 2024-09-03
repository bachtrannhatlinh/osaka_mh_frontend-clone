import { links } from 'apps'
import { ResultHorseModal } from 'features/Race/components'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function DisableAccount() {
  const navigate = useNavigate()
  const handleOk = () => {
    navigate(links.home.index())
  }
  const { t } = useTranslation()

  return (
    <ResultHorseModal
      title={'warning'}
      onOk={handleOk}
      message={t(`${NOTIFICATION_MESSAGE}.accountLoggedAnotherDevice`)}
      exchangeCoin={true}
    />
  )
}

import { TWO_LINE } from 'assets/images'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { useTranslation } from 'react-i18next'
import { Modal } from 'shared'
import StyledInProgressBalance from './styled'

interface InProgressBalanceModalProps {
  confirmTransaction?: boolean
  title?: string
}

export default function InProgressBalanceModal({ confirmTransaction, title }: InProgressBalanceModalProps) {
  const { t } = useTranslation()
  return (
    <Modal>
      <StyledInProgressBalance>
        <div className='balance'>
          <div className='title font-bold text-uppercase color-primary'>
            {title ? title : t(`${NOTIFICATION_MESSAGE}.balanceProgress`)}
          </div>
          <img src={TWO_LINE} alt='' className='line' />
          <div className='loading'>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          {confirmTransaction === true ? (
            <>
              <div className='color-orange watting-transaction'>{t(`${NOTIFICATION_MESSAGE}.noCloseReload`)}</div>
              <div className='color-orange content'>{t(`${NOTIFICATION_MESSAGE}.processingTransaction`)}</div>
            </>
          ) : (
            <>
              <div className='color-orange watting-transaction'>{t(`${NOTIFICATION_MESSAGE}.waitingTransaction`)}</div>
              <div className='color-orange content'>{t(`${NOTIFICATION_MESSAGE}.cannotTransaction`)}</div>
            </>
          )}
        </div>
      </StyledInProgressBalance>
    </Modal>
  )
}

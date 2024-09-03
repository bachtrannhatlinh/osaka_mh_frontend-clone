import { Dispatch, SetStateAction } from 'react'
import { Race } from 'models'
import { ClassTag, Modal } from 'shared'
import ChooseHorseItem from '../ChooseHorseItem'
import ConfirmChooseHorseModalStyled from './styled'
import { BTN_BACK, BTN_CONFIRM, CLOSE_BTN, GAME_TOKEN_E_HTC } from 'assets/images'
import horseApi from 'apis/horseApi'
import { useFetch } from 'hooks'
import { useTranslation } from 'react-i18next'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'

interface ConfirmChooseHorseModalProps {
  race: Race
  joiningGate: number
  toggleIsModalOpen: (value?: boolean) => void
  toggleIsChooseHorseModal: (value?: boolean) => void
  setTriggerFetchRaceDetail: Dispatch<SetStateAction<boolean>>
  hadJoined: boolean
  onCloseButtonClick: () => void
  horseConfirmId: number
  onConfirm: () => void
}

function ConfirmChooseHorseModal({
  race,
  toggleIsModalOpen,
  onCloseButtonClick,
  horseConfirmId,
  toggleIsChooseHorseModal,
  onConfirm,
  joiningGate
}: ConfirmChooseHorseModalProps) {
  const { loading, data: horse } = useFetch(
    { fetcher: horseApi.getHorseAvailableDetail, params: horseConfirmId.toString() },
    [horseConfirmId]
  )
  const { t } = useTranslation()

  const handleBackModalChooseHorse = () => {
    toggleIsChooseHorseModal(true)
    onCloseButtonClick()
  }

  return (
    <Modal onOverlayClick={toggleIsModalOpen}>
      {!loading && (
        <ConfirmChooseHorseModalStyled>
          <div className='choose-horse-modal'>
            <button className='close-btn p-0 position-absolute' role='button' onClick={handleBackModalChooseHorse}>
              <img src={CLOSE_BTN} alt='close' />
            </button>
            <div className='race-name-container d-flex align-items-center justify-content-between'>
              <div className='d-flex align-items-center'>
                <div className='race-name color-white font-bold text-uppercase'>{race.name}</div>
                <div className='race-class ps-2'>
                  <ClassTag text={race.racing_class.name} isActive />
                </div>
              </div>
              <div className='pe-3'>
                <span className='race-info-item d-flex align-items-center gate-no'>
                  <span className='race-info-title color-white'>{t(`${NOTIFICATION_MESSAGE}.gateNo`)}</span>
                  <span className='race-info-content color-white ps-1'> {joiningGate}</span>
                </span>
              </div>
            </div>
            <div className='race-info-container d-flex align-items-center justify-content-between pe-3'>
              <div className='race-info-item d-flex align-items-center'>
                <span className='race-info-title color-grey'>{t(`${NOTIFICATION_MESSAGE}.racecourse`)}</span>
                <span className='race-info-content color-white'>{race.course.name}</span>
              </div>
              <div className='race-info-item d-flex align-items-center'>
                <span className='race-info-title color-grey'>{t(`${NOTIFICATION_MESSAGE}.fieldType`)}</span>
                <span className='race-info-content color-white'>{race.field_type.type}</span>
              </div>
              <div className='race-info-item d-flex align-items-center'>
                <span className='race-info-title color-grey'>{t(`${NOTIFICATION_MESSAGE}.distance`)}</span>
                <span className='race-info-content color-white'>{race.distance?.distance.toLocaleString()}m</span>
              </div>
              <div className='race-info-item d-flex align-items-center'>
                <span className='race-info-title color-grey'>{t(`${NOTIFICATION_MESSAGE}.entryFee`)}</span>
                {race.entry_fee === 0 ? (
                  <span className='race-info-content font-bold color-primary'>{t(`${NOTIFICATION_MESSAGE}.free`)}</span>
                ) : (
                  <span className='race-info-content font-bold color-e-htc'>
                    {race.entry_fee}
                    <img src={GAME_TOKEN_E_HTC} alt='e-htc' />
                  </span>
                )}
              </div>
            </div>
            <p className='race-fee text-white'>{t(`${NOTIFICATION_MESSAGE}.chosenRace`)}</p>
            {horse && (
              <div className='horse-list-container d-flex flex-column'>
                <ChooseHorseItem horse={horse} customClass='active' />
              </div>
            )}
            <div className='confirm-horse'>
              <p className='confirm-horse-title color-white'>{t(`${NOTIFICATION_MESSAGE}.okWithThis`)}</p>
              <div className='confirm-horse-btns d-flex align-items-center justify-content-center'>
                <button className='back-btn' onClick={handleBackModalChooseHorse}>
                  <img src={BTN_BACK} alt='back' />
                </button>
                <button onClick={onConfirm} className='confirm-btn'>
                  <img src={BTN_CONFIRM} alt='confirm' />
                </button>
              </div>
            </div>
          </div>
        </ConfirmChooseHorseModalStyled>
      )}
    </Modal>
  )
}

export default ConfirmChooseHorseModal

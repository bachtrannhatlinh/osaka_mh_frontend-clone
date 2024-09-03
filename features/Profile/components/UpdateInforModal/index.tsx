import userApi from 'apis/userApi'
import { MESSAGE } from 'apps'
import {
  AVATAR_DEFAULT,
  CANCEL_UPDATE_INFOR,
  CIRCEL_PRIMARY,
  COLUMN_PRIMARY,
  PEN_PRIMARY,
  SAVE_UPDATE_INFOR,
  SAVE_DISABLE
} from 'assets/images'
import { ResultHorseModal } from 'features/Race/components'
import { useAppSelector, useReloadCurrentPage, useToggle } from 'hooks'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { MyInforMation } from 'models'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from 'shared'
import Input from 'shared/Input'
import { handleAsyncRequest } from 'utils/helper'
import UpdateInforModalStyled from './styled'

interface ResultHorseModalProps {
  toggleIsModalOpen: (value?: boolean) => void
  onCancelUpdate: () => void
}

export default function UpdateInforModal({ toggleIsModalOpen, onCancelUpdate }: ResultHorseModalProps) {
  const myInformationParams: MyInforMation = {
    avatar: '',
    description: '',
    email: '',
    name: '',
    avatarFile: null
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [avatar, setAvatar] = useState<string>('') as any
  const profile = useAppSelector(state => state.profile)
  const [nameValue, setNameValue] = useState<string>('')
  const [isModalUpdateInforOpen, toggleIsModalUpdateInforOpen] = useToggle(false)
  const [flagMsgError, setFlagMsgError] = useState<boolean>(false)
  const [titleBalace, setTitleBalance] = useState<string>('')
  const messageSuccess = MESSAGE.successfully_updated
  const messageFailed = MESSAGE.image_over_5mb
  const { t } = useTranslation()
  const handleCloseModalResult = () => toggleIsModalUpdateInforOpen(false)

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview)
    }
  }, [avatar])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePreviewAvatar = (e: any) => {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)
    const blob = new Blob([file], { type: 'image/png' })

    myInformationParams.avatar = blob.toString()

    setAvatar(file)
  }

  const handleSearchValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value)
  }

  const handleSaveUpdate = async () => {
    const formData = new FormData()
    formData.append('avatarFile', avatar)
    formData.append('name', nameValue)
    formData.append('email', myInformationParams.email)
    formData.append('description', myInformationParams.description)
    const [error, result] = await handleAsyncRequest(userApi.postUpdateUser(formData))
    if (error) {
      toggleIsModalUpdateInforOpen(true)
      setTitleBalance('failed!')
      setFlagMsgError(true)
    }

    if (result) {
      toggleIsModalUpdateInforOpen(true)
      setTitleBalance('success!')
      setFlagMsgError(false)
    }
  }

  const handleOk = () => {
    toggleIsModalUpdateInforOpen(false)
    useReloadCurrentPage()
  }

  const handleOkClone = () => {
    toggleIsModalUpdateInforOpen(false)
  }

  const handleAvatar = useCallback(() => {
    if (avatar) {
      return avatar.preview
    }
    return profile.avatar
  }, [profile, avatar])

  const handleDisabledImg = useCallback(() => {
    if (avatar || nameValue) {
      return false
    }

    return true
  }, [nameValue, avatar])

  return (
    <Modal onOverlayClick={toggleIsModalOpen}>
      <UpdateInforModalStyled>
        <div className='avatar-design d-flex justify-content-center'>
          <div className='avatar-box overflow-hidden rounded-circle '>
            <div className='avatar-box position-relative overflow-hidden rounded-circle'>
              <span className='center'>
                <img src={handleAvatar() ?? AVATAR_DEFAULT} alt='' className='avatar' />
              </span>
              <label
                htmlFor='avatar'
                className='avatar-overlay position-absolute flex-column align-items-center justify-content-center w-100 h-50'
                role='button'
              >
                <img src={CIRCEL_PRIMARY} alt='' className='circel-primary' />
                <img src={PEN_PRIMARY} alt='' />
              </label>
              <input id='avatar' type='file' accept='image/*' className='d-none' onChange={handlePreviewAvatar} />
            </div>
          </div>
        </div>
        <div className='user-name-input'>
          <span className='color-white user-name-title'>{t(`${NOTIFICATION_MESSAGE}.userName`)}</span>
          <span className='search-container'>
            <Input
              searchValue={profile.name}
              handleSearchValueChanged={handleSearchValueChanged}
              customClass='search-horse-input'
            />
          </span>
        </div>
        <div className='btn-cancel-save d-flex justify-content-between'>
          <button onClick={onCancelUpdate} className='btn-cancel'>
            <img src={CANCEL_UPDATE_INFOR} alt='' />
          </button>
          <button onClick={handleSaveUpdate} className='btn-save' disabled={handleDisabledImg()}>
            <img src={handleDisabledImg() ? SAVE_DISABLE : SAVE_UPDATE_INFOR} alt='' />
          </button>
        </div>
        <div className='position-absolute column'>
          <img src={COLUMN_PRIMARY} alt='' />
        </div>
      </UpdateInforModalStyled>
      {isModalUpdateInforOpen && (
        <ResultHorseModal
          toggleIsModalOpen={toggleIsModalUpdateInforOpen}
          title={titleBalace}
          onCloseButtonClick={handleCloseModalResult}
          onOk={flagMsgError ? handleOkClone : handleOk}
          message={flagMsgError ? messageFailed : messageSuccess}
        />
      )}
    </Modal>
  )
}

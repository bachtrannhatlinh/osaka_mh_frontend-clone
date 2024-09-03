import mailbox from 'apis/mailbox'
import { CLOSE_BTN } from 'assets/images'
import UserNotication from 'shared/Header/components/UserNotication'
import { useEventListener, useFetch } from 'hooks'
import { GetUserNoticationtParams } from 'models/mailbox'
import { useRef, useState } from 'react'
import { Modal } from 'shared'
import MailBoxStyled from './styled'

interface MailBoxProps {
  onCloseMailBox: () => void
}

export default function MailBox({ onCloseMailBox }: MailBoxProps) {
  const getUserNoticationtParams: GetUserNoticationtParams = {
    limit: 999999,
    page: 1,
    type: 'RACE'
  }

  const [params, setParams] = useState<GetUserNoticationtParams>(getUserNoticationtParams)
  const [typeSelected, setTypeSelected] = useState<string>('')
  const mailBoxListRef = useRef<HTMLDivElement>(null)
  const FETCH_MAILBOX_REMAIN_HEIGHT = 100

  const { loading: mailBoxListLoading, data: getUserNoticationtResponse } = useFetch(
    {
      fetcher: mailbox.getUserNotication,
      params: params
    },
    [params]
  )

  const isFetchingHorseValid = (horseListDiv: HTMLDivElement): boolean => {
    const { scrollHeight, scrollTop, clientHeight } = horseListDiv
    const isValid: boolean =
      scrollHeight - (scrollTop + clientHeight) <= FETCH_MAILBOX_REMAIN_HEIGHT &&
      !mailBoxListLoading &&
      getUserNoticationtResponse?.total_page !== params.page

    return isValid
  }

  const handleHoresListScroll = () => {
    if (!mailBoxListRef.current) return
    if (!isFetchingHorseValid(mailBoxListRef.current)) return
    setParams({ ...params, page: params.page + 1 })
  }

  useEventListener('scroll', handleHoresListScroll, mailBoxListRef)

  const getNotifications = (type: string) => {
    setParams({ ...params, type: type })
    setTypeSelected(type)
  }

  return (
    <Modal>
      <MailBoxStyled>
        <button className='close-btn p-0' role='button' onClick={onCloseMailBox}>
          <img src={CLOSE_BTN} alt='close' />
        </button>
        <div className='d-flex'>
          <div className='content-left color-white d-flex align-items-center'>
            <ul>
              <li onClick={() => getNotifications('RACE')}>Race Mail</li>
              <li onClick={() => getNotifications('EVENT')}>Event Mail</li>
              <li onClick={() => getNotifications('SYSTEM')}>System Mail</li>
            </ul>
          </div>
          <div className='content-right' ref={mailBoxListRef}>
            <UserNotication listUserNotication={getUserNoticationtResponse?.records} type={typeSelected} />
          </div>
        </div>
      </MailBoxStyled>
    </Modal>
  )
}

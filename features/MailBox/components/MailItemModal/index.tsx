/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mailbox from 'apis/mailbox'
import { CLAIMED_ITEM, CLAIM_ITEM, CLOSE_BTN, GAME_TOKEN_E_HTC, GAME_TOKEN_E_PRZ } from 'assets/images'
import { ResultHorseModal } from 'features/Race/components'
import { useReloadCurrentPage, useUpdateEffect } from 'hooks'
import { ApiResponse, Coin } from 'models'
import { GetUserNoticationCommonResponse, UserNoticationtResponse } from 'models/mailbox'
import { useEffect, useState } from 'react'
import { ClassTag, Modal } from 'shared'
import { handleAsyncRequest } from 'utils/helper'
import MailItemModalStyled from './styled'

interface MailItemModalProps {
  onCloseButtonClick: () => void
  idBeChoose: number
  listMailBoxItem?: UserNoticationtResponse[]
}

export default function MailItemModal({ onCloseButtonClick, idBeChoose, listMailBoxItem }: MailItemModalProps) {
  const [coinHTC, setCoinHTC] = useState<number>(0)
  const [coinPRZ, setCoinPRZ] = useState<number>(0)
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false)
  const [titleBalace, setTitleBalance] = useState<string>('')
  const [messageError, setMessageError] = useState<string>('')
  const [flagWarning, setFlagWarning] = useState<boolean>(false)
  const [detailMailItem, setDetailMailItem] = useState<UserNoticationtResponse[]>()
  const messageSuccessClaim = `Claim item successfully`

  useEffect(() => {
    if (!listMailBoxItem) return

    setDetailMailItem(listMailBoxItem.filter(mailItem => mailItem.id === idBeChoose))
  }, [listMailBoxItem])

  useUpdateEffect(() => {
    if (!detailMailItem) return
    const handleCoinUser = (data: any) => {
      data.items?.filter((item: Coin) => {
        if (item.item_type === 'E_HTC') {
          setCoinHTC(item.amount)
        }

        if (item.item_type === 'E_PRZ') {
          setCoinPRZ(item.amount)
        }
      })
    }

    handleCoinUser(detailMailItem[0])
  }, [detailMailItem])

  const handleUserNoticationClaim = async (userNotication: UserNoticationtResponse) => {
    if (userNotication.claimed === false) {
      const [, respClaimNotication] = await handleAsyncRequest<ApiResponse<GetUserNoticationCommonResponse>>(
        mailbox.postUserNoticationClaim(userNotication.id)
      )

      if (respClaimNotication?.code === 200) {
        setOpenModalSuccess(true)
        setTitleBalance('success!')
        setMessageError(messageSuccessClaim)
      }
    } else {
      setFlagWarning(true)
      setOpenModalSuccess(true)
      setTitleBalance('warning')
      setMessageError('warning claim')
    }
  }

  const handleOk = () => {
    if (flagWarning == true) {
      setOpenModalSuccess(false)
    } else {
      setOpenModalSuccess(false)
      // useReloadCurrentPage()
    }
  }

  useEffect(() => {
    if (!detailMailItem) return

    handleUserNoticationRead(detailMailItem[0])
  }, [detailMailItem])

  const handleUserNoticationRead = async (userNotication: UserNoticationtResponse) => {
    const [,] = await handleAsyncRequest<ApiResponse<GetUserNoticationCommonResponse>>(
      mailbox.postUserNoticationRead(userNotication.id)
    )
  }

  return (
    <>
      {detailMailItem && (
        <Modal>
          <MailItemModalStyled>
            <button className='close-btn p-0 position-absolute' role='button' onClick={onCloseButtonClick}>
              <img src={CLOSE_BTN} alt='close' />
            </button>
            <div className='title-mail-item font-bold mt-2'>{detailMailItem[0].title.toLocaleUpperCase()}</div>
            <div className='content-mail-item '>{detailMailItem[0].content}</div>
            {/* 
            START TODO 20220929 LinhBTN comment source code claim mail
            */}
            {/* {detailMailItem[0].items !== null && (
              <div className='d-flex justify-content-around item-mail-items'>
                {coinHTC > 0 && (
                  <div className='e-htc'>
                    <span>{coinHTC}</span>
                    <img src={GAME_TOKEN_E_HTC} alt='e-htc' className='game-token-e-htc' />
                    <ClassTag isActive={false} customClass='class-tag ' />
                  </div>
                )}
                {coinPRZ > 0 && (
                  <div className='e-prz'>
                    <span>{coinPRZ}</span>
                    <img src={GAME_TOKEN_E_PRZ} alt='' className='game-token-e-prz' />
                    <ClassTag isActive={false} customClass='class-tag ' />
                  </div>
                )}
              </div>
            )}
            <div className='d-flex justify-content-center claim-content'>
              {detailMailItem[0].items !== null ? (
                detailMailItem[0].claimed === false ? (
                  <button className='claim-item' onClick={() => handleUserNoticationClaim(detailMailItem[0])}>
                    <img src={CLAIM_ITEM} alt='claim-item' />
                  </button>
                ) : (
                  <button className='claim-item'>
                    <img src={CLAIMED_ITEM} alt='claim-item' />
                  </button>
                )
              ) : (
                ''
              )}
            </div> */}
            {/* 
            END TODO 20220929 LinhBTN comment source code claim mail
            */}
          </MailItemModalStyled>
          {openModalSuccess && (
            <ResultHorseModal title={titleBalace} onOk={handleOk} message={messageError} exchangeCoin={true} />
          )}
        </Modal>
      )}
    </>
  )
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import mailbox from 'apis/mailbox'
import userApi from 'apis/userApi'
import ResultHorseModal from 'features/Race/components/ResultHorseModal'
import { useAppDispatch, useReloadCurrentPage } from 'hooks'
import { ApiResponse } from 'models'
import { GetUserNoticationCommonResponse, GetUserNoticationtParams, UserNoticationtResponse } from 'models/mailbox'
import { useState } from 'react'
import { handleAsyncRequest } from 'utils/helper'
import { setCoinUser } from 'features/Balance/coinUser.slice'

import UserNoticationStyled from './styled'

interface UserNoticationProps {
  listUserNotication?: UserNoticationtResponse[]
  type: string
}

export default function UserNotication({ listUserNotication, type }: UserNoticationProps) {
  const getUserNoticationtParams: GetUserNoticationtParams = {
    limit: 10,
    page: 1
  }
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string>('')
  const [titleBalace, setTitleBalance] = useState<string>('')
  const [flagWarning, setFlagWarning] = useState<boolean>(false)
  const messageSuccess = `Success`
  const messageWarningDelete = `U Should Claim Before Do Delete`
  const dispatch = useAppDispatch()
  const [paramsNew, setParamsNew] = useState<GetUserNoticationtParams>(getUserNoticationtParams)

  const fetchCoinUser = async () => {
    const [, resultCoinUser] = await handleAsyncRequest(userApi.getUserItems())
    if (!resultCoinUser) return

    dispatch(setCoinUser(resultCoinUser.data))
  }

  const handleUserNoticationClaim = async (userNotication: UserNoticationtResponse) => {
    if (userNotication.claimed === false) {
      const [error, respClaimNotication] = await handleAsyncRequest<ApiResponse<GetUserNoticationCommonResponse>>(
        mailbox.postUserNoticationClaim(userNotication.id)
      )
      if (respClaimNotication?.code === 200) {
        setOpenModalSuccess(true)
        setTitleBalance('success!')
        setMessageError(messageSuccess)
        setParamsNew({ ...paramsNew, type: type })
      }
    } else {
      setFlagWarning(true)
      setOpenModalSuccess(true)
      setTitleBalance('warning')
      setMessageError('warning claim')
    }
  }

  const handleUserNoticationDelete = async (userNotication: UserNoticationtResponse) => {
    if (userNotication.claimed === true) {
      const [error, respDeleteNotication] = await handleAsyncRequest<ApiResponse<GetUserNoticationCommonResponse>>(
        mailbox.postUserNoticationDelete(userNotication.id)
      )
      if (respDeleteNotication?.code === 200) {
        setOpenModalSuccess(true)
        setTitleBalance('success!')
        setMessageError(messageSuccess)
      }
    } else {
      setFlagWarning(false)
      setOpenModalSuccess(true)
      setTitleBalance('warning')
      setMessageError(messageWarningDelete)
    }
  }

  const fetchUserNotication = async () => {
    const [, getUserNoticationtResponse] = await handleAsyncRequest(mailbox.getUserNotication(paramsNew))
  }

  const handleOk = () => {
    if (flagWarning === true) {
      fetchCoinUser()
      fetchUserNotication()
      useReloadCurrentPage()
    } else {
      fetchCoinUser()
      fetchUserNotication()
      setOpenModalSuccess(false)
    }
  }

  const handleUserNoticationRead = async (userNotication: UserNoticationtResponse) => {
    const [error, respReadNotication] = await handleAsyncRequest<ApiResponse<GetUserNoticationCommonResponse>>(
      mailbox.postUserNoticationRead(userNotication.id)
    )
    if (respReadNotication?.code === 200) {
      setOpenModalSuccess(true)
      setTitleBalance('success!')
      setMessageError(messageSuccess)
    }
  }

  const handleUserNoticationReadAll = async (type: string) => {
    const [, respReadAllNotication] = await handleAsyncRequest<ApiResponse<GetUserNoticationCommonResponse>>(
      mailbox.postUserNoticationReadAll(type)
    )
    if (respReadAllNotication?.code === 200) {
      setOpenModalSuccess(true)
      setTitleBalance('success!')
      setMessageError(messageSuccess)
    }
  }

  const listUserNoticationRender = (
    <ul className='color-white'>
      {listUserNotication &&
        listUserNotication.map(userNotication => {
          if (userNotication.seen === true) {
            return (
              <div className='active-item item-active mt-3' key={userNotication.id}>
                <li className='item-seen'>{userNotication.title}</li>
                <li className='item-seen'>{userNotication.content}</li>
                <div className='d-flex justify-content-left '>
                  {userNotication.claimed === true ? (
                    ''
                  ) : (
                    <button className='claim' onClick={() => handleUserNoticationClaim(userNotication)}>
                      claim
                    </button>
                  )}

                  <button className='delete' onClick={() => handleUserNoticationDelete(userNotication)}>
                    delete
                  </button>
                </div>
              </div>
            )
          } else {
            return (
              <div className='active-item' key={userNotication.id}>
                <li className='item-not-seen'>{userNotication.title}</li>
                <li className='item-not-seen'>{userNotication.content}</li>
                <div className='d-flex justify-content-left mt-3 mb-3'>
                  {userNotication.claimed === true ? (
                    ''
                  ) : (
                    <button className='claim' onClick={() => handleUserNoticationClaim(userNotication)}>
                      claim
                    </button>
                  )}

                  <button className='delete' onClick={() => handleUserNoticationDelete(userNotication)}>
                    delete
                  </button>
                  <button className='read' onClick={() => handleUserNoticationRead(userNotication)}>
                    read
                  </button>
                </div>
              </div>
            )
          }
        })}
      {listUserNotication && listUserNotication.length > 0 ? (
        <div className='d-flex justify-content-left'>
          <button className=' read-all mt-3 mb-3' onClick={() => handleUserNoticationReadAll(type)}>
            read-all
          </button>
        </div>
      ) : (
        ''
      )}
    </ul>
  )

  return (
    <UserNoticationStyled>
      <div>{listUserNoticationRender}</div>
      {openModalSuccess && (
        <ResultHorseModal title={titleBalace} onOk={handleOk} message={messageError} exchangeCoin={true} />
      )}
    </UserNoticationStyled>
  )
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import mailbox from 'apis/mailbox'
import { READED_ALL_MAIL_ITEM, READ_ALL_MAIL_ITEM } from 'assets/images'
import HorseModalConfirm from 'features/Horse/components/HourseModalConfirm'
import MailBoxItem from 'features/MailBox/components/MailBoxItemRead'
import MailItemModal from 'features/MailBox/components/MailItemModal'
import { ResultHorseModal } from 'features/Race/components'
import { useFetch, usePreventBodyScroll, useToggle } from 'hooks'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { ApiResponse } from 'models'
import {
  GetUserNoticationCommonResponse,
  GetUserNoticationtParams,
  GetUserNoticationtResponse,
  UserNoticationtResponse,
  MailStatusFilter
} from 'models/mailbox'
import Select from 'shared/Select'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactPaginate from 'react-paginate'
import { useSearchParams } from 'react-router-dom'
import { handleAsyncRequest } from 'utils/helper'
import MailRaceStyled from './styled'
import { MailStatusOptions } from 'apps/constants'

export default function EventMail() {
  const [listMailBoxItem, setListMailBoxItem] = useState<UserNoticationtResponse[]>([])
  const [userNotication, setUserNotication] = useState<UserNoticationtResponse>()
  const [isOpenMailItemModal, setOpenMailItemModal] = useState<boolean>(false)
  const [mailStatusFilters, setMailStatusFilters] = useState<MailStatusFilter[]>(MailStatusOptions)
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [messageError, setMessageError] = useState<string>('')
  const [isModalOpen, toggleIsModalOpen] = useToggle(false)
  const [titleBalace, setTitleBalance] = useState<string>('')
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false)
  const [idBeChoose, setIdBeChoose] = useState<number>(0)
  const [pageCount, setPageCount] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [checkAllItemRead, setCheckAllItemRead] = useState<number>(0)
  const [flagDeleteItem, setFlagDeleteItem] = useState<boolean>(false)
  const [isModalOpenReadAllMail, toggleIsModalOpenReadAllMail] = useToggle(false)
  const [flagReadAllItem, setFlagReadAllItem] = useState<boolean>(false)
  const { t } = useTranslation()
  usePreventBodyScroll(isOpenMailItemModal)
  usePreventBodyScroll(isModalOpenReadAllMail)
  usePreventBodyScroll(isModalOpen)
  const [searchParams, setSearchParams] = useSearchParams() as any
  const paramsSearch = Object.fromEntries(searchParams.entries())
  const getUserNoticationtParams: GetUserNoticationtParams = {
    limit: 10,
    type: 'EVENT',
    page: paramsSearch.page ? +paramsSearch.page : 1
  }
  const [params, setParams] = useState<GetUserNoticationtParams>(getUserNoticationtParams)
  const { data: getUserNoticationtResponse } = useFetch<GetUserNoticationtResponse, GetUserNoticationtParams>(
    {
      fetcher: mailbox.getUserNotication,
      params: { ...params, page: paramsSearch.page ? +paramsSearch.page : params.page }
    },
    [params]
  )
  const handleCloseModal = () => toggleIsModalOpen(false)

  const handleCloseReadALLMailModal = () => toggleIsModalOpenReadAllMail(false)

  useEffect(() => {
    if (!getUserNoticationtResponse) return
    setListMailBoxItem(getUserNoticationtResponse.records)
    setCheckAllItemRead(getUserNoticationtResponse.records.filter(item => item.seen === false).length)
    setPageCount(getUserNoticationtResponse.total_page)
    setTotal(getUserNoticationtResponse.total)

  }, [getUserNoticationtResponse])

  const handleOpenModalMailItem = (id: number) => {
    setOpenMailItemModal(true)
    setIdBeChoose(id)
  }

  const handleDeleteMailItem = async (userNotication: UserNoticationtResponse) => {
    toggleIsModalOpen(true)
    setUserNotication(userNotication)
  }

  const handleConfirmModal = async () => {
    setFlagDeleteItem(true)
  }

  useEffect(() => {
    if (flagDeleteItem === true && userNotication !== null) {
      const handleDeleteItem = async (userNotication?: UserNoticationtResponse) => {
        if (userNotication) {
          const [error, respDeleteNotication]: any = await handleAsyncRequest<
            ApiResponse<GetUserNoticationCommonResponse>
          >(mailbox.postUserNoticationDelete(userNotication.id))

          if (error) {
            setOpenModalSuccess(true)
            setTitleBalance('warning')
            setMessageError(error?.message || error?.errors[0]?.message)
          }

          if (respDeleteNotication?.code === 200) {
            setOpenModalSuccess(true)
            setTitleBalance('success!')
            setMessageError(t(`${NOTIFICATION_MESSAGE}.messageSuccessDelete`))
          }
        }
      }

      handleDeleteItem(userNotication)
    }
  }, [flagDeleteItem, userNotication])

  useEffect(() => {
    const handleHandleReadAllItem = async () => {
      if (flagReadAllItem === true) {
        toggleIsModalOpenReadAllMail(false)
        const [, respReadAllNotication] = await handleAsyncRequest<ApiResponse<GetUserNoticationCommonResponse>>(
          mailbox.postUserNoticationReadAll('EVENT')
        )
        if (respReadAllNotication?.code === 200) {
          setOpenModalSuccess(true)
          setTitleBalance('success!')
          setMessageError(t(`${NOTIFICATION_MESSAGE}.messageSuccessReadedAll`))
        }
      }
    }

    handleHandleReadAllItem()
  }, [flagReadAllItem])

  const handleOk = () => {
    toggleIsModalOpen(false)
    setOpenModalSuccess(false)
    setFlagDeleteItem(false)
    setParams({...params})
  }

  const handleStatusFilterClicked = (value: string) => {
    const newParams = {...params}
    delete newParams.seen
    switch(value) {
      case 'All': 
        setParams(newParams)
        break
      case 'Read':
        setParams({...params, seen: true})
        break
      case 'Unread':
        setParams({...params, seen: false})
        break
    }
    setSelectedStatus(value)
    setMailStatusFilters(MailStatusOptions.map((option) => 
      option.name === value ? { ...option, isActive: true } : { ...option, isActive: false }
    ))
  }

  const handleReadAllMailItem = async () => {
    toggleIsModalOpenReadAllMail(true)
  }

  const handleCloseButtonClick = () => {
    setOpenMailItemModal(false)
    !params.seen && setParams({ ...params })
  }

  const handleConfirmModalReadAllMail = async () => {
    setFlagReadAllItem(true)
  }

  // Invoke when user click to request another page.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageClick = (event: any) => {
    setSearchParams({ page: event.selected + 1 })
    setParams({ ...params, page: event.selected })
  }

  return (
    <MailRaceStyled>
      <div className='d-flex justify-content-end block-read-all-mail'>
        <div className='me-4'>
          <Select
            dataSelect={mailStatusFilters}
            nameSelect={selectedStatus}
            onSelected={(value: string) => handleStatusFilterClicked(value)}
          />
        </div>
        {checkAllItemRead > 0 ? (
          <img src={READ_ALL_MAIL_ITEM} alt='' className='read-all-mail-item' onClick={handleReadAllMailItem} />
        ) : (
          <img src={READED_ALL_MAIL_ITEM} alt='' className='read-all-mail-item' />
        )}
      </div>
      <table className='race-mail'>
        <tbody>
          {listMailBoxItem &&
            listMailBoxItem.map((itemMailBox) => {
              return (
                <MailBoxItem
                  key={itemMailBox.id}
                  listMailBoxItemRead={itemMailBox}
                  onDeleteMailItem={() => handleDeleteMailItem(itemMailBox)}
                  handleOpenModalMailItem={() => handleOpenModalMailItem(itemMailBox.id)}
                />
              )

            })}
        </tbody>
      </table>
      {listMailBoxItem.length > 0 && total > 10 && (
        <div className='paginate'>
          <ReactPaginate
            nextLabel='>'
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel='<'
            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            breakLabel='...'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination'
            activeClassName='active'
            forcePage={paramsSearch.page ? +paramsSearch.page - 1 : 0}
          />
        </div>
      )}
      {isOpenMailItemModal && (
        <MailItemModal
          onCloseButtonClick={() => handleCloseButtonClick()}
          idBeChoose={idBeChoose}
          listMailBoxItem={listMailBoxItem}
        />
      )}
      {isModalOpenReadAllMail && (
        <HorseModalConfirm
          onConfirm={handleConfirmModalReadAllMail}
          onCloseButtonClick={handleCloseReadALLMailModal}
          typeMsg={'ReadAllMailItem'}
        />
      )}
      {isModalOpen && (
        <HorseModalConfirm
          onConfirm={handleConfirmModal}
          onCloseButtonClick={handleCloseModal}
          typeMsg={'deleteMailItem'}
        />
      )}
      {openModalSuccess && (
        <ResultHorseModal title={titleBalace} onOk={handleOk} message={messageError} exchangeCoin={true} />
      )}
    </MailRaceStyled>
  )
}

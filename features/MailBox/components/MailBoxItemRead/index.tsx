import { UserNoticationtResponse } from 'models/mailbox'
import MailBoxItemReadStyled from './styled'
import { DELETE_MAIL_ITEM } from 'assets/images'
import { shortenRaceMailTitle, shortenRaceMailContent, capitalizeOnlyFirstLetter } from 'utils/helper'

interface MailBoxItemReadProps {
  listMailBoxItemRead: UserNoticationtResponse
  openMailItemModal?: boolean
  closeHorseModal?: () => void
  handleOpenModalMailItem?: () => void
  onDeleteMailItem: () => void
}

function MailBoxItemRead({ listMailBoxItemRead, handleOpenModalMailItem, onDeleteMailItem }: MailBoxItemReadProps) {

  return (
    <MailBoxItemReadStyled>
      <td className={`mail-container ${listMailBoxItemRead.seen ? '' : 'mail-viewed'}`}>
        <div onClick={handleOpenModalMailItem} className='block-title-content'>
          <div className='color-white title font-bold title'>
            <span>{shortenRaceMailTitle(listMailBoxItemRead.title).toLocaleUpperCase()}</span>
          </div>
          <div className='color-white content'>
            {shortenRaceMailContent(capitalizeOnlyFirstLetter(listMailBoxItemRead.content))}
          </div>
        </div>
        <div className='color-white delete-mail-item'>
          <img src={DELETE_MAIL_ITEM} alt='' className='delete-item' onClick={onDeleteMailItem} />
        </div>
      </td>

    </MailBoxItemReadStyled>
  )
}

export default MailBoxItemRead

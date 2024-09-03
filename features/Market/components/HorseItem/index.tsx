import _ from 'lodash'
import { FEMALE_ICON, GAME_TOKEN_E_HTC, MALE_ICON } from 'assets/images'
import HorseItemStyled from './styled'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { useTranslation } from 'react-i18next'
import { LendingHorse, LendingPriceConfigs, LENDING_STATUS, LENDING_TYPE } from 'models';
import { handeLeaseType , convert_status_lending } from 'utils/helper';
import { ClassTag } from 'shared';
import SkeletonList from 'features/components/SkeletonList'
import { useNavigate } from 'react-router-dom'
import { links } from 'apps'

interface IHorseItemProps {
  listHorse?: Array<LendingHorse>
  total?: number
  onViewMore?: () => void
  isLoading?: boolean
}

function HorseItem({ listHorse, total = 0, onViewMore, isLoading }: IHorseItemProps) {
  // const [isHovering, setIsHovering] = useState(false)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleClickBtnDetail = (horse: LendingHorse) => {
    navigate(links.market.detail(horse.token_id))
  }

  const hanleTotalViewMore = () => {
    return total && total - (listHorse && listHorse?.length || 0)
  }

  const handlePriceLowest = (configs: LendingPriceConfigs[]) => {
    const priceLowest = configs.reduce((previous, current) => {
      return parseInt(current.value) < parseInt(previous.value) ? current : previous;
    });
    return priceLowest.value
  }


  return (
    <HorseItemStyled >
      {
        isLoading ?
          <SkeletonList /> :
          <> {total <= 0 ? <div className='no-data'>
            {t(`${NOTIFICATION_MESSAGE}.horseNotFound`)}
          </div> :
            <>
              <div className='market-container'>
                {listHorse && listHorse.map(horse => (
                  <div key={horse.horse_id} className='market-item position-relative'>
                    <div className='top position-relative'>
                      <div className='top-frame position-absolute'></div>
                      <div className='bottom'></div>
                    </div>
                    <div className='horse-item'>
                      <div className='header'>
                        <div>
                          <div className='horse-name text-uppercase'>
                            {horse.horse_name}
                            <img className='icon-gender' width={20} src={horse.horse_gender === "MALE" ? MALE_ICON : FEMALE_ICON} />
                          </div>
                          <div className='horse-lending'>
                            {handeLeaseType(horse?.lending_type)}
                          </div>
                        </div>
                        <div>
                          <div className='horse-type'>{convert_status_lending(horse?.lending_status)} </div>
                        </div>
                      </div>
                      <div className='background-container'>
                        <div className=' d-flex align-items-center justify-content-center'>
                          <img src={horse?.avatar} alt={horse?.horse_name} width={200} className='avatar background' />
                        </div>
                      </div>
                      <div className='bottom-item'>
                        <ClassTag text={horse?.racing_class ?? ''} isActive={true} customClass='horse-class' />

                        {(horse.lending_status === LENDING_STATUS.Lending || horse.lending_status === LENDING_STATUS.Borrowed) &&
                          <div className='price-lending'>
                            {horse?.rent_days && horse?.rent_fee ? horse.rent_fee : (!_.isEmpty(horse?.price_configs) && handlePriceLowest(horse?.price_configs))}
                            {
                              horse.lending_type === LENDING_TYPE.Available ? <img width={20} src={GAME_TOKEN_E_HTC} alt='e-htc' className='e-htc' /> : '%'
                            }
                          </div>
                        }
                      </div>
                    </div>
                    <div className='btn-detail-container'>
                      <button className='font-bold btn-detail' onClick={() => handleClickBtnDetail(horse)}>
                        <span className='color-white'>{t(`${NOTIFICATION_MESSAGE}.details`)}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {hanleTotalViewMore() > 0 &&
                <div className='color-white view-more-container mt-2 mb-5' onClick={onViewMore}>
                  <button className='btn-view-more'>
                    <span className='btn-view-more-text'>View More {hanleTotalViewMore()} Horses </span>
                  </button>
                </div>
              }
            </>
          }
          </>
      }
    </HorseItemStyled>
  )
}

export default HorseItem

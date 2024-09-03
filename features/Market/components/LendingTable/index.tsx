/* eslint-disable @typescript-eslint/no-explicit-any */
import { MAX_PRICE_HTC, TIME_CONFIGS } from 'apps/constants';
import { AVATAR_DEFAULT, GAME_TOKEN_E_HTC } from 'assets/images';
import { ELeaseType, ILeaseTypes, LendingHorseInfo, LendingPriceConfigs, LENDING_STATUS, LENDING_TYPE } from 'models';
import { useEffect, useState } from 'react';
import SelectCustom from 'shared/SelectCustom';
import { shortenUserName, convert_status_lending } from 'utils/helper';
import LendingTableStyled from './styled'


interface ILendingTableProps {
  onOpenHorseDetailModal?: () => void;
  onChange?: (item: any, type: string) => void;
  timeLending: any;
  leaseType?: string | any;
  disabledSelect?: boolean;
  lendingInfo?: LendingHorseInfo;
  isActive?: boolean;
  onLendingType?: (value: string) => void;
  onTimeLending?: (value: LendingPriceConfigs[]) => void;
  messageError?: string
  onSetMessageError?: (value: string) => void;
}
const headers = ['Duration', 'Price']

const defaultLeaseType: ILeaseTypes = [
  {
    name: ELeaseType.Available,
    isActive: true
  },
  {
    name: ELeaseType.Share,
    isActive: false
  }
]

function LendingTable({ onSetMessageError, messageError, onTimeLending, onChange, timeLending, leaseType, disabledSelect, lendingInfo, isActive, onLendingType }: ILendingTableProps) {
  const [lendingType, setLendingType] = useState(leaseType.length > 0 ? leaseType : ELeaseType.Available)
  const [priceConfig, setPriceConfig] = useState<any>()

  const onClassFilterClicked = (item: string) => {
    onSetMessageError?.('')
    onLendingType?.(item === ELeaseType.Available ? LENDING_TYPE.Available : LENDING_TYPE.Share)
    setLendingType(item)
    onTimeLending?.(TIME_CONFIGS)
  }

  const handleHideCheckbox = () => {
    if (!lendingInfo) return false
    if (convert_status_lending(lendingInfo?.lending_status) === LENDING_STATUS.Borrowed || convert_status_lending(lendingInfo?.lending_status) === LENDING_STATUS.Available || (convert_status_lending(lendingInfo?.lending_status) !== LENDING_STATUS.InFarm && lendingInfo?.is_owner)) return false
    return true
  }

  useEffect(() => {
    if (lendingInfo?.rent_days) {
      setPriceConfig([{ day: lendingInfo?.rent_days, value: lendingInfo.rent_fee, active: true }])
    } else setPriceConfig(timeLending)
  }, [timeLending])

  const handleKeyDown = (e: any) => {
    const typedValue = e.keyCode;
    if (typedValue < 48 && typedValue > 57) {
      // If the value is not a number, we skip the min/max comparison 
      return;
    }

    const typedNumber = parseInt(e.key);
    const min = parseInt(e.target.min);
    const max = parseInt(e.target.max);
    const currentVal = parseInt(e.target.value) || '';
    const newVal = parseInt(currentVal.toString() + typedNumber.toString());

    if (newVal < min || newVal > max || ["e", "E", "+", "-", ",", "."].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  return (
    <LendingTableStyled>
      <div className='right-top '>
        <div className='horse-info'>
          <div className='horse-lending'>{convert_status_lending(lendingInfo?.lending_status)}</div>
          <div className='horse-lending'>
            <SelectCustom
              dataSelect={defaultLeaseType}
              nameSelect={lendingType}
              onSelected={onClassFilterClicked}
              disabled={disabledSelect}
            />
          </div>
        </div>
      </div>
      <div className='horse-table-container'>
        <div className='info'>
          {
            lendingInfo?.owner &&
            <div className='info-owner-wrap'>
              <div className='info-owner'>
                <img src={lendingInfo?.owner?.avatar ?? AVATAR_DEFAULT} alt='' className='avatar rounded-circle' />
                <div className='info-owner-name'>
                  <div> Owner</div>
                  <div className='owner-name'> {shortenUserName(lendingInfo?.owner?.name)}</div>
                </div>
              </div>
              { lendingInfo?.lending_status === LENDING_STATUS.Borrowed && lendingInfo?.lending_type === LENDING_TYPE.Share && 
                <div className='info-owner-percent'>
                  <span>{lendingInfo?.rent_fee} %</span>
                </div>
              }
            </div>
          }
          
          {
            lendingInfo?.renter &&
            <div className='info-owner-wrap'>
              <div className='info-owner'>
                <img src={lendingInfo?.renter?.avatar ?? AVATAR_DEFAULT} alt='' className='avatar rounded-circle' />
                <div className='info-owner-name'>
                  <div> Borrower</div>
                  <div className='owner-name'> {shortenUserName(lendingInfo?.renter?.name)}</div>
                </div>
              </div>
              { lendingInfo?.lending_status === LENDING_STATUS.Borrowed && lendingInfo?.lending_type === LENDING_TYPE.Share && 
                <div className='info-owner-percent'>
                  <span>{`${Number(100 - lendingInfo?.rent_fee)}`} %</span>
                </div>
              }
            </div>
          }
        </div>
        <div className='horse-table-header d-flex px-3 justify-content-between'>
          {headers.map((header, index) => (
            <div key={index}>
              {header}
            </div>
          ))}
        </div>
        {
          priceConfig?.map((item: any) => (
            <div key={item.id} className={`horse-item ${item?.active ? 'active' : ''}`}  >
              <div className={`lease-price ${(item?.active && convert_status_lending(lendingInfo?.lending_status) === LENDING_STATUS.InFarm) ? 'out-line' : ''}`}>
                <div className='lease-price-input'>
                  {handleHideCheckbox() ?
                    <input
                      className='me-4 input-custom'
                      id={item.id}
                      value={priceConfig}
                      type='checkbox'
                      checked={isActive ? isActive : item?.active}
                      onChange={() => onChange?.(item, 'checked')}
                      width={50}
                    />
                    : <div className='ps-4'></div>
                  }
                  <input
                    disabled={disabledSelect || item.active === false}
                    type='number'
                    id={item.id}
                    className='day-input input-custom'
                    value={item.day.length >= 2 ? item.day.replace(/^0/, "") : item.day}
                    placeholder='0'
                    min={1}
                    max={364}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => onChange?.(e, 'day')}
                    onPaste={e => {
                      e.preventDefault();
                      return false
                    }}
                    maxLength={3}
                  />
                  {item.day <= 1 ? 'day' : 'days'}
                </div>
                <div className='lease-price-input'>
                  <>
                    <input
                      disabled={disabledSelect || item.active === false}
                      type='number'
                      id={item.id}
                      className='price-input input-custom'
                      value={item.value.length >= 2 ? item.value.replace(/^0/, "") : item.value}
                      placeholder='0'
                      min={0}
                      max={lendingType === ELeaseType.Available ? MAX_PRICE_HTC : 100}
                      onKeyDown={handleKeyDown}
                      onChange={(e) => onChange?.(e, 'price')}
                      onPaste={e => {
                        e.preventDefault();
                        return false
                      }}
                      maxLength={lendingType === ELeaseType.Available ? 7 : 3}
                    />
                    {lendingType === ELeaseType.Available ? <span className='unit'>
                      <img width={20} src={GAME_TOKEN_E_HTC} alt='e-htc' className='e-htc' />
                    </span> : <span className='unit'>  % </span>}
                  </>
                </div>
              </div>
            </div>
          ))
        }
        {messageError && messageError?.length > 0 ? <div className='color-red'> {messageError}</div> : ''}

      </div>
    </LendingTableStyled>
  )
}

export default LendingTable

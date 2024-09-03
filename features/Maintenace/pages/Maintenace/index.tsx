import { constants, links } from 'apps'
import { LOGO, MINI_LOGO, SETTING_MAINTAIN, TWO_LINE } from 'assets/images'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import StyledMaintenace from './styled'

export default function Maintenace() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        navigate(links.home.index())
      }
    }
  })

  const handleClickBtnLoginIn = () => {
    if (pathname === links.auth.index()) return
    localStorage.removeItem(constants.ACCESS_TOKEN_KEY)
    localStorage.removeItem(constants.REFRESH_TOKEN_KEY)
    localStorage.removeItem(constants.USER_ID_KEY)
    localStorage.removeItem(constants.SIGNER)
  }

  return (
    <StyledMaintenace>
      <div>
        <div className='header d-flex justify-content-between align-items-center'>
          <div className='header-left'>
            <Link to={links.home.index()} className='link-logo d-block'>
              <img src={LOGO} alt='home' className='logo' width={179} />
            </Link>
          </div>
          <div className='header-right' onClick={handleClickBtnLoginIn}>
            <Link
              to={links.auth.index()}
              className='login-btn p-0 d-inline-block d-flex align-items-center justify-content-center'
            >
              <span className={`color-primary font-bold`}>Login</span>
              <img src={MINI_LOGO} className='position-absolute' />
            </Link>
          </div>
        </div>
      </div>
      <div className='maintenace'>
        <div className='title font-bold text-uppercase color-primary'>
          {t(`${NOTIFICATION_MESSAGE}.maintenanceNotice`)}
        </div>
        <img src={TWO_LINE} alt='' className='line' />

        <div className='setting-icon'>
          <img src={SETTING_MAINTAIN} alt='' className='setting-icon-item' />
          <img src={SETTING_MAINTAIN} alt='' className='setting-icon-item' />
          <img src={SETTING_MAINTAIN} alt='' className='setting-icon-item' />
          <img src={SETTING_MAINTAIN} alt='' className='setting-icon-item' />
          <img src={SETTING_MAINTAIN} alt='' className='setting-icon-item' />
        </div>
        <div className='color-white watting-transaction'>{t(`${NOTIFICATION_MESSAGE}.currentlyMaintenance`)}</div>
        <div className='color-white content'>{t(`${NOTIFICATION_MESSAGE}.waitService`)}</div>
      </div>
    </StyledMaintenace>
  )
}

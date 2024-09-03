import { links } from 'apps'
import { LOGO, TWO_LINE } from 'assets/images'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import StyledPageNotFound from './styled'

export default function PageNotFound() {
  const { t } = useTranslation()
  return (
    <StyledPageNotFound>
      <div className='header d-flex justify-content-between align-items-center'>
        <div className='header-left'>
          <Link to={links.home.index()} className='link-logo d-block'>
            <img src={LOGO} alt='home' className='logo' width={179} />
          </Link>
        </div>
      </div>
      <div className='page-not-found'>
        <div className='title text-uppercase color-orange'>{t(`${NOTIFICATION_MESSAGE}.pageNotFound`)}</div>
        <div className='title-404 text-uppercase color-orange'>404</div>
        <img src={TWO_LINE} alt='' className='line' />
        <div className='color-primary btn-back'>
          <Link to={links.home.index()}>{t(`${NOTIFICATION_MESSAGE}.backToHome`)}</Link>
        </div>
      </div>
    </StyledPageNotFound>
  )
}

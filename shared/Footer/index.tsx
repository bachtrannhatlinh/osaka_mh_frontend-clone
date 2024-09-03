import { links } from 'apps'
import { COPYRIGHT } from 'assets/images'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { useTranslation } from 'react-i18next'
import FooterStyled from './styled'

function Footer() {
  const { t } = useTranslation()
  return (
    <FooterStyled>
      <div className='footer d-flex flex-column flex-sm-row align-items-sm-center'>
        <div className='copyright-container d-flex align-items-center'>
          <img src={COPYRIGHT} alt='' className='copyright' />
          <span className='company color-grey'> {t(`${NOTIFICATION_MESSAGE}.coppyRight`)}</span>
        </div>
        {/* <Link to={links.home.help()} className='service color-white me-3 me-md-4'>
          Help
        </Link>
        <Link to={links.home.terms()} className='service color-white me-3 me-md-4'>
          Terms of service
        </Link> */}
        <a href={links.home.privacy()} className='policy color-white'>
          Privacy Policy
        </a>
      </div>
    </FooterStyled>
  )
}

export default Footer

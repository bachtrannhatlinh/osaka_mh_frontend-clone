import { configs } from 'apps'
import { LOGO, TWO_LINE } from 'assets/images'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { useTranslation } from 'react-i18next'
import StyledMobile from './styled'

export default function Mobile() {
  const { t } = useTranslation()
  const getMobileOperatingSystem = () => {
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(navigator.userAgent)) {
      return 'WindowsPhone'
    }

    if (/android/i.test(navigator.userAgent)) {
      return 'Android'
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      return 'Testflight'
    }
    return 'unknown'
  }

  const getLinkDownLoadApp = () => {
    switch (getMobileOperatingSystem()) {
      case 'Android':
        return configs.linkAndroid
      case 'Testflight':
        return configs.linkIOS
      case 'WindowsPhone':
      default:
        return configs.linkIOS
    }
  }
  return (
    <StyledMobile>
      <div className='header d-flex justify-content-between align-items-center'>
        <div className='header-left'>
          <img src={LOGO} alt='home' className='logo' width={179} />
        </div>
      </div>
      <div className='mobile'>
        <br />
        <div className='title-404 text-uppercase color-primary'>No mobile support</div>
        <img src={TWO_LINE} alt='' className='line' />
        <div className='title  color-orange pt-5'>
          {/* Browsers do not support metamasks. Download the app for a better experience! */}
          {t(`${NOTIFICATION_MESSAGE}.notSupportMobile`)}
        </div>
        <div className='btn-back'>
          <a href={getLinkDownLoadApp()}>
            <span className='btn-download'>Click Download {getMobileOperatingSystem()} </span>
          </a>
        </div>
      </div>
    </StyledMobile>
  )
}

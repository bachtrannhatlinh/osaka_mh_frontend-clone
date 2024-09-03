import { links } from 'apps'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useOutlet } from 'react-router-dom'
import { TwoLineTitle } from 'shared'
import MailBoxStyled from './styled'

export default function MailBox() {
  const tabs = [
    {
      name: 'race mail',
      link: links.mailbox.raceMail()
    },
    {
      name: 'event mail',
      link: links.mailbox.eventMail()
    },
    {
      name: 'system mail',
      link: links.mailbox.systemMail()
    }
  ]

  const { pathname: currentPathname } = useLocation()
  const outlet = useOutlet()
  const navigate = useNavigate()

  useEffect(() => {
    if (outlet === null) {
      navigate(links.mailbox.raceMail(), { replace: true })
    }
  }, [currentPathname])

 return (
  <MailBoxStyled>
      <div className='container'>
        <div className='title-tabs-container'>
          <div className='title-tabs d-flex justify-content-center align-items-start'>
            {tabs.map(tab =>
              tab.link === currentPathname ? (
                <Link key={tab.name} to={tab.link} className='tab-link text-center'>
                  <TwoLineTitle text={tab.name} />
                </Link>
              ) : (
                <Link key={tab.name} to={tab.link} className='tab-link font-bold text-uppercase text-center'>
                  {tab.name}
                </Link>
              )
            )}
          </div>
        </div>
        <div className='content'>{outlet}</div>
      </div>
    </MailBoxStyled>
 )
}

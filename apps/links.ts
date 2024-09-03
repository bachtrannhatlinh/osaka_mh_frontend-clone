import { encodeURI } from 'js-base64'

export default {
  home: {
    index: () => '/',
    help: () => '/help',
    terms: () => '/terms',
    privacy: () => 'https://head2head.gitbook.io/metahorse/privacy-poricy'
  },
  race: {
    index: () => '/race',
    scheduledRaces: () => '/race/scheduled-races',
    open: () => '/race/open',
    detail: (raceId: string | undefined) => `/race/detail/${encodeURI(raceId || '')}`,
    result: () => '/race/result'
  },
  auth: {
    index: () => '/login'
  },
  horse: {
    index: () => '/horse',
    detail: (token_id: number) => `/horse/detail/${token_id}`,
    detailRaceView: (token_id: number, raceId: number) => `/horse/detail/${token_id}/race/${raceId}`
  },
  profile: {
    index: () => '/profile'
  },
  market: {
    index: () => '/lending',
    market: () => '/lending/market',
    myAsset: () => '/lending/my-asset',
    myLending: () => '/lending/my-lending',
    myBorrow: () => '/lending/my-borrow',
    detail: (token_id: number) => `/lending/detail/${token_id}`,
    lending: (token_id: number) => `/lending/detail/${token_id}/lending`
  },
  balance: {
    index: () => '/balance'
  },
  maintenace: {
    index: () => '/maintenace'
  },
  disableAccount: {
    index: () => '/disable-account'
  },
  loggedAccount: {
    index: () => '/logged-account'
  },
  notFound: {
    index: () => '/page-not-found'
  },
  mobile: {
    index: () => '/mobile'
  },
  mailbox: {
    index: () => '/mail-box',
    raceMail: () => '/mail-box/race-mail',
    eventMail: () => '/mail-box/event-mail',
    systemMail: () => '/mail-box/system-mail'
  }
}

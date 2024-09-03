export default {
  baseApiUrl: process.env.REACT_APP_API_BASE_URL,
  baseSocketUrl: process.env.REACT_APP_BASE_WS_URL ?? 'https://dev-api-meta-horse.bappartners.com/stomp',
  tokenHTC: process.env.REACT_APP_TOKEN_HTC ?? '0xD3312D8aA3862088D1A9d660003d7EDe013DdAd3',
  tokenGate: process.env.REACT_APP_TOKEN_GATE ?? '0xcBE266C1169B34638EB34d7B40989310e6434ebd',
  tokenPRZ: process.env.REACT_APP_TOKEN_PRZ ?? '0x4dBE394478d3B7E120412e61Bba3E3c8c85a079C',
  linkH2H: process.env.REACT_APP_LINK_H2H ?? 'https://dev.head-2-head.net/register',
  linkYoutube:
    process.env.REACT_APP_LINK_YOUTUBE ??
    'https://www.youtube.com/embed/IoLY8crt7BQ?mute=1&amp;controls=0&amp;autoplay=1&amp;loop=1&amp;rel=0&amp;showinfo=0&amp;playlist=IoLY8crt7BQ',
  linkTwitch:
    process.env.REACT_APP_LINK_TWITCH ?? 'https://player.twitch.tv/?channel=test01a1&parent=localhost&muted=true',
  chainId: process.env.REACT_APP_CHAIN_ID ?? '55',
  chainIdDirect: process.env.REACT_APP_CHAIN_ID_DIRECT ?? '0x37',
  linkRpcUrls: process.env.REACT_APP_SPEC_TRE ?? 'https://testnet.spectre-rpc.io',
  nameChain: process.env.REACT_APP_CHAIN_NAME ?? 'Testnet Chain',
  nameCurrency: process.env.REACT_APP_CURRENCY_NAME ?? 'SPC',
  linkBlockExplorerUrls: process.env.REACT_APP_LINK_BLOCK_EXPLORERURLS ?? 'https://testnet.spectre-scan.io/',
  valueDecimals: process.env.REACT_APP_VALUE_DECIMALS ?? 18,
  linkAndroid:
    process.env.REACT_APP_LINK_ANDROID ??
    ' https://meta-horse-prd-general.oss-ap-northeast-1.aliyuncs.com/_apk-files/metahorse_android_1.0.2.60_betatest.apk',
  linkIOS: process.env.REACT_APP_LINK_IOS ?? 'https://testflight.apple.com/join/EFZgK0qz',
  horseNFT: process.env.REACT_APP_HORSE_NFT ?? '0',
  horseFarm: process.env.REACT_APP_HORSE_FARM ?? '0',
  transporter: process.env.REACT_APP_HORSE_TRANSPORTER ?? '0'
}

import CustomBootstrapStyles from 'assets/styles/CustomBootstrapStyles'
import CommonStyles from 'assets/styles/CommonStyles'
import NormalizeCSSStyles from 'assets/styles/NormalizeCSSStyles'

export { default as GlobalTheme } from 'assets/styles/GlobalTheme'
export function GlobalStyles() {
  return (
    <>
      <NormalizeCSSStyles />
      <CustomBootstrapStyles />
      <CommonStyles />
    </>
  )
}

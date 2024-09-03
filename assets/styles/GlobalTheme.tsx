import { DefaultTheme, ThemeProvider } from 'styled-components'

interface GlobalThemeProps {
  children: React.ReactNode
}

function GlobalTheme({ children }: GlobalThemeProps) {
  const theme: DefaultTheme = {
    color: {
      primary: 'linear-gradient(90deg, #4EF076 0%, #48F7BA 100%)',
      gradientDarkGreen: 'linear-gradient(90deg, #69D182 0%, #033E1A 104.33%)',
      neutralGray: '#262626',
      black: '#000000',
      white: '#ffffff',
      neutral: '#191d2c',
      blue: '#0000FF',
      secondary: '#99ffff',
      grey: '#8d8d8d',
      silverSand: '#c4c4c4',
      orange: '#ff7a00',
      yellow: '#fff566',
      darkBlue: '#121520',
      green: '#135200',
      lightGreen: '#52c41a',
      red: '#f5222d',
      transparent: 'transparent',
      headerBorder: '#2d3936',
      positionTrack: '#303442',
      neutralOpacity: '#151825',
      detailEmptyColor : '#182143',
      detailEmptyBorder : '#4963ca'
    },
    size: {
      xxl: 1400,
      xl: 1200,
      lg: 992,
      md: 768,
      sm: 576
    },
    media: {
      lessThan: (windowSize: number) => `@media only screen and (max-width: ${windowSize - 0.02}px)`,
      greaterThan: (windowSize: number) => `@media only screen and (min-width: ${windowSize}px)`
    }
  }

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default GlobalTheme

import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    color: Record<string, string>
    size: Record<string, number>
    media: {
      lessThan: (windowSize: number) => string
      greaterThan: (windowSize: number) => string
    }
  }
}

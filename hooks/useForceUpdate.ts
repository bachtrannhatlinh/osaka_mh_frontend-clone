import { useState } from 'react'

export default function useForceUpdate() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setState] = useState(false)
  return () => setState(val => !val)
}

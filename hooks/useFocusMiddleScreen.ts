import { useEffect } from 'react'

export default function useFocusMiddleScreen() {
  useEffect(() => {
    window.scrollTo(0, 170)
  }, []) 
}

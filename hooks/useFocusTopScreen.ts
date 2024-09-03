import { useEffect } from 'react'

export default function useFocusTopScreen() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []) 
}

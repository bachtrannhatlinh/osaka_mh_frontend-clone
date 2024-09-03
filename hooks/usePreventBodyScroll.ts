import { useEffect } from 'react'

export default function usePreventBodyScroll(isPrevented: boolean) {
  useEffect(() => {
    document.body.style.overflowY = isPrevented ? 'hidden' : 'unset'
  }, [isPrevented])
}

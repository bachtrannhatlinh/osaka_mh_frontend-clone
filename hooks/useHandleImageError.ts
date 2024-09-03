import { useCallback, SyntheticEvent } from 'react'

export default function useHandleImageError(fallbackImage: string) {
  const handleImageError = useCallback(
    ({ currentTarget }: SyntheticEvent<HTMLImageElement, Event>) => {
      currentTarget.onerror = null
      currentTarget.src = fallbackImage
    },
    [fallbackImage]
  )

  return handleImageError
}

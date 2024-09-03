import type { AppDispatch } from 'apps/store'
import { useDispatch } from 'react-redux'

const useAppDispatch = () => useDispatch<AppDispatch>()

export default useAppDispatch

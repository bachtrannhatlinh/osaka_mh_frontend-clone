import { BTN_FILTER_RESULT } from 'assets/images'

interface ButtonFitterProps {
  onFilter: () => void
}

export default function ButtonFitter({ onFilter }: ButtonFitterProps) {
  return (
    <div>
      <img src={BTN_FILTER_RESULT} alt='' onClick={onFilter} />
    </div>
  )
}

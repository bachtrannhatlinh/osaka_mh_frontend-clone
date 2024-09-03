import ToolTipStyled from './styled'

interface ToolTipProps {
  name: string
  className?: string
}

export default function ToolTip({ name, className }: ToolTipProps) {
  return (
    <ToolTipStyled name={name}>
      {name.length > 20 && <div className='content-name'>{name}</div>}
      <span className={`content-name-horver ${className}`}>
        {name}
      </span>
    </ToolTipStyled>
  )
}

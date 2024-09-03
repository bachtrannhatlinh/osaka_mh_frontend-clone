import CategoryRaceStyled from './styled'

interface CategoryRaceProps {
  category: {
    id: number
    name: string
    thumbnail: string
  }
}

function CategoryRace({ category }: CategoryRaceProps) {
  return (
    <CategoryRaceStyled thumbnail={category.thumbnail}>
      <div className='category-race'>
        <div className='category-overlay d-flex align-items-center justify-content-center'>
          <span className='name color-white font-bold'>{category.name}</span>
        </div>
      </div>
    </CategoryRaceStyled>
  )
}

export default CategoryRace

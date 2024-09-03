import styled from 'styled-components'
import { OPEN_RACE_OVERLAY } from 'assets/images'

interface CategoryRaceStyledProps {
  thumbnail: string
}

const categoryRaceDimensionRatio = 3.093

const CategoryRaceStyled = styled.div<CategoryRaceStyledProps>`
  .category-race {
    background-image: url(${({ thumbnail }) => thumbnail});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    .category-overlay {
      width: 198px;
      height: calc(198px / ${categoryRaceDimensionRatio});

      background-image: url(${OPEN_RACE_OVERLAY});
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;

      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        width: 130px;
        height: calc(130px / ${categoryRaceDimensionRatio});
      }

      ${({ theme }) => theme.media.lessThan(theme.size.md)} {
        width: 220px;
        height: calc(220px / ${categoryRaceDimensionRatio});
      }

      ${({ theme }) => theme.media.lessThan(theme.size.md)} {
        width: 138px;
        height: calc(138px / ${categoryRaceDimensionRatio});
      }

      .name {
        font-size: 20px;
        line-height: 20px;
        text-transform: uppercase;

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          font-size: 14px;
        }

        ${({ theme }) => theme.media.lessThan(theme.size.md)} {
          font-size: 18px;
        }

        ${({ theme }) => theme.media.lessThan(theme.size.md)} {
          font-size: 14px;
        }
      }
    }
  }
`

export default CategoryRaceStyled

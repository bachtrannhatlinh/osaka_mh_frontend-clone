import styled from 'styled-components'

const HORSE_RANKLIST_CONTAINER_WIDTH = 316
const RANK_AND_TRACK_GAP = 40

const SchedulingLiveStarInStyled = styled.div`
  gap: ${RANK_AND_TRACK_GAP}px;
  margin-top: 6px;

  .horse-rank-list-container {
    width: ${HORSE_RANKLIST_CONTAINER_WIDTH}px;
  }

  .horse-track-list-container {
    max-width: calc(100% - ${HORSE_RANKLIST_CONTAINER_WIDTH}px - ${RANK_AND_TRACK_GAP}px);
    overflow-x: hidden;
  }
`

export default SchedulingLiveStarInStyled

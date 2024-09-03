import {
  TOP_HORSE_BRONZE_CIRCLE,
  TOP_HORSE_BRONZE_CROWN,
  TOP_HORSE_GOLD_CIRCLE,
  TOP_HORSE_GOLD_CROWN,
  TOP_HORSE_SILVER_CIRCLE,
  TOP_HORSE_SILVER_CROWN,
  TOP_STABLE_AVT_BORDER_BRONZE,
  TOP_STABLE_AVT_BORDER_GOLD,
  TOP_STABLE_AVT_BORDER_SLIVER,
  TOP_STABLE_BORDER_BRONZE,
  TOP_STABLE_BORDER_GOLD,
  TOP_STABLE_BORDER_SLIVER,
  TOP_STABLE_BRONZE_MEDAL,
  TOP_STABLE_GOLD_MEDAL,
  TOP_STABLE_SILVER_MEDAL,
  TOP_STABLE_TOP_FRAME_BRONZE,
  TOP_STABLE_TOP_FRAME_GOLD,
  TOP_STABLE_TOP_FRAME_SLIVER
} from 'assets/images'

enum SelfIndex {
  ZERO,
  ONE,
  TWO
}

type RankInfo = {
  circle: string
  crown: string
  position: '1st' | '2nd' | '3rd'
  medal: string
  topFrame: string
  boderFrame: string
  boderAvt: string
}

export default function useGetRankInfo(selfIndex: number): RankInfo {
  switch (selfIndex) {
    case SelfIndex.ONE:
      return {
        circle: TOP_HORSE_GOLD_CIRCLE,
        crown: TOP_HORSE_GOLD_CROWN,
        position: '1st',
        medal: TOP_STABLE_GOLD_MEDAL,
        topFrame: TOP_STABLE_TOP_FRAME_GOLD,
        boderFrame: TOP_STABLE_BORDER_GOLD,
        boderAvt: TOP_STABLE_AVT_BORDER_GOLD
      }

    case SelfIndex.ZERO:
      return {
        circle: TOP_HORSE_SILVER_CIRCLE,
        crown: TOP_HORSE_SILVER_CROWN,
        position: '2nd',
        medal: TOP_STABLE_SILVER_MEDAL,
        topFrame: TOP_STABLE_TOP_FRAME_SLIVER,
        boderFrame: TOP_STABLE_BORDER_SLIVER,
        boderAvt: TOP_STABLE_AVT_BORDER_SLIVER
      }

    case SelfIndex.TWO:
      return {
        circle: TOP_HORSE_BRONZE_CIRCLE,
        crown: TOP_HORSE_BRONZE_CROWN,
        position: '3rd',
        medal: TOP_STABLE_BRONZE_MEDAL,
        topFrame: TOP_STABLE_TOP_FRAME_BRONZE,
        boderFrame: TOP_STABLE_BORDER_BRONZE,
        boderAvt: TOP_STABLE_AVT_BORDER_BRONZE
      }

    default:
      return {
        circle: TOP_HORSE_GOLD_CIRCLE,
        crown: TOP_HORSE_GOLD_CROWN,
        position: '1st',
        medal: TOP_STABLE_GOLD_MEDAL,
        topFrame: TOP_STABLE_TOP_FRAME_BRONZE,
        boderFrame: TOP_STABLE_BORDER_BRONZE,
        boderAvt: TOP_STABLE_AVT_BORDER_BRONZE
      }
  }
}

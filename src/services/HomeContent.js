import { getHome, getChart } from 'nhaccuatui-api-full'
import { bg_1, bg_2, bg_3 } from 'images'

export const fetchHomeData = async () => {
  let homeData = await getHome()
  let { ranking: usukRanking } = await getChart({ category: 'au-my' })
  let { ranking: kpopRanking } = await getChart({ category: 'nhac-han' })

  if (homeData) {
    homeData.ranking.region = 'Việt Nam'
    homeData.ranking.bgImage = bg_1
  }

  if (usukRanking) {
    usukRanking.region = 'Âu Mỹ'
    usukRanking.bgImage = bg_2
  }
  
  if (kpopRanking) {
    kpopRanking.region = 'Hàn Quốc'
    kpopRanking.bgImage= bg_3
  }

  return { ...homeData, usukRanking, kpopRanking }
}
import { getHome, getChart } from 'nhaccuatui-api-full'
import { bg_1, bg_2, bg_3 } from 'images'

export const fetchHomeData = async () => {
  let homeData = await getHome()
  let { ranking: usukRanking } = await getChart({ category: 'au-my' })
  let { ranking: kpopRanking } = await getChart({ category: 'nhac-han' })
  
  if (homeData) {
    homeData.ranking.region = 'Việt Nam'
    homeData.ranking.bgImage = bg_1
    homeData.ranking.category = 'nhac-viet'
  }

  if (usukRanking) {
    usukRanking.region = 'Âu Mỹ'
    usukRanking.bgImage = bg_2
    usukRanking.category = 'au-my'
  }
  
  if (kpopRanking) {
    kpopRanking.region = 'Hàn Quốc'
    kpopRanking.bgImage= bg_3
    kpopRanking.category= 'nhac-han'
  }

  return { ...homeData, usukRanking, kpopRanking }
}
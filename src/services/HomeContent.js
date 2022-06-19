import { getHome, getChart } from 'nhaccuatui-api-full'

export const fetchHomeData = async () => {
  let homeData = await getHome()
  let { ranking: usukRanking } = await getChart({ category: 'au-my' })
  let { ranking: kpopRanking } = await getChart({ category: 'nhac-han' })

  if (homeData) {
    homeData.ranking.region = 'Tiếng Việt'
  }

  if (usukRanking) {
    usukRanking.region = 'Âu Mỹ'
  }
  
  if (kpopRanking) {
    kpopRanking.region= 'Hàn Quốc'
  }

  return { ...homeData, usukRanking, kpopRanking }
}
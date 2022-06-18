import { getHome, getChart } from 'nhaccuatui-api-full'

export const fetchHomeData = async () => {
  let homeData = await getHome()
  let { ranking: usukRanking } = await getChart({ category: 'au-my' })
  let { ranking: kpopRanking } = await getChart({ category: 'nhac-han' })

  homeData.ranking.region = 'Tiếng Việt'
  usukRanking.region = 'Âu Mỹ'
  kpopRanking.region= 'Hàn Quốc'

  return { ...homeData, usukRanking, kpopRanking }
}
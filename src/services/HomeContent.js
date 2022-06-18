import { getHome, getChart } from 'nhaccuatui-api-full'

export const fetchHomeData = async () => {
  const homeData = await getHome()
  const { ranking: usukRanking } = await getChart({ category: 'au-my' })
  const { ranking: kpopRanking } = await getChart({ category: 'nhac-han' })

  return { ...homeData, usukRanking, kpopRanking }
}
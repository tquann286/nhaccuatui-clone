import { getTopics } from 'api';

export const getTopicsMain = async () => {
  try {
    const data = await getTopics()

    if (data) return ({ topic: data.topic, topicCover: data.topicCover })
  } catch (error) {
    throw new Error(error)
  }
}
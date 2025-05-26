// POST
import apiClient from './axios.ts'
import type { StoryBoardType } from '../types/common.ts'

export const createStoryBoardType = async (storyBoardType: StoryBoardType) => {
  const response = await apiClient.post('/users', storyBoardType)
  return response.data
}

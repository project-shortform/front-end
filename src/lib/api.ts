// POST
import apiClient from './axios.ts'
import type { StoryBoardType, StoryType } from '../types/common.ts'

export const createStoryBoardType = async (storyBoardType: StoryBoardType) => {
  const response = await apiClient.post('/api/story/generate', storyBoardType, {
    headers: {
      skip_zrok_interstitial: 'sdf',
    },
  })
  return response.data
}

/**
 * 한 scene 당 영상 추출
 * @param text
 */
export const getSearchVideo = async (text: string) => {
  const response = await apiClient.get(`/api/video/search?text=${text}`, {
    headers: {
      skip_zrok_interstitial: 'sdf',
    },
  })
  return response.data
}

/**
 * 자막이 달린 video
 * @param storyList
 */
export const createVideo = async (storyList: StoryType[]) => {
  const response = await apiClient.post(
    '/api/ai/video_generate_async',
    {
      story: storyList,
    },
    {
      headers: {
        skip_zrok_interstitial: 'sdf',
      },
    }
  )
  return response.data
}

export const getTaskResult = async (taskId: string | null) => {
  const response = await apiClient.get(`/api/ai/task_status/${taskId}`, {
    headers: {
      skip_zrok_interstitial: 'sdf',
    },
  })
  return response.data
}

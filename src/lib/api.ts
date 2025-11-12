// POST
import apiClient from './axios.ts'
import type { MusicResponseType, StoryBoardType } from '../types/common.ts'

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
 * @param selectedVideoList
 * @param music
 * @param voice
 */
export const createVideo = async (
  selectedVideoList: {
    scene: number
    script: string
    subtitle: string
    video_file_name: string
  }[],
  music?: string,
  voice?: string
) => {
  const response = await apiClient.post(
    `/api/ai/video_generate_mixed_async?avoid_duplicates=true&filter_vertical=true${music ? `&background_music=${music}` : ''}${voice ? `&voice=${voice}` : ''}`,
    selectedVideoList,
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

/**
 * 배경 음악 검색
 * @param text
 */
export const getMusicSearch = async (text: string): Promise<MusicResponseType[]> => {
  const response = await apiClient.get(`/api/music/search?text=${text}`, {
    headers: {
      skip_zrok_interstitial: 'sdf',
    },
  })
  return response.data
}

/**
 * 비디오 히스토리 조회
 * @param limit
 * @param offset
 */
export const getVideoHistory = async (limit = 10, offset = 0) => {
  const response = await apiClient.get(`/api/ai/video_history?limit=${limit}&offset=${offset}`, {
    headers: {
      skip_zrok_interstitial: 'sdf',
    },
  })
  return response.data
}

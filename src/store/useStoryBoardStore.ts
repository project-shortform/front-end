import { create } from 'zustand/index'
import type { NewSearchVideoListType, SearchVideoType, StoryType } from '../types/common.ts'

export interface StoryBoardStoreType {
  isLoading?: boolean
  concept?: string
  conceptInputValue?: string
  conceptDetail?: string
  quantity?: string
  category?: string
  gender?: string
  age?: string
  material_type?: 'url' | 'txt' | 'pdf' | string
  content?: string
  viewersStyle?: string
  requestInfo?: string
  storyList?: StoryType[]
  selectedVideoUrl?: string
  selectedScene?: number
  searchVideoList?: { scene: number; result: SearchVideoType[] }[]
  newSearchVideoList?: NewSearchVideoListType[]
  selectedEngScript?: string
  activeAsyncVideo?: boolean //영상 동기화 처리
  processingTaskId?: string | null
  resultVideoUrl?: string | null
}

interface useStoryBoardStoreType {
  isLoading: boolean
  category: string
  concept: string
  conceptInputValue: string
  conceptDetail: string
  quantity: string
  gender: string
  age: string
  material_type: 'url' | 'txt' | 'pdf' | string
  content: string
  viewersStyle: string
  requestInfo: string
  storyList: StoryType[]
  selectedVideoUrl: string
  selectedScene: number
  selectedEngScript: string
  searchVideoList: { scene: number; result: SearchVideoType[] }[]
  newSearchVideoList: NewSearchVideoListType[]
  activeAsyncVideo: boolean //영상 동기화 처리
  processingTaskId: string | null //처리중인 taskId
  resultVideoUrl: string | null

  setStoryBoardState: (params: StoryBoardStoreType) => void
}

export const useStoryBoardStore = create<useStoryBoardStoreType>((set) => ({
  isLoading: false,
  quantity: '',
  age: '',
  concept: '',
  conceptInputValue: '',
  conceptDetail: '',
  category: '',
  material_type: 'txt',
  content: '',
  gender: '',
  viewersStyle: '',
  requestInfo: '',
  storyList: [],
  //동영상 search
  searchVideoList: [],
  newSearchVideoList: [],
  selectedVideoUrl: '',
  selectedScene: 0,
  selectedEngScript: '',
  activeAsyncVideo: false,
  processingTaskId: null,
  resultVideoUrl: null,

  setStoryBoardState: (params: StoryBoardStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))

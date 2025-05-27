import { create } from 'zustand/index'
import type { NewSearchVideoListType, SearchVideoType, StoryType } from '../types/common.ts'

export interface StoryBoardStoreType {
  isLoading?: boolean
  concept?: string
  conceptInputValue?: string
  quantity?: string
  category?: string
  gender?: string
  age?: string
  viewersStyle?: string
  requestInfo?: string
  storyList?: StoryType[]
  selectedVideoUrl?: string
  selectedScene?: number
  searchVideoList?: { scene: number; result: SearchVideoType[] }[]
  newSearchVideoList?: NewSearchVideoListType[]
  selectedEngScript?: string
}

interface useStoryBoardStoreType {
  isLoading: boolean
  category: string
  concept: string
  conceptInputValue: string
  quantity: string
  gender: string
  age: string
  viewersStyle: string
  requestInfo: string
  storyList: StoryType[]
  selectedVideoUrl: string
  selectedScene: number
  selectedEngScript: string
  searchVideoList: { scene: number; result: SearchVideoType[] }[]
  newSearchVideoList: NewSearchVideoListType[]

  setStoryBoardState: (params: StoryBoardStoreType) => void
}

export const useStoryBoardStore = create<useStoryBoardStoreType>((set) => ({
  isLoading: false,
  concept: '',
  conceptInputValue: '',
  quantity: '',
  category: '',
  gender: '',
  age: '',
  viewersStyle: '',
  requestInfo: '',
  storyList: [],
  //동영상 search
  searchVideoList: [],
  newSearchVideoList: [],
  selectedVideoUrl: '',
  selectedScene: 0,
  selectedEngScript: '',

  setStoryBoardState: (params: StoryBoardStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))

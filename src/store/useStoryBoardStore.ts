import { create } from 'zustand/index'
import type { SearchVideoType, StoryType } from '../types/common.ts'

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
  searchVideoList?: { scene: number; result: SearchVideoType[] }[]
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
  searchVideoList: { scene: number; result: SearchVideoType[] }[]

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
  searchVideoList: [],

  setStoryBoardState: (params: StoryBoardStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))

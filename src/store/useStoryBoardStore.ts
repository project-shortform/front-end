import { create } from 'zustand/index'
import type {
  MusicResponseType,
  NewSearchVideoListType,
  SearchVideoType,
  SelectedVideoType,
  StoryType,
} from '../types/common.ts'

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
  selectedVideoFileName?: string
  selectedVideoThumbnail?: string
  selectedScene?: number
  selectedVideoList?: SelectedVideoType[]
  selectedMusic?: string
  searchVideoList?: { scene: number; result: SearchVideoType[] }[]
  searchMusicList?: MusicResponseType[]
  newSearchVideoList?: NewSearchVideoListType[]
  selectedEngScript?: string
  activeAsyncVideo?: boolean
  processingTaskId?: string | null
  resultVideoUrl?: string | undefined
}

interface useStoryBoardStoreType extends StoryBoardStoreType {
  setStoryBoardState: (params: Partial<StoryBoardStoreType>) => void
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
  searchVideoList: [],
  newSearchVideoList: [],
  selectedVideoFileName: '',
  selectedVideoThumbnail: '',
  selectedMusic: '',
  selectedVideoList: [],
  searchMusicList: [],
  selectedScene: 1,
  selectedEngScript: '',
  activeAsyncVideo: false,
  processingTaskId: null,
  resultVideoUrl: undefined,

  // ✅ 수정: 직접 params만 전달하기
  setStoryBoardState: (params) => {
    set(params)
  },
}))

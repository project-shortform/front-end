export type HeaderType = 'DEFAULT'
export interface StoryBoardType {
  style: {
    category: string
    concept: string
    quantity: string
  }
  viewers: {
    sex: string
    age: string
    viewers_style: string
  }
  info: {
    request_info: string
  }
}

export interface StoryType {
  scene: number
  script: string
  subtitle: string
}

export interface ResultVideoType {
  result: string
  output_video: string
  record_id: number
  options_used: {
    avoid_duplicates: boolean
    filter_vertical: boolean
    max_search_results: number
  }
  videos_used: null
}

export interface SearchVideoType {
  distance: number
  file_name: string
  metadata: {
    file_name: string
    infomation: string
  }
}

export type SideBarType = '영상' | '설정' | '업로드' | '썸네일'

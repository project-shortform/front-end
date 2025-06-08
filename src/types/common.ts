export type HeaderType = 'DEFAULT'
export interface StoryBoardType {
  basic_info: {
    quantity: string
    age: string
  }
  style_info: {
    concept: string
    concept_detail: string
  }
  material_info: {
    material_type: string
    content: string
  }
}

export interface StoryType {
  scene: number
  script_eng: string
  script_ko: string
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
    information: string
    thumbnail: string
  }
}

export interface NewSearchVideoListType {
  scene: number
  result: {
    blobUrl: string
    distance: number
    file_name: string
    metadata: { file_name: string; information: string }
  }[]
}

export interface AsyncMovieResultType {
  queue_position: number
  result: string
  source: string
  task: {
    started_at?: string | null
    completed_at?: null | string
    created_at: null | string
    error: null | boolean
    id: '339e7da0-0d54-485a-89f8-bd1dd900c3a8'
    progress: number
    result?: null | {
      output_video: string
      record_id: number
    }
    status: 'pending' | 'processing' | 'completed' | 'failed'
    type: string
  }
}

export type SideBarType = '영상' | '설정' | '업로드' | '썸네일'

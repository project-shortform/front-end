export type HeaderType = 'DEFAULT'
export interface StoryBoardType {
  basic_info?: {
    quantity?: string
    age?: string
  }
  style_info?: {
    concept?: string
    concept_detail?: string
  }
  material_info?: {
    material_type?: string
    content?: string
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
  file_name?: string
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
    metadata: { file_name: string; information: string; thumbnail: string }
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

export interface CreateAsyncMovieResultType {
  estimated_wait_time: string
  message: string
  queue_position: number
  result: string
  status: string
  task_id: string
}

export type SideBarType = '영상' | '설정' | '음악' | '음성'

export interface SelectedVideoType {
  scene: number
  video_file_name: string
  subtitle: string
  thumbnail?: string
  script: string
}

export interface MusicResponseType {
  metadata: {
    file_name: string
    information: string
    duration: number
    type: 'music'
  }
  distance: number
}

export interface VideoHistoryItem {
  output_path: string
  created_at: string
  video_infos: {
    path: string
    audio_path: string
    text: string
    scene: number
    script: string
    search_keywords: string | null
    video_file_name: string
    selection_method: string
    metadata: Record<string, unknown>
  }[]
  story_request: {
    scenes: {
      scene: number
      video_file_name: string
      subtitle: string
      script: string
    }[]
  }
  generation_options: {
    generation_type: string
    avoid_duplicates: boolean
    filter_vertical: boolean
    max_search_results: number
    skip_unresolved: boolean
    voice?: string
    async_processing: boolean
  }
  id: number
}

export interface VideoHistoryResponse {
  result: string
  total_count: number
  returned_count: number
  offset: number
  limit: number | null
  history: VideoHistoryItem[]
}

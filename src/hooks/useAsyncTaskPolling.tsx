import { useEffect, useCallback, useRef, useState } from 'react'
import { getTaskResult } from '../lib/api.ts'

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

interface UseAsyncTaskPollingProps {
  isActive: boolean | undefined
  taskId: string | null | undefined
  onSuccess: (videoUrl: string) => void
  onError?: (error: Error) => void
  pollInterval?: number
}

interface TaskProgress {
  progress: number
  status: AsyncMovieResultType['task']['status']
  error?: string | null
}

/**
 * 비동기 작업의 진행 상황을 폴링하는 커스텀 훅 (수정 버전)
 *
 * @description
 * 이전 버전과의 주요 차이:
 * - useRef 대신 useState를 사용하여 리렌더링 트리거
 * - progress 업데이트 시 UI가 실시간으로 반영됨
 * - console.log로 값이 업데이트되는 것을 확인할 수 있음
 */
export const useAsyncTaskPolling = ({
  isActive,
  taskId,
  onSuccess,
  onError,
  pollInterval = 1000,
}: UseAsyncTaskPollingProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // ========== useState로 상태 관리 (이게 중요!) ==========
  // progress를 useState로 관리하면 업데이트될 때마다 컴포넌트가 리렌더링됨
  const [taskProgress, setTaskProgress] = useState<TaskProgress>({
    progress: 0,
    status: 'pending',
  })

  // 작업 상태 조회 함수
  const pollTaskStatus = useCallback(async () => {
    if (!taskId) return

    try {
      // 실무에서 API 호출 시 에러 처리는 필수
      const res: AsyncMovieResultType = await getTaskResult(taskId)
      const { progress, status, error } = res.task

      // ========== useState로 상태 업데이트 (리렌더링 발생!) ==========
      setTaskProgress({
        progress: progress || 0,
        status,
        error: error ? '작업 중 오류가 발생했습니다' : null,
      })

      console.log(`[Task Polling] Progress: ${progress}%, Status: ${status}`)

      // 작업 완료 처리
      if (status === 'completed') {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        const videoUrl = res.task.result?.output_video
        if (videoUrl) {
          onSuccess(videoUrl)
        }
      }

      // 작업 실패 처리
      if (status === 'failed') {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        const errorMessage = new Error('작업이 실패했습니다')
        onError?.(errorMessage)
      }
    } catch (err) {
      console.error('[Task Polling Error]', err)
      const error = err instanceof Error ? err : new Error('알 수 없는 오류')
      onError?.(error)

      // 에러 발생 시 폴링 중단
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [taskId, onSuccess, onError])

  // 폴링 시작/중지 로직
  useEffect(() => {
    // 조건을 만족하지 않으면 폴링 시작하지 않음
    if (!isActive || !taskId) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    // 초기 상태 리셋
    setTaskProgress({
      progress: 0,
      status: 'pending',
    })

    // 첫 요청은 즉시 실행
    pollTaskStatus()

    // 이후 정기적으로 폴링
    intervalRef.current = setInterval(pollTaskStatus, pollInterval)

    // 정리 함수
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isActive, taskId, pollInterval, pollTaskStatus])

  return taskProgress
}

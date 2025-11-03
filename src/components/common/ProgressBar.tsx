import type { FC } from 'react'

interface ProgressBarProps {
  /** 진행률 (0-100) */
  progress: number
  /** 작업 상태 */
  status: 'pending' | 'processing' | 'completed' | 'failed'
  /** 에러 메시지 (있을 경우) */
  error?: string | null
  /** 커스텀 CSS 클래스 */
  className?: string
}

/**
 * 진행 바 컴포넌트
 *
 * @description
 * 비동기 작업의 진행률을 시각적으로 표시합니다.
 * Tailwind CSS를 사용하며, 상태에 따라 다른 색상을 표시합니다.
 * - pending: 회색
 * - processing: #EF4B56 (메인 컬러)
 * - completed: 초록색
 * - failed: 빨간색
 */
export const ProgressBar: FC<ProgressBarProps> = ({ progress, status, error, className = '' }) => {
  // 상태에 따른 색상 결정
  const getProgressColor = (): string => {
    switch (status) {
      case 'pending':
        return 'bg-gray-300'
      case 'processing':
        return 'bg-[#EF4B56]' // 메인 컬러
      case 'completed':
        return 'bg-green-500'
      case 'failed':
        return 'bg-red-500'
      default:
        return 'bg-gray-300'
    }
  }

  // 상태에 따른 텍스트 표시
  const getStatusText = (): string => {
    switch (status) {
      case 'pending':
        return '준비 중...'
      case 'processing':
        return '처리 중...'
      case 'completed':
        return '완료!'
      case 'failed':
        return '실패'
      default:
        return ''
    }
  }

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* 진행 바 */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full ${getProgressColor()} transition-all duration-300 ease-out`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* 진행률과 상태 표시 */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{getStatusText()}</span>
        <span className="text-sm font-semibold text-gray-900">{progress}%</span>
      </div>

      {/* 에러 메시지 표시 */}
      {error && <div className="text-sm font-medium text-red-600">{error}</div>}
    </div>
  )
}

import type { FC } from 'react'
import { ProgressBar } from '../common/ProgressBar.tsx'

interface AsyncLoadingModalProps {
  /** 모달 표시 여부 */
  isOpen: boolean | undefined
  /** 진행률 (0-100) */
  progress: number
  /** 작업 상태 */
  status: 'pending' | 'processing' | 'completed' | 'failed'
  /** 에러 메시지 (있을 경우) */
  error?: string | null
  /** 모달 제목 */
  title?: string
  /** 모달 설명 텍스트 */
  description?: string
  /** 모달 닫기 핸들러 */
  onClose?: () => void
  /** 모달 배경 클릭 시 닫기 여부 */
  closeOnBackdropClick?: boolean
  /** 추가 CSS 클래스 */
  className?: string
}

/**
 * 비동기 작업 진행 상황을 표시하는 로딩 모달
 *
 * @description
 * 비디오 생성, 파일 변환 등 장시간 걸리는 작업의 진행률을 모달 형태로 표시합니다.
 *
 * 실무 활용:
 * - 비디오 렌더링/생성
 * - 파일 업로드/다운로드
 * - 데이터 처리 및 분석
 * - 대량 작업 처리
 *
 * @example
 * const { progress, status, error } = useAsyncTaskPolling({...})
 *
 * return (
 *   <AsyncLoadingModal
 *     isOpen={isLoading}
 *     progress={progress}
 *     status={status}
 *     error={error}
 *     title="비디오 생성 중"
 *     description="최대 5분이 소요될 수 있습니다"
 *     onClose={() => setIsLoading(false)}
 *   />
 * )
 */
export const AsyncLoadingModal: FC<AsyncLoadingModalProps> = ({
  isOpen,
  progress,
  status,
  error,
  title = '처리 중...',
  description,
  onClose,
  closeOnBackdropClick = false,
  className = '',
}) => {
  // 모달이 열려있지 않으면 렌더링하지 않음
  if (!isOpen) {
    return null
  }

  // 배경 클릭 핸들러
  const handleBackdropClick = () => {
    if (closeOnBackdropClick && onClose) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={handleBackdropClick}>
      {/* 반투명 배경 */}
      <div className="bg-opacity-50 absolute inset-0 bg-black" />

      {/* 모달 콘텐츠 */}
      <div
        className={`relative z-10 mx-4 w-full max-w-md rounded-lg bg-white p-8 shadow-xl ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 제목 */}
        <h2 className="mb-2 text-xl font-bold text-gray-900">{title}</h2>

        {/* 설명 텍스트 */}
        {description && <p className="mb-6 text-sm text-gray-600">{description}</p>}

        {/* 애니메이션 효과 (처리 중일 때만 표시) - 위로 올림 */}
        {status === 'processing' && (
          <div className="mb-4 flex justify-center gap-1 py-[20px]">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-2 w-2 animate-pulse rounded-full bg-[#EF4B56]"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )}

        {/* 진행 바 */}
        <div className="mb-6">
          <ProgressBar progress={progress} status={status} error={error} />
        </div>

        {/* 상태별 메시지 */}
        {status === 'completed' && (
          <div className="mb-4 flex items-center gap-2 text-sm text-green-600">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>작업이 완료되었습니다!</span>
          </div>
        )}

        {status === 'failed' && (
          <div className="mb-4 flex items-center gap-2 text-sm text-red-600">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>작업 중 오류가 발생했습니다</span>
          </div>
        )}

        {/* 닫기 버튼 (완료 또는 실패 상태일 때만 표시) */}
        {(status === 'completed' || status === 'failed') && onClose && (
          <button
            onClick={onClose}
            className="mt-4 w-full rounded-lg bg-[#EF4B56] px-4 py-2 font-medium text-white transition-colors hover:bg-[#d93e45]"
          >
            닫기
          </button>
        )}
      </div>
    </div>
  )
}

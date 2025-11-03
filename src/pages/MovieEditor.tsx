import Header from '../components/common/Header.tsx'
import { useEffect, useState, useCallback } from 'react'
import Modal from '../components/common/Modal.tsx'
import SideBar from '../components/movie-editor/SideBar.tsx'
import MainDashBoard from '../components/movie-editor/MainDashBoard.tsx'
import { useStoryBoardStore } from '../store/useStoryBoardStore.ts'
import type { SideBarType } from '../types/common.ts'
import { useNavigate } from 'react-router-dom'
import ResultButton from '../components/common/ResultButton.tsx'
import LoginModal from '../components/modal/LoginModal.tsx'
import { AsyncLoadingModal } from '../components/modal/AsyncLoadingModal.tsx'
import { useAsyncTaskPolling } from '../hooks/useAsyncTaskPolling.tsx'

const MovieEditor = () => {
  const navigate = useNavigate()

  // ========== 상태 관리 ==========
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState<SideBarType>('영상')

  // Zustand 스토어 상태
  const searchVideoList = useStoryBoardStore((state) => state.searchVideoList)
  const isLoading = useStoryBoardStore((state) => state.isLoading)
  const setStoryBoardState = useStoryBoardStore((state) => state.setStoryBoardState)
  const storyList = useStoryBoardStore((state) => state.storyList)
  const selectedVideoList = useStoryBoardStore((state) => state.selectedVideoList)
  const processingTaskId = useStoryBoardStore((state) => state.processingTaskId)
  const activeAsyncVideo = useStoryBoardStore((state) => state.activeAsyncVideo)

  // ========== 콜백 함수 ==========

  /**
   * 비디오 생성 완료 핸들러
   * - 결과 비디오 URL 저장
   * - 로딩 상태 종료
   * - create-movie 페이지로 이동
   */
  const handleTaskSuccess = useCallback(
    (videoUrl: string) => {
      console.log('[MovieEditor] ✅ handleTaskSuccess 호출됨')
      console.log('[MovieEditor] videoUrl:', videoUrl)
      setStoryBoardState({
        activeAsyncVideo: false,
        isLoading: false,
        resultVideoUrl: videoUrl,
      })
      // 완료 후 create-movie 페이지로 이동
      console.log('[MovieEditor] /create-movie로 이동 중...')
      navigate('/create-movie')
    },
    [setStoryBoardState, navigate]
  )

  /**
   * 비디오 생성 실패 핸들러
   * - 로딩 상태 종료
   * - 에러 로그 출력
   */
  const handleTaskError = useCallback(
    (error: Error) => {
      console.error('[MovieEditor] ❌ handleTaskError 호출됨')
      console.error('[MovieEditor] 에러 메시지:', error.message)
      setStoryBoardState({
        activeAsyncVideo: false,
        isLoading: false,
      })
      // 필요하면 사용자에게 토스트 알림 표시
      // toast.error(error.message)
    },
    [setStoryBoardState]
  )

  // ========== 폴링 훅 ==========
  /**
   * useAsyncTaskPolling 사용
   * - activeAsyncVideo && processingTaskId 조건에서만 폴링 시작
   * - 완료/실패 시 자동으로 정리
   * - progress 값으로 진행 상황 추적
   */
  const taskProgress = useAsyncTaskPolling({
    isActive: activeAsyncVideo && !!processingTaskId,
    taskId: processingTaskId,
    onSuccess: handleTaskSuccess,
    onError: handleTaskError,
    pollInterval: 1000, // 1초마다 폴링
  })

  // ========== selectedVideoList 초기화 ==========
  /**
   * storyList와 searchVideoList가 변경될 때마다
   * selectedVideoList 업데이트
   */
  useEffect(() => {
    if (!storyList || storyList.length === 0 || !searchVideoList || searchVideoList.length === 0) {
      return
    }

    const newSelectedVideoList = storyList.map((story) => {
      const searchVideo = searchVideoList.find((video) => video.scene === story.scene)

      return {
        scene: story.scene,
        video_file_name: searchVideo?.result[0]?.metadata.file_name || '',
        thumbnail: searchVideo?.result[0].metadata.thumbnail || '',
        subtitle: story.subtitle,
        script: story.script_ko,
      }
    })

    setStoryBoardState({ selectedVideoList: newSelectedVideoList })
  }, [storyList, searchVideoList, setStoryBoardState])

  // ========== 디버깅 로그 (개발 환경) ==========
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[MovieEditor] searchVideoList:', searchVideoList)
    }
  }, [searchVideoList])

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[MovieEditor] selectedVideoList:', selectedVideoList)
    }
  }, [selectedVideoList])

  // ========== 진행 바 디버깅 로그 (가장 중요!) ==========
  useEffect(() => {
    console.log('========== PROGRESS BAR DEBUG ==========')
    console.log('[MovieEditor] activeAsyncVideo:', activeAsyncVideo)
    console.log('[MovieEditor] isLoading:', isLoading)
    console.log('[MovieEditor] processingTaskId:', processingTaskId)
    console.log('[MovieEditor] taskProgress:', taskProgress)
    console.log('[MovieEditor] AsyncLoadingModal isOpen:', activeAsyncVideo && isLoading)
    console.log('[MovieEditor] progress 값:', taskProgress.progress)
    console.log('[MovieEditor] status 값:', taskProgress.status)
    console.log('========================================')
  }, [activeAsyncVideo, isLoading, processingTaskId, taskProgress])

  // ========== 렌더링 ==========

  return (
    <main>
      {/* 로그인 모달 */}
      {isLoginModalOpen && <LoginModal setIsLoginModalOpen={setIsLoginModalOpen} />}

      {/* 기존 로딩 모달 (다른 로딩용) */}
      {isLoading && !activeAsyncVideo && (
        <Modal onClick={() => setStoryBoardState({ isLoading: false })} className="pt-[100px]" isDeleteIcon={false}>
          {/* Spinner 또는 다른 로딩 UI */}
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500" />
            <p className="text-gray-600">로딩 중...</p>
          </div>
        </Modal>
      )}

      {/* ===== 진행 바 디버그 박스 (개발 환경에서만) ===== */}
      {process.env.NODE_ENV === 'development' && (activeAsyncVideo || isLoading) && (
        <div
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            background: 'rgba(0, 0, 0, 0.9)',
            color: '#00ff00',
            padding: '15px',
            borderRadius: '8px',
            zIndex: 9999,
            fontSize: '12px',
            fontFamily: 'monospace',
            border: '2px solid #00ff00',
            maxWidth: '300px',
          }}
        >
          <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#ffff00' }}>DEBUG INFO</div>
          <div>activeAsyncVideo: {String(activeAsyncVideo)}</div>
          <div>isLoading: {String(isLoading)}</div>
          <div>taskId: {processingTaskId || 'null'}</div>
          <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #00ff00' }}>
            <div style={{ color: '#00ffff' }}>Progress Data:</div>
            <div>progress: {taskProgress.progress}%</div>
            <div>status: {taskProgress.status}</div>
            <div>error: {taskProgress.error || 'null'}</div>
          </div>
          <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #00ff00' }}>
            <div style={{ color: '#ffff00' }}>Modal isOpen: {String(activeAsyncVideo && isLoading)}</div>
          </div>
        </div>
      )}

      {/* 비디오 생성 진행 모달 - 새로운 컴포넌트 */}
      <AsyncLoadingModal
        isOpen={activeAsyncVideo && isLoading}
        progress={taskProgress.progress}
        status={taskProgress.status}
        error={taskProgress.error}
        title="비디오 생성 중"
        description="AI가 스토리보드를 멋진 비디오로 변환하고 있습니다"
        onClose={() =>
          setStoryBoardState({
            activeAsyncVideo: false,
            isLoading: false,
          })
        }
        closeOnBackdropClick={false}
      />

      {/* 헤더 */}
      <Header headerType={'DEFAULT'} onClick={() => setIsLoginModalOpen(true)} />

      {/* 헤더 높이만큼 스페이서 */}
      <div className="h-[5rem]" />

      {/* 메인 콘텐츠 */}
      <div className="flex">
        <SideBar setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} />
        <MainDashBoard />
      </div>

      {/* 결과 버튼 */}
      <ResultButton />
    </main>
  )
}

export default MovieEditor

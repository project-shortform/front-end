import Header from '../components/common/Header.tsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStoryBoardStore } from '../store/useStoryBoardStore.ts'
import ResultButton from '../components/common/ResultButton.tsx'
import LoginModal from '../components/modal/LoginModal.tsx'

const BASE_URL = import.meta.env.VITE_API_URL

const MovieCreator = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const resultVideoUrl = useStoryBoardStore((state) => state.resultVideoUrl)
  const navigate = useNavigate()

  // 동영상 다운로드 함수
  const handleDownloadVideo = async () => {
    if (!resultVideoUrl) {
      alert('다운로드할 동영상이 없습니다.')
      return
    }

    setIsDownloading(true)

    try {
      const videoUrl = `${BASE_URL}/${resultVideoUrl}`

      // fetch로 동영상 바이너리 데이터 가져오기
      const response = await fetch(videoUrl)

      if (!response.ok) {
        throw new Error(`다운로드 실패: ${response.statusText}`)
      }

      // Blob으로 변환
      const blob = await response.blob()

      // 동적으로 다운로드 링크 생성
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl

      // 파일명 설정 (URL에서 파일명 추출 또는 기본값 사용)
      const filename = resultVideoUrl.split('/').pop() || 'video.mp4'
      link.download = filename

      // 클릭 트리거
      document.body.appendChild(link)
      link.click()

      // 정리
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)

      console.log('다운로드 완료')
    } catch (err) {
      console.error('다운로드 오류:', err)
      alert('동영상 다운로드에 실패했습니다.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {isLoginModalOpen && <LoginModal setIsLoginModalOpen={setIsLoginModalOpen} />}
      <Header headerType={'DEFAULT'} onClick={() => setIsLoginModalOpen(true)} />
      <div className="h-[80px]" />
      <div className="relative flex flex-col items-center justify-center">
        <section className="bg-color border-gray-5 border-gray-5 flex h-[736px] w-[1262px] flex-col items-center gap-y-5 rounded-[20px] border p-5">
          <div className="mt-5 w-[800px]">
            <div className="flex flex-col items-center justify-center">
              {resultVideoUrl ? (
                <video controls src={`${BASE_URL}/${resultVideoUrl}`} className="bg-gray-5 mt-[32px] w-[100%]" />
              ) : (
                <div className="bg-gray-5 h-[474px] w-full" />
              )}
            </div>
          </div>

          <div className="absolute right-5 bottom-5 left-5 flex gap-x-6">
            <button onClick={() => navigate('/storyboard')} className="secondary-active-button h-[56px] w-full">
              새로운 영상 만들기
            </button>
            <button
              onClick={handleDownloadVideo}
              disabled={!resultVideoUrl || isDownloading}
              className="active-button h-[56px] w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDownloading ? '다운로드 중...' : '다운로드'}
            </button>
          </div>
        </section>
      </div>
      <ResultButton />
    </main>
  )
}
export default MovieCreator

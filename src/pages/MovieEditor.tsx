import Header from '../components/common/Header.tsx'
import { useEffect, useState } from 'react'
import Modal from '../components/common/Modal.tsx'
import { GoogleLogo, KakaoLogo } from '../assets/svgComponents'
import SideBar from '../components/movie-editor/SideBar.tsx'
import MainDashBoard from '../components/movie-editor/MainDashBoard.tsx'
import { useStoryBoardStore } from '../store/useStoryBoardStore.ts'
import Spinner from '../components/common/Spinner.tsx'
import { getTaskResult } from '../lib/api.ts'
import type { AsyncMovieResultType } from '../types/common.ts'
import { useNavigate } from 'react-router-dom'
import ResultButton from '../components/common/ResultButton.tsx'

const MovieEditor = () => {
  const navigate = useNavigate()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState<'영상' | '설정' | '업로드' | '썸네일'>('영상')
  const searchVideoList = useStoryBoardStore((state) => state.searchVideoList)
  const isLoading = useStoryBoardStore((state) => state.isLoading)
  const setStoryBoardState = useStoryBoardStore((state) => state.setStoryBoardState)
  useEffect(() => {
    console.log('searchVideoList', searchVideoList)
  }, [searchVideoList])

  const processingTaskId = useStoryBoardStore((state) => state.processingTaskId)
  const activeAsyncVideo = useStoryBoardStore((state) => state.activeAsyncVideo)

  useEffect(() => {
    console.log('activeAsyncVideo', activeAsyncVideo)
    console.log('taskId', processingTaskId)

    if (!activeAsyncVideo || !processingTaskId) return

    const interval = setInterval(async () => {
      try {
        console.log('요청 보내짐')
        const res: AsyncMovieResultType = await getTaskResult(processingTaskId)
        console.log('Task Status:', res)

        if (res.task.status === 'completed') {
          setStoryBoardState({
            activeAsyncVideo: false,
            isLoading: false,
            resultVideoUrl: res.task.result?.output_video,
          })
          navigate('/create-movie')
        }

        // 필요하면 상태 갱신
      } catch (err) {
        console.error('Task status polling error:', err)
      }
    }, 1000) // 1초마다

    return () => {
      clearInterval(interval) // unmount 또는 조건 변경 시 중단
    }
  }, [activeAsyncVideo, processingTaskId])

  return (
    <main>
      {isLoginModalOpen && (
        <Modal onClick={() => setIsLoginModalOpen(false)}>
          <section className="mt-[5rem] flex flex-col items-center justify-center gap-y-[6.25rem]">
            <h2 className="title-lg text-gray-1">로그인이 필요합니다.</h2>
            <div className="flex flex-col gap-y-3">
              <button className="button-md flex h-[3.5rem] w-[25rem] items-center justify-center gap-x-2 rounded-[0.5rem] bg-[#FEE500] text-[#000000]">
                <KakaoLogo width={18} height={18} />
                카카오 로그인
              </button>
              <button className="border-gray-2 button-md flex h-[3.5rem] w-[25rem] items-center justify-center gap-x-2 rounded-[0.5rem] border bg-white text-[#000000]">
                <GoogleLogo width={20} height={20} />
                구글로 로그인
              </button>
            </div>
          </section>
        </Modal>
      )}
      {isLoading && (
        <Modal onClick={() => setStoryBoardState({ isLoading: false })} className="pt-[100px]" isDeleteIcon={false}>
          <Spinner />
        </Modal>
      )}
      <Header headerType={'DEFAULT'} onClick={() => setIsLoginModalOpen(true)} />
      <div className="h-[5rem]" />
      <div className="flex items-center justify-center">
        <SideBar setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} />
        <MainDashBoard />
      </div>
      <ResultButton />
    </main>
  )
}
export default MovieEditor

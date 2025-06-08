import Header from '../components/common/Header.tsx'
import { useEffect, useState } from 'react'
import Modal from '../components/common/Modal.tsx'
import { GoogleLogo, KakaoLogo } from '../assets/svgComponents'
import { useNavigate } from 'react-router-dom'
import { useStoryBoardStore } from '../store/useStoryBoardStore.ts'

const MovieCreator = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const resultVideoUrl = useStoryBoardStore((state) => state.resultVideoUrl)
  const navigate = useNavigate()
  const [newResultVideoUrl, setNewResultVideoUrl] = useState('')

  useEffect(() => {
    const fetchVideoUrl = async () => {
      const fileName = resultVideoUrl
      if (!fileName) return

      const url = `https://hzit42bv0qlx.share.zrok.io/${fileName}`
      const res = await fetch(url, {
        headers: {
          skip_zrok_interstitial: 'sdf',
        },
      })
      const blob = await res.blob()
      const blobUrl = URL.createObjectURL(blob)

      setNewResultVideoUrl(blobUrl)
    }

    fetchVideoUrl()
  }, [resultVideoUrl])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
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
      <Header headerType={'DEFAULT'} onClick={() => setIsLoginModalOpen(true)} />
      <div className="h-[80px]" />
      <div className="relative flex flex-col items-center justify-center">
        <section className="bg-color border-gray-5 border-gray-5 flex h-[736px] w-[1262px] flex-col items-center gap-y-5 rounded-[20px] border p-5">
          <div className="mt-5 w-[800px]">
            <div className="flex flex-col items-center justify-center">
              {resultVideoUrl ? (
                <video controls src={newResultVideoUrl} className="bg-gray-5 mt-[32px] h-[474px] w-[80%]" />
              ) : (
                <div className="bg-gray-5 h-[474px] w-full" />
              )}
            </div>

            <div className="mt-5 flex gap-x-2">
              <input className="default-input w-full" placeholder={'영상의 제목을 입력해주세요.'}></input>
              <button className="outline-default-button h-[48px] w-[120px]">저장</button>
            </div>
          </div>

          <div className="absolute right-5 bottom-5 left-5 flex gap-x-6">
            <button onClick={() => navigate('/edit-movie')} className="secondary-active-button h-[56px] w-full">
              편집으로 돌아가기
            </button>
            <button className="active-button h-[56px] w-full">다운로드</button>
          </div>
        </section>
      </div>
    </main>
  )
}
export default MovieCreator

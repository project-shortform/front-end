import Header from '../components/common/Header.tsx'
import { useState } from 'react'
import Modal from '../components/common/Modal.tsx'
import { GoogleLogo, KakaoLogo } from '../assets/svgComponents'
import SideBar from '../components/movie-editor/SideBar.tsx'
import MainDashBoard from '../components/movie-editor/MainDashBoard.tsx'

const MovieEditor = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

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
      <Header headerType={'DEFAULT'} onClick={() => setIsLoginModalOpen(true)} />
      <div className="h-[5rem]" />
      <div className="flex items-center justify-center gap-x-[1.688rem] px-[2.5rem] py-[1.563rem]">
        <SideBar />
        <MainDashBoard />
      </div>
    </main>
  )
}
export default MovieEditor

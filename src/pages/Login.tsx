import Header from '../components/common/Header.tsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/common/Modal.tsx'
import { GoogleLogo, KakaoLogo } from '../assets/svgComponents'

const Login = () => {
  const navigate = useNavigate()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
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
      <div className="">
        <section className="flex flex-col items-center justify-center gap-y-[2.5rem]">
          <h1 className="text-gray-1 heading text-center">
            만들고 싶었던 영상을 <br />
            쉽고 간편하게
          </h1>
          <button
            onClick={() => navigate('/storyboard')}
            className="active-button hover:bg-main-dark h-[3.5rem] w-[25rem]"
          >
            영상 제작하기
          </button>
        </section>
      </div>
    </main>
  )
}
export default Login

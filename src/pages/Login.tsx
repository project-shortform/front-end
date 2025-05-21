import Header from '../components/common/Header.tsx'
import { useState } from 'react'
import Modal from '../components/common/Modal.tsx'
import { GoogleLogo, KakaoLogo } from '../assets/svgComponents'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full">
      {isLoginModalOpen && (<Modal onClick={() => setIsLoginModalOpen(false)}>
        <section className="flex flex-col items-center justify-center gap-y-[6.25rem] mt-[5rem]">
          <h2 className="title-lg text-gray-1">로그인이 필요합니다.</h2>
          <div className="flex flex-col gap-y-3">
            <button className="flex items-center justify-center gap-x-2 w-[25rem] h-[3.5rem] rounded-[0.5rem] bg-[#FEE500] text-[#000000] button-md">
              <KakaoLogo width={18} height={18} />
              카카오 로그인
            </button>
            <button className="flex items-center justify-center gap-x-2 w-[25rem] h-[3.5rem] border border-gray-2 rounded-[0.5rem] text-[#000000] button-md bg-white">
              <GoogleLogo width={20} height={20} />
              구글로 로그인
            </button>
          </div>
        </section>
      </Modal>)}
      <Header headerType={'DEFAULT'} onClick={() => setIsLoginModalOpen(true)} />
      <div className="">

        <section className="flex flex-col gap-y-[2.5rem] items-center justify-center">
          <h1 className="text-gray-1 heading text-center">만들고 싶었던 영상을 <br />
            쉽고 간편하게
          </h1>
          <button onClick={() => navigate('/storyboard')} className="active-button h-[3.5rem] w-[25rem] hover:bg-main-dark">영상 제작하기</button>
        </section>
      </div>
    </main>
  )
}
export default Login;

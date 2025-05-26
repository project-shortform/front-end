import Header from '../components/common/Header.tsx'
import { useState } from 'react'
import StoryBoardCreatorCard from '../components/storyboard/StoryBoardCreatorCard.tsx'
import ProcessBar from '../components/storyboard/ProcessBar.tsx'
import BottomButton from '../components/storyboard/BottomButton.tsx'
import VideoStyleForm from '../components/storyboard/VideoStyleForm.tsx'
import ViewerInfoForm from '../components/storyboard/ViewerInfoForm.tsx'
import AdditionalInfoForm from '../components/storyboard/AdditionalInfoForm.tsx'
import StoryboardPreview from '../components/storyboard/StoryboardPreview.tsx'
import Modal from '../components/common/Modal.tsx'
import { GoogleLogo, KakaoLogo } from '../assets/svgComponents'
import { createStoryBoardType } from '../lib/api.ts'
import { useStoryBoardStore } from '../store/useStoryBoardStore.ts'
import Spinner from '../components/common/Spinner.tsx'

type storyBoardType = 1 | 2 | 3 | 4

const StoryBoard = () => {
  const [step, setStep] = useState<storyBoardType>(1)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const requestInfo = useStoryBoardStore((state) => state.requestInfo)
  const gender = useStoryBoardStore((state) => state.gender)
  const age = useStoryBoardStore((state) => state.age)
  const viewersStyle = useStoryBoardStore((state) => state.viewersStyle)
  const category = useStoryBoardStore((state) => state.category)
  const concept = useStoryBoardStore((state) => state.concept)
  const conceptInputValue = useStoryBoardStore((state) => state.conceptInputValue)
  const quantity = useStoryBoardStore((state) => state.quantity)

  const isLoading = useStoryBoardStore((state) => state.isLoading)

  const setStoryBoardState = useStoryBoardStore((state) => state.setStoryBoardState)

  const renderStoryboardCard = (step: storyBoardType) => {
    switch (step) {
      case 1:
        return (
          <StoryBoardCreatorCard>
            <ProcessBar step={step} />
            <VideoStyleForm />
            <BottomButton step={step} onNext={() => setStep(2)} />
          </StoryBoardCreatorCard>
        )
      case 2:
        return (
          <StoryBoardCreatorCard>
            <ProcessBar step={step} />
            <ViewerInfoForm />
            <BottomButton step={step} onNext={() => setStep(3)} onPrevious={() => setStep(1)} />
          </StoryBoardCreatorCard>
        )
      case 3:
        return (
          <StoryBoardCreatorCard>
            <ProcessBar step={step} />
            <AdditionalInfoForm />
            <BottomButton
              step={step}
              onNext={() => {
                setStep(4)
                setStoryBoardState({ isLoading: true })
                createStoryBoardType({
                  style: {
                    category: category,
                    concept: concept === '기타' ? conceptInputValue : concept,
                    quantity: quantity,
                  },
                  viewers: {
                    sex: gender,
                    age: age,
                    viewers_style: viewersStyle,
                  },
                  info: {
                    request_info: requestInfo,
                  },
                }).then((res) => {
                  if (res) {
                    setStoryBoardState({ isLoading: false })
                    console.log('res', res)
                    setStoryBoardState({ storyList: res.story })
                  }
                })
              }}
              onPrevious={() => setStep(2)}
            />
          </StoryBoardCreatorCard>
        )
      default:
        return (
          <StoryBoardCreatorCard>
            <StoryboardPreview onPrevious={() => setStep(3)} />
          </StoryBoardCreatorCard>
        )
    }
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      {/* 로그인 모달창 open */}
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
      {/* 로딩 Spinner */}
      {isLoading && (
        <Modal onClick={() => setStoryBoardState({ isLoading: false })} className="pt-[100px]" isDeleteIcon={false}>
          <Spinner />
        </Modal>
      )}
      <Header headerType={'DEFAULT'} onClick={() => setIsLoginModalOpen(true)} />
      <div>{renderStoryboardCard(step)}</div>
    </main>
  )
}
export default StoryBoard

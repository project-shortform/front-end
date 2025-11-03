import Header from '../components/common/Header.tsx'
import { useState } from 'react'
import StoryBoardCreatorCard from '../components/storyboard/StoryBoardCreatorCard.tsx'
import ProcessBar from '../components/storyboard/ProcessBar.tsx'
import BottomButton from '../components/storyboard/BottomButton.tsx'
import VideoBasicInfoForm from '../components/storyboard/VideoBasicInfoForm.tsx'
import ReferenceForm from '../components/storyboard/ReferenceForm.tsx'
import StoryboardPreview from '../components/storyboard/StoryboardPreview.tsx'
import Modal from '../components/common/Modal.tsx'
import { useStoryBoardStore } from '../store/useStoryBoardStore.ts'
import Spinner from '../components/common/Spinner.tsx'
import VideoStyleForm from '../components/storyboard/VideoStyleForm.tsx'
import { createStoryBoardType } from '../lib/api.ts'
import type { StoryType } from '../types/common.ts'
import ResultButton from '../components/common/ResultButton.tsx'
import LoginModal from '../components/modal/LoginModal.tsx'

type storyBoardType = 1 | 2 | 3 | 4

const StoryBoard = () => {
  const [step, setStep] = useState<storyBoardType>(1)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const isLoading = useStoryBoardStore((state) => state.isLoading)

  const setStoryBoardState = useStoryBoardStore((state) => state.setStoryBoardState)
  const quantity = useStoryBoardStore((state) => state.quantity)
  const age = useStoryBoardStore((state) => state.age)

  const concept = useStoryBoardStore((state) => state.concept)
  const conceptDetail = useStoryBoardStore((state) => state.conceptDetail)

  const materialType = useStoryBoardStore((state) => state.material_type)
  const content = useStoryBoardStore((state) => state.content)

  const renderStoryboardCard = (step: storyBoardType) => {
    switch (step) {
      case 1:
        return (
          <StoryBoardCreatorCard>
            <ProcessBar step={step} />
            <VideoBasicInfoForm />
            <BottomButton step={step} onNext={() => setStep(2)} />
          </StoryBoardCreatorCard>
        )
      case 2:
        return (
          <StoryBoardCreatorCard>
            <ProcessBar step={step} />
            <VideoStyleForm />
            <BottomButton step={step} onPrevious={() => setStep(1)} onNext={() => setStep(3)} />
          </StoryBoardCreatorCard>
        )
      case 3:
        return (
          <StoryBoardCreatorCard>
            <ProcessBar step={step} />
            <ReferenceForm />
            <BottomButton
              step={step}
              onNext={() => {
                setStep(4)
                setStoryBoardState({ isLoading: true })
                createStoryBoardType({
                  basic_info: {
                    quantity: quantity,
                    age: age,
                  },
                  style_info: {
                    concept: concept,
                    concept_detail: conceptDetail,
                  },
                  material_info: {
                    material_type: materialType,
                    content: content,
                  },
                }).then((res: { story: StoryType[] }) => {
                  console.log('스토리 라인 생성 완료', res)
                  setStoryBoardState({ isLoading: false, storyList: res.story })
                })
              }}
              onPrevious={() => setStep(2)}
            />
          </StoryBoardCreatorCard>
        )
      default:
        return (
          <StoryBoardCreatorCard>
            <StoryboardPreview onPrevious={() => setStep(2)} />
          </StoryBoardCreatorCard>
        )
    }
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      {/* 로그인 모달창 open */}
      {isLoginModalOpen && <LoginModal setIsLoginModalOpen={setIsLoginModalOpen} />}
      {/* 로딩 Spinner */}
      {isLoading && (
        <Modal onClick={() => setStoryBoardState({ isLoading: false })} className="pt-[100px]" isDeleteIcon={false}>
          <Spinner />
        </Modal>
      )}
      <Header headerType={'DEFAULT'} onClick={() => setIsLoginModalOpen(true)} />
      <div>{renderStoryboardCard(step)}</div>
      <ResultButton />
    </main>
  )
}
export default StoryBoard

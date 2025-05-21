import Header from '../components/common/Header.tsx'
import { useState } from 'react'
import StoryBoardCreatorCard from '../components/storyboard/StoryBoardCreatorCard.tsx'
import ProcessBar from '../components/storyboard/ProcessBar.tsx'
import BottomButton from '../components/storyboard/BottomButton.tsx'
import VideoStyleForm from '../components/storyboard/VideoStyleForm.tsx'
import ViewerInfoForm from '../components/storyboard/ViewerInfoForm.tsx'
import AdditionalInfoForm from '../components/storyboard/AdditionalInfoForm.tsx'
import StoryboardPreview from '../components/storyboard/StoryboardPreview.tsx'

type storyBoardType = 1 | 2 | 3 | 4

const StoryBoard = () => {
  const [step, setStep] = useState<storyBoardType>(4)

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
            <BottomButton step={step} onNext={() => setStep(4)} onPrevious={() => setStep(2)} />
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
      <Header headerType={'DEFAULT'} />
      <div>{renderStoryboardCard(step)}</div>
    </main>
  )
}
export default StoryBoard

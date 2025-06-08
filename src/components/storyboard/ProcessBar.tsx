import { CheckIcon } from '../../assets/svgComponents'

interface ProcessBarProps {
  step: number
}

const StepCircle = ({ stepIndex, currentStep, title }: { stepIndex: number; currentStep: number; title: string }) => {
  const isCompleted = currentStep > stepIndex
  const isCurrent = currentStep === stepIndex

  const bgColor = isCompleted || isCurrent ? 'bg-main' : 'bg-gray-5'
  const textColor = isCompleted || isCurrent ? 'text-gray-2' : 'text-gray-4'
  const labelColor = isCompleted || isCurrent ? 'text-main' : 'text-gray-4'

  return (
    <div className="z-10 flex flex-col items-center gap-y-[0.5rem]">
      <div
        className={`flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full ${bgColor} title-sm ${textColor}`}
      >
        {isCompleted ? <CheckIcon width={12} height={7.5} /> : stepIndex}
      </div>
      <div className={`title-sm ${labelColor}`}>{title}</div>
    </div>
  )
}

const Line = ({ isActive, position }: { isActive: boolean; position: 'left' | 'right' }) => {
  const posClass = position === 'left' ? 'left-5' : 'right-6'
  const color = isActive ? 'bg-main' : 'bg-gray-5'

  return <div className={`absolute ${posClass} h-[0.25rem] ${color} mb-8 w-[95%]`} />
}

const ProcessBar = ({ step }: ProcessBarProps) => {
  return (
    <div className="relative flex w-full items-center justify-between">
      <StepCircle stepIndex={1} currentStep={step} title="기본 정보" />
      <Line isActive={step > 1} position="left" />
      <StepCircle stepIndex={2} currentStep={step} title="영상 스타일" />
      <Line isActive={step > 1} position="right" />
      <StepCircle stepIndex={3} currentStep={step} title="레퍼런스" />
    </div>
  )
}

export default ProcessBar

interface BottomButtonProps {
  step: number
  onNext?: () => void
  onPrevious?: () => void
}
const BottomButton = (props: BottomButtonProps) => {
  const { onNext, onPrevious, step } = props
  return (
    <div className="flex w-full justify-end gap-x-[1.5rem]">
      {onPrevious && (
        <button onClick={onPrevious} className="secondary-active-button h-[3.5rem] w-[12.5rem]">
          이전
        </button>
      )}
      {onNext && (
        <button onClick={onNext} className="active-button h-[3.5rem] w-[12.5rem]">
          {step === 3 ? '완료' : '다음'}
        </button>
      )}
    </div>
  )
}
export default BottomButton

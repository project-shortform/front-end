import { useStoryBoardStore } from '../../store/useStoryBoardStore.ts'

const AdditionalInfoForm = () => {
  const requestInfo = useStoryBoardStore((state) => state.requestInfo)
  const setStoryBoardState = useStoryBoardStore((state) => state.setStoryBoardState)

  return (
    <div className="flex flex-col xl:gap-y-[2.5rem] 2xl:gap-y-[20px]">
      <h2 className="title-lg">상세정보</h2>

      <section className="flex flex-col xl:gap-y-[3.75rem] 2xl:gap-y-[30px]">
        <section className="flex flex-col gap-y-3">
          <h3 className="subtitle-lg">
            영상에 대한 추가 요구사항<span className="subtitle-md text-gray-3">(선택)</span>
          </h3>
          <textarea
            value={requestInfo}
            onChange={(e) => setStoryBoardState({ requestInfo: e.target.value })}
            placeholder={
              '영상에 추가되었으면 하는 구체적 요구사항을 작성해주세요\n' + 'ex) 어린아이도 볼 수 있게 쉽게 작성해줘.'
            }
            className="default-input h-[7.5rem]"
          ></textarea>
        </section>
      </section>
    </div>
  )
}
export default AdditionalInfoForm

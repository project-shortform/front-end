import { useStoryBoardStore } from '../../store/useStoryBoardStore.ts'
import { RedCircleCheckIcon, UnCheckIcon } from '../../assets/svgComponents'

const ReferenceForm = () => {
  const content = useStoryBoardStore((state) => state.content)
  const setStoryBoardState = useStoryBoardStore((state) => state.setStoryBoardState)
  const materialType = useStoryBoardStore((state) => state.material_type)

  return (
    <div className="flex flex-col xl:gap-y-[2.5rem] 2xl:gap-y-[20px]">
      <h2 className="title-lg">영상으로 만들 자료</h2>

      <section className="flex flex-col xl:gap-y-[3.75rem] 2xl:gap-y-[30px]">
        <section className="flex flex-col gap-y-3">
          <section className="mt-3 flex gap-x-[20px]">
            <button
              onClick={() => {
                setStoryBoardState({ material_type: 'txt' })
              }}
              className="flex gap-x-1"
            >
              {materialType === 'txt' ? (
                <RedCircleCheckIcon width={24} height={24} />
              ) : (
                <UnCheckIcon width={24} height={24} />
              )}
              txt
            </button>
          </section>

          <textarea
            value={content}
            onChange={(e) => setStoryBoardState({ content: e.target.value })}
            placeholder={'요약하고 싶은 글을 입력해주세요.'}
            className="default-input h-[7.5rem]"
          />
        </section>
      </section>
    </div>
  )
}
export default ReferenceForm

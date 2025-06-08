import { UnCheckIcon } from '../../../assets/svgComponents'
import { useStoryBoardStore } from '../../../store/useStoryBoardStore.ts'

const Setting = () => {
  const storyList = useStoryBoardStore((state) => state.storyList)
  const setStoryBoardState = useStoryBoardStore((state) => state.setStoryBoardState)
  const selectedScene = useStoryBoardStore((state) => state.selectedScene)

  return (
    <div className="flex h-[875px] flex-col justify-between">
      <div className="flex flex-col gap-y-[28px]">
        <section>
          <h2 className="title-lg">스토리보드 설정 및 수정</h2>
          <p className="body-md mt-3">스토리보드의 장면 설명과 음성 및 자막을 수정할 수 있어요.</p>
        </section>

        <section>
          <h3>장면 설명</h3>
          <textarea
            onChange={(e) => {
              const updatedList = storyList.map((item) =>
                item.scene === selectedScene ? { ...item, script: e.target.value } : item
              )
              setStoryBoardState({ storyList: updatedList })
            }}
            value={storyList.find((item) => item.scene === selectedScene)?.script_ko || ''}
            className="default-input mt-3 h-[80px] w-full"
          />
        </section>

        <section>
          <h3>음성 및 자막</h3>
          <section className="mt-3 flex gap-x-[20px]">
            <button className="flex gap-x-1">
              <UnCheckIcon width={24} height={24} />
              음성만
            </button>
            <button className="flex gap-x-1">
              <UnCheckIcon width={24} height={24} />
              자막만
            </button>
            <button className="flex gap-x-1">
              <UnCheckIcon width={24} height={24} />
              음성과 자막 둘다
            </button>
          </section>
          <textarea className="default-input mt-2 h-[120px] w-full" />
        </section>
      </div>
      <button onClick={() => {}} className="secondary-active-button h-[56px] w-full">
        저장하기
      </button>
    </div>
  )
}
export default Setting

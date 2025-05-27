import { AshbnIcon, CopyIcon, PlusIcon } from '../../assets/svgComponents'
import { useNavigate } from 'react-router-dom'
import { useStoryBoardStore } from '../../store/useStoryBoardStore.ts'
import { createVideo } from '../../lib/api.ts'

const MainDashBoard = () => {
  const navigate = useNavigate()

  const selectedVideoUrl = useStoryBoardStore((state) => state.selectedVideoUrl)
  const selectedScene = useStoryBoardStore((state) => state.selectedScene)
  const storyList = useStoryBoardStore((state) => state.storyList)

  const newSearchVideoList = useStoryBoardStore((state) => state.newSearchVideoList)
  const setStoryBoardState = useStoryBoardStore((state) => state.setStoryBoardState)

  return (
    <div className="flex h-[56.25rem] w-2/3 flex-col items-center justify-between px-[40px] py-[24px]">
      <section className="bg-color border-gray-6 flex w-full gap-x-5 overflow-x-scroll rounded-[1.25rem] border p-6">
        {newSearchVideoList.map((newSearchVideo) => {
          return (
            <div
              onClick={() => {
                setStoryBoardState({ selectedScene: newSearchVideo.scene })
              }}
              className="bg-gray-5 h-[106px] w-[11.75rem] rounded-[8px]"
            >
              # {newSearchVideo.scene}
            </div>
          )
        })}
        <button className="ghost-active-button h-[106px] w-[11.75rem]">
          <PlusIcon width={24} height={24} />
        </button>
      </section>
      {selectedVideoUrl ? (
        <video controls src={selectedVideoUrl} className="bg-gray-5 mt-[32px] h-[50%] w-[80%]" />
      ) : (
        <div className="bg-gray-5 mt-[32px] h-[50%] w-[80%]"></div>
      )}
      <section className="w-full">
        <div className="flex justify-between">
          <h2 className="title-md">#2</h2>
          <div className="flex gap-x-3">
            <CopyIcon width={24} height={24} />
            <AshbnIcon width={18} height={18} />
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="flex w-full flex-col gap-y-3">
            <h3 className="subtitle-lg">장면 설명</h3>
            <div className="default-input h-[7.5rem] w-full">{storyList[selectedScene].script}</div>
          </div>
          <div className="flex w-full flex-col gap-y-3">
            <h3 className="subtitle-lg">음성 및 자막</h3>
            <div className="default-input h-[7.5rem] w-full">{storyList[selectedScene].subtitle}</div>
          </div>
        </div>
      </section>
      <div className="mt-7 flex w-full justify-end">
        <button
          onClick={() => {
            setStoryBoardState({ isLoading: true })
            createVideo(storyList).then((res) => {
              setStoryBoardState({ isLoading: false })
              console.log('동영상 생성 결과', res)
              navigate('/create-movie')
            })
          }}
          className="active-button h-[56px] w-[392px]"
        >
          영상 생성하기
        </button>
      </div>
    </div>
  )
}
export default MainDashBoard

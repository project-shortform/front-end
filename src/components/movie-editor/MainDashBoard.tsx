import { AshbnIcon, CopyIcon } from '../../assets/svgComponents'
import { useStoryBoardStore } from '../../store/useStoryBoardStore.ts'
import { createVideo } from '../../lib/api.ts'
import type { CreateAsyncMovieResultType } from '../../types/common.ts'

const MainDashBoard = () => {
  const selectedVideoUrl = useStoryBoardStore((state) => state.selectedVideoUrl)
  const selectedScene = useStoryBoardStore((state) => state.selectedScene)
  const storyList = useStoryBoardStore((state) => state.storyList)
  const searchVideoList = useStoryBoardStore((state) => state.searchVideoList)

  const setStoryBoardState = useStoryBoardStore((state) => state.setStoryBoardState)

  return (
    <div className="flex h-[56.25rem] w-2/3 flex-col items-center justify-between px-[40px] py-[24px]">
      <section className="bg-color border-gray-6 flex w-full gap-x-5 overflow-x-scroll rounded-[1.25rem] border p-6">
        {searchVideoList.map((searchVideo) => {
          return (
            <div
              onClick={() => {
                setStoryBoardState({ selectedScene: searchVideo.scene })
              }}
              className="bg-gray-5 rounded-[8px] px-4 py-3"
            >
              # {searchVideo.scene}
            </div>
          )
        })}
      </section>
      {selectedVideoUrl ? (
        <video
          controls
          src={`https://obear6y9p82u.share.zrok.io/uploads/${selectedVideoUrl}`}
          className="bg-gray-5 mt-[32px] h-[50%] w-[80%]"
        />
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
            <div className="default-input h-[7.5rem] w-full">{storyList[selectedScene - 1].script_ko}</div>
          </div>
          <div className="flex w-full flex-col gap-y-3">
            <h3 className="subtitle-lg">음성 및 자막</h3>
            <div className="default-input h-[7.5rem] w-full">{storyList[selectedScene - 1].subtitle}</div>
          </div>
        </div>
      </section>
      <div className="mt-7 flex w-full justify-end">
        <button
          onClick={async () => {
            console.log('storyList', storyList)
            if (storyList.length === 0) return

            setStoryBoardState({ isLoading: true })

            // ✅ 스토리 리스트 변환
            const transformedList = storyList.map((story) => ({
              scene: story.scene,
              script: story.script_eng, // 영어 스크립트를 script에 넣음
              subtitle: story.subtitle,
            }))

            try {
              const results: CreateAsyncMovieResultType = await createVideo(transformedList) // 변환된 리스트 사용
              console.log('결과:', results)
              if (results) {
                setStoryBoardState({ isLoading: true, activeAsyncVideo: true, processingTaskId: results.task_id })
                setStoryBoardState({ activeAsyncVideo: true })
                setStoryBoardState({ processingTaskId: results.task_id })
              }
            } catch (err) {
              console.error('검색 실패:', err)
            }
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

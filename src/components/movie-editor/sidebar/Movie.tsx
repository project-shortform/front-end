import { RedCircleCheckIcon, UnCheckIcon } from '../../../assets/svgComponents'
import { useStoryBoardStore } from '../../../store/useStoryBoardStore.ts'

const Movie = () => {
  const searchVideoList = useStoryBoardStore((state) => state.searchVideoList)
  const setStoryBoardState = useStoryBoardStore((state) => state.setStoryBoardState)
  const selectedScene = useStoryBoardStore((state) => state.selectedScene)
  const selectedVideoUrl = useStoryBoardStore((state) => state.selectedVideoUrl)
  const resultVideoUrl = useStoryBoardStore((state) => state.resultVideoUrl)

  if (resultVideoUrl) return

  return (
    <div>
      <h1 className="title-md">추천</h1>
      <div className="bg-gray-5 relative mt-3 w-full rounded-[8px]">
        <RedCircleCheckIcon width={24} height={24} className="absolute top-2 right-2 z-10 cursor-pointer" />
        <img
          alt={'썸네일'}
          src={`https://clips.ngrok.app${searchVideoList[selectedScene - 1].result[0].metadata.thumbnail}`}
          width="100%"
          height="100%"
          className="bg-gray-5 rounded-[8px]"
        />
      </div>

      <h1 className="title-md mt-[40px]">관련</h1>
      <section className="custom-scroll mt-3 grid h-[500px] grid-cols-2 gap-4 overflow-y-scroll">
        {searchVideoList &&
          searchVideoList.length > 0 &&
          searchVideoList[selectedScene - 1].result.map((video, index) => {
            return (
              <div key={index} className="bg-gray-5 relative h-[103px] w-[100%] rounded-[8px]">
                {selectedVideoUrl === video.metadata.file_name ? (
                  <RedCircleCheckIcon
                    onClick={() => {
                      setStoryBoardState({ selectedVideoUrl: video.metadata.file_name })
                    }}
                    width={24}
                    height={24}
                    className="absolute top-2 right-2 z-10 cursor-pointer"
                  />
                ) : (
                  <UnCheckIcon
                    onClick={() => {
                      setStoryBoardState({ selectedVideoUrl: video.metadata.file_name })
                    }}
                    width={24}
                    height={24}
                    className="absolute top-2 right-2 z-10 cursor-pointer"
                  />
                )}
                <img
                  alt={'썸네일'}
                  width="100%"
                  height="100%"
                  src={`https://clips.ngrok.app${video.metadata.thumbnail}`}
                  className="w-full rounded"
                />
              </div>
            )
          })}
      </section>
    </div>
  )
}
export default Movie

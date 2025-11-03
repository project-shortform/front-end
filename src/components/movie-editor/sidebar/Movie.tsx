import { RedCircleCheckIcon, UnCheckIcon } from '../../../assets/svgComponents'
import { useStoryBoardStore } from '../../../store/useStoryBoardStore.ts'
import type { SelectedVideoType } from '../../../types/common.ts'

const BASE_URL = import.meta.env.VITE_API_URL

const Movie = () => {
  const searchVideoList = useStoryBoardStore((state) => state.searchVideoList)
  const setStoryBoardState = useStoryBoardStore((state) => state.setStoryBoardState)
  const selectedScene = useStoryBoardStore((state) => state.selectedScene)
  const selectedVideoUrl = useStoryBoardStore((state) => state.selectedVideoFileName)
  const selectedVideoList = useStoryBoardStore((state) => state.selectedVideoList)

  const storyList = useStoryBoardStore((state) => state.storyList)

  const resultVideoUrl = useStoryBoardStore((state) => state.resultVideoUrl)

  if (resultVideoUrl) return

  if (!selectedVideoList || !selectedScene) return

  return (
    <div>
      <h1 className="title-md">추천</h1>
      <div className="bg-gray-5 relative mt-3 w-full rounded-[8px]">
        <RedCircleCheckIcon width={24} height={24} className="absolute top-2 right-2 z-10 cursor-pointer" />
        <img
          alt={'썸네일'}
          src={`${BASE_URL}${selectedVideoList[selectedScene - 1]?.thumbnail}`}
          width="100%"
          height="100%"
          className="bg-gray-5 rounded-[8px]"
        />
      </div>

      <h1 className="title-md mt-[40px]">관련</h1>
      <section className="custom-scroll mt-3 grid h-[500px] grid-cols-2 gap-4 overflow-y-scroll">
        {searchVideoList &&
          selectedScene &&
          searchVideoList.length > 0 &&
          searchVideoList[selectedScene - 1].result.map((video, index) => {
            const isSelected = selectedVideoUrl === video.metadata.file_name

            const handleVideoSelect = () => {
              const currentScene = selectedScene

              // 1. storyList에서 현재 scene의 subtitle 찾기
              const matchedStory = storyList?.find((story) => story.scene === currentScene)
              const subtitle = matchedStory?.subtitle || ''
              const script = matchedStory?.script_ko || ''

              // 2. 새로운 비디오 아이템 생성
              const newVideoItem: SelectedVideoType = {
                scene: currentScene,
                video_file_name: video.metadata.file_name,
                subtitle: subtitle,
                script: script,
                thumbnail: video.metadata.thumbnail,
              }

              // 3. selectedVideoList에서 현재 scene과 일치하는 항목 찾기
              const existingIndex = selectedVideoList?.findIndex((item) => item.scene === currentScene)

              let updatedVideoList: SelectedVideoType[]

              if (existingIndex !== -1) {
                // 기존 항목이 있으면 업데이트
                updatedVideoList = [...selectedVideoList]
                updatedVideoList[existingIndex] = newVideoItem
              } else {
                // 없으면 새로 추가
                updatedVideoList = [...selectedVideoList, newVideoItem]
              }

              // 4. Zustand store 업데이트
              setStoryBoardState({
                selectedVideoFileName: video.metadata.file_name,
                selectedVideoThumbnail: video.metadata.thumbnail,
                selectedVideoList: updatedVideoList,
              })
            }

            return (
              <div key={index} onClick={handleVideoSelect} className="relative">
                {isSelected ? (
                  <RedCircleCheckIcon width={24} height={24} className="absolute top-2 right-2 z-10 cursor-pointer" />
                ) : (
                  <UnCheckIcon width={24} height={24} className="absolute top-2 right-2 z-10 cursor-pointer" />
                )}
                <img
                  alt="썸네일"
                  width="100%"
                  height="100%"
                  src={`${BASE_URL}${video.metadata.thumbnail}`}
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

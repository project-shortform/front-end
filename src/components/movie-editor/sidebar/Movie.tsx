import { RedCircleCheckIcon, UnCheckIcon } from '../../../assets/svgComponents'
import { useStoryBoardStore } from '../../../store/useStoryBoardStore.ts'
import { useEffect } from 'react'

const Movie = () => {
  const searchVideoList = useStoryBoardStore((state) => state.searchVideoList)
  const setStoryBoardState = useStoryBoardStore((state) => state.setStoryBoardState)
  const selectedScene = useStoryBoardStore((state) => state.selectedScene)
  const selectedVideoUrl = useStoryBoardStore((state) => state.selectedVideoUrl)

  useEffect(() => {
    console.log('searchVideoList', searchVideoList)
    console.log('thumbnail', `https://obear6y9p82u.share.zrok.io${searchVideoList[0].result[0].metadata.thumbnail}`)
  }, [])

  return (
    <div>
      <h1 className="title-md">추천</h1>
      {/*<video src={videoUrl} width="100%" height="100%" controls className="bg-gray-5" />*/}
      <div className="bg-gray-5 relative mt-3 h-[180px] w-full rounded-[8px]">
        <RedCircleCheckIcon width={24} height={24} className="absolute top-2 right-2 z-10 cursor-pointer" />
        <img
          alt={'썸네일'}
          src={`https://obear6y9p82u.share.zrok.io${searchVideoList[0].result[0].metadata.thumbnail}`}
          width="100%"
          height="100%"
          className="bg-gray-5 rounded-[8px]"
        />
      </div>

      <h1 className="title-md mt-[40px]">관련</h1>
      <section className="custom-scroll mt-3 grid h-[500px] grid-cols-2 gap-4 overflow-y-scroll">
        {searchVideoList &&
          searchVideoList.length > 0 &&
          searchVideoList[selectedScene].result.map((video, index) => {
            return (
              <div key={index} className="bg-gray-5 relative h-[103px] w-[100%] rounded-[8px]">
                {selectedVideoUrl === video.file_name ? (
                  <RedCircleCheckIcon
                    onClick={() => {
                      setStoryBoardState({ selectedVideoUrl: video.file_name })
                    }}
                    width={24}
                    height={24}
                    className="absolute top-2 right-2 z-10 cursor-pointer"
                  />
                ) : (
                  <UnCheckIcon
                    onClick={() => {
                      setStoryBoardState({ selectedVideoUrl: video.file_name })
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
                  src={`https://obear6y9p82u.share.zrok.io${video.file_name}`}
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

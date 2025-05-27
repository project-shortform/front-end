import { RedCircleCheckIcon, UnCheckIcon } from '../../../assets/svgComponents'
import { useStoryBoardStore } from '../../../store/useStoryBoardStore.ts'
import { useEffect } from 'react'

const Movie = () => {
  const searchVideoList = useStoryBoardStore((state) => state.searchVideoList)
  const newSearchVideoList = useStoryBoardStore((state) => state.newSearchVideoList)
  const setStoryBoardState = useStoryBoardStore((state) => state.setStoryBoardState)
  const selectedScene = useStoryBoardStore((state) => state.selectedScene)
  const selectedVideoUrl = useStoryBoardStore((state) => state.selectedVideoUrl)

  useEffect(() => {
    const fetchVideos = async () => {
      setStoryBoardState({ isLoading: true })
      const results = await Promise.all(
        searchVideoList.map(async (item) => {
          const enrichedResults = await Promise.all(
            item.result.map(async (r) => {
              const url = `https://hzit42bv0qlx.share.zrok.io/uploads/${r.file_name}`
              const res = await fetch(url, {
                headers: {
                  skip_zrok_interstitial: 'sdf',
                },
              })
              const blob = await res.blob()
              const blobUrl = URL.createObjectURL(blob)

              return {
                ...r,
                blobUrl, // result 내 각 항목에 blobUrl 추가
              }
            })
          )

          return {
            scene: item.scene,
            result: enrichedResults,
          }
        })
      )

      setStoryBoardState({ newSearchVideoList: results })
      if (results && results.length > 0) {
        setStoryBoardState({ selectedVideoUrl: results[0].result[0].blobUrl })
        setStoryBoardState({ selectedEngScript: results[0].result[0].metadata.infomation })
      }
    }

    fetchVideos().then(() => {
      setStoryBoardState({ isLoading: false })
    })
  }, [searchVideoList])

  return (
    <div>
      <h1 className="title-md">추천</h1>
      {/*<video src={videoUrl} width="100%" height="100%" controls className="bg-gray-5" />*/}
      {newSearchVideoList && newSearchVideoList.length > 0 && newSearchVideoList[0].result.length > 0 ? (
        <div className="bg-gray-5 relative mt-3 h-[180px] w-full rounded-[8px]">
          {selectedVideoUrl === newSearchVideoList[selectedScene].result[0].blobUrl ? (
            <RedCircleCheckIcon
              onClick={() => {
                setStoryBoardState({ selectedVideoUrl: newSearchVideoList[selectedScene].result[0].blobUrl })
              }}
              width={24}
              height={24}
              className="absolute top-2 right-2 z-10 cursor-pointer"
            />
          ) : (
            <UnCheckIcon
              onClick={() => {
                setStoryBoardState({ selectedVideoUrl: newSearchVideoList[selectedScene].result[0].blobUrl })
              }}
              width={24}
              height={24}
              className="absolute top-2 right-2 z-10 cursor-pointer"
            />
          )}
          <video
            controls
            src={newSearchVideoList[selectedScene].result[0].blobUrl}
            width="100%"
            height="100%"
            className="bg-gray-5"
          />
        </div>
      ) : null}

      <h1 className="title-md mt-[40px]">관련</h1>
      <section className="custom-scroll mt-3 grid h-[500px] grid-cols-2 gap-4 overflow-y-scroll">
        {newSearchVideoList &&
          newSearchVideoList.length > 0 &&
          newSearchVideoList[selectedScene].result.map((video, index) => {
            return (
              <div key={index} className="bg-gray-5 relative h-[103px] w-[100%] rounded-[8px]">
                {selectedVideoUrl === video.blobUrl ? (
                  <RedCircleCheckIcon
                    onClick={() => {
                      setStoryBoardState({ selectedVideoUrl: video.blobUrl })
                    }}
                    width={24}
                    height={24}
                    className="absolute top-2 right-2 z-10 cursor-pointer"
                  />
                ) : (
                  <UnCheckIcon
                    onClick={() => {
                      setStoryBoardState({ selectedVideoUrl: video.blobUrl })
                    }}
                    width={24}
                    height={24}
                    className="absolute top-2 right-2 z-10 cursor-pointer"
                  />
                )}
                <video src={video.blobUrl} controls className="w-full rounded" />
              </div>
            )
          })}
      </section>
    </div>
  )
}
export default Movie

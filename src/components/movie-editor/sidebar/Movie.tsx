import { RedCircleCheckIcon, UnCheckIcon } from '../../../assets/svgComponents'
import { useStoryBoardStore } from '../../../store/useStoryBoardStore.ts'
import { useState } from 'react'

const baseUrl = 'http://49.143.34.88:5000'

const Movie = () => {
  const searchVideoList = useStoryBoardStore((state) => state.searchVideoList)
  const [isClicked, setIsClicked] = useState(false)
  return (
    <div>
      <h1 className="title-md">추천</h1>

      {searchVideoList && searchVideoList.length > 0 && searchVideoList[0].result.length > 0 ? (
        <video
          src={`${baseUrl}/${searchVideoList[0].result[0].file_name}`}
          width="100%"
          height="100%"
          className="bg-gray-5"
        />
      ) : (
        <div className="bg-gray-5 relative mt-3 rounded-[8px]">
          {isClicked ? (
            <RedCircleCheckIcon
              onClick={() => {
                setIsClicked(!isClicked)
              }}
              width={24}
              height={24}
              className="absolute top-2 right-2"
            />
          ) : (
            <UnCheckIcon
              onClick={() => {
                setIsClicked(!isClicked)
              }}
              width={24}
              height={24}
              className="absolute top-2 right-2 rounded-[8px]"
            />
          )}

          <video
            src={'http://49.143.34.88:5000/output/final_edit_21.mp4'}
            width="100%"
            height="100%"
            controls
            className="pointer-events-none"
          />
        </div>
      )}

      <h1 className="title-md mt-[40px]">관련</h1>
      <section className="custom-scroll mt-3 grid h-[500px] grid-cols-2 gap-4 overflow-y-scroll">
        <div className="bg-gray-5 relative h-[103px] w-[100%] rounded-[8px]">
          <UnCheckIcon width={24} height={24} className="absolute top-2 right-2" />
        </div>
        <div className="bg-gray-5 relative h-[103px] w-[100%] rounded-[8px]">
          <UnCheckIcon width={24} height={24} className="absolute top-2 right-2" />
        </div>
        <div className="bg-gray-5 relative h-[103px] w-[100%] rounded-[8px]">
          <UnCheckIcon width={24} height={24} className="absolute top-2 right-2" />
        </div>
        <div className="bg-gray-5 relative h-[103px] w-[100%] rounded-[8px]">
          <UnCheckIcon width={24} height={24} className="absolute top-2 right-2" />
        </div>
        <div className="bg-gray-5 relative h-[103px] w-[100%] rounded-[8px]">
          <UnCheckIcon width={24} height={24} className="absolute top-2 right-2" />
        </div>
        <div className="bg-gray-5 relative h-[103px] w-[100%] rounded-[8px]">
          <UnCheckIcon width={24} height={24} className="absolute top-2 right-2" />
        </div>
        <div className="bg-gray-5 relative h-[103px] w-[100%] rounded-[8px]">
          <UnCheckIcon width={24} height={24} className="absolute top-2 right-2" />
        </div>
        <div className="bg-gray-5 relative h-[103px] w-[100%] rounded-[8px]">
          <UnCheckIcon width={24} height={24} className="absolute top-2 right-2" />
        </div>
        <div className="bg-gray-5 relative h-[103px] w-[100%] rounded-[8px]">
          <UnCheckIcon width={24} height={24} className="absolute top-2 right-2" />
        </div>
        <div className="bg-gray-5 relative h-[103px] w-[100%] rounded-[8px]">
          <UnCheckIcon width={24} height={24} className="absolute top-2 right-2" />
        </div>
        <div className="bg-gray-5 relative h-[103px] w-[100%] rounded-[8px]">
          <UnCheckIcon width={24} height={24} className="absolute top-2 right-2" />
        </div>
      </section>
    </div>
  )
}
export default Movie

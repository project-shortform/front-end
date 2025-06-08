import { useStoryBoardStore } from '../../store/useStoryBoardStore.ts'

const VideoBasicInfoForm = () => {
  const storyQuantityContents = ['15초', '30초', '1분', '3분', '5분']

  const ageContents = ['영유아', '10대', '20대', '20-30대', '40-50대', '60대', '노인']
  const age = useStoryBoardStore((state) => state.age)

  const quantity = useStoryBoardStore((state) => state.quantity)

  const setStoryBoardState = useStoryBoardStore((state) => state.setStoryBoardState)

  return (
    <div className="">
      <h2 className="title-lg mb-[80px]">영상 기본 정보</h2>
      <div className="flex flex-col xl:gap-y-[2.5rem] 2xl:gap-y-[20px]">
        <section className="flex flex-col xl:gap-y-[3.75rem] 2xl:gap-y-[30px]">
          <section className="flex flex-col gap-y-3">
            <h3 className="subtitle-lg">연령대</h3>
            <div className="flex gap-x-3">
              {ageContents.map((content) => {
                return (
                  <button
                    onClick={() => setStoryBoardState({ age: content })}
                    key={content}
                    className={
                      content === age
                        ? 'secondary-active-button w-[8.625rem] p-3'
                        : 'secondary-default-button w-[8.625rem] p-3'
                    }
                  >
                    {content}
                  </button>
                )
              })}
            </div>
          </section>

          <section className="flex flex-col gap-y-3">
            <h3 className="subtitle-lg">분량</h3>
            <div className="flex gap-x-3">
              {storyQuantityContents.map((content) => {
                return (
                  <button
                    onClick={() => {
                      setStoryBoardState({ quantity: quantity === content ? '' : content })
                    }}
                    key={content}
                    className={
                      content === quantity
                        ? 'secondary-active-button w-[8.625rem] p-3'
                        : 'secondary-default-button w-[8.625rem] p-3'
                    }
                  >
                    {content}
                  </button>
                )
              })}
            </div>
          </section>
        </section>
      </div>
    </div>
  )
}
export default VideoBasicInfoForm

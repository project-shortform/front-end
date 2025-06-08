import { useStoryBoardStore } from '../../store/useStoryBoardStore.ts'

const VideoStyleForm = () => {
  const storyConceptContents = [
    '유머러스한',
    '감성적인',
    '신뢰감 있는',
    '동기부여가 되는',
    '임팩트있는',
    '어두운',
    '기타',
  ]

  const setStoryBoardState = useStoryBoardStore((state) => state.setStoryBoardState)
  const concept = useStoryBoardStore((state) => state.concept)
  const conceptInputValue = useStoryBoardStore((state) => state.conceptInputValue)
  const conceptDetail = useStoryBoardStore((state) => state.conceptDetail)

  return (
    <div className="">
      <h2 className="title-lg mb-[80px]">영상 스타일</h2>
      <div className="flex flex-col xl:gap-y-[2.5rem] 2xl:gap-y-[20px]">
        <section className="flex flex-col xl:gap-y-[3.75rem] 2xl:gap-y-[30px]">
          <section className="flex flex-col gap-y-3">
            <h3 className="subtitle-lg">영상 컨셉</h3>
            <div className="flex gap-x-3">
              {storyConceptContents.map((content) => {
                return (
                  <button
                    onClick={() => {
                      setStoryBoardState({ concept: concept === content ? '' : content })
                    }}
                    key={content}
                    className={
                      content === concept
                        ? 'secondary-active-button w-[8.625rem] p-3'
                        : 'secondary-default-button w-[8.625rem] p-3'
                    }
                  >
                    {content}
                  </button>
                )
              })}
            </div>
            {concept === '기타' && (
              <input
                value={conceptInputValue}
                onChange={(e) => {
                  setStoryBoardState({ conceptInputValue: e.target.value })
                }}
                placeholder="스토리 컨셉을 작성해주세요."
                className="default-input focus:outline-gray-4 placeholder:text-gray-4 focus:outline-1"
              />
            )}
          </section>

          <section className="flex flex-col gap-y-3">
            <h3 className="subtitle-lg">구체적인 컨셉 요구사항</h3>
            <input
              value={conceptDetail}
              onChange={(e) => {
                setStoryBoardState({ conceptDetail: e.target.value })
              }}
              placeholder="ex) 어린 아이도 쉽게 이해할 수 있도록 설명해줘"
              className="default-input focus:outline-gray-4 placeholder:text-gray-4 focus:outline-1"
            />
          </section>
        </section>
      </div>
    </div>
  )
}
export default VideoStyleForm

import { useState } from 'react'
import DropDownBox from '../common/DropDown.tsx'
import { useStoryBoardStore } from '../../store/useStoryBoardStore.ts'

const VideoStyleForm = () => {
  const storyCategoryContents = [
    '광고 & 홍보',
    '정보전달',
    '교육',
    '동기부여 & 자기계발',
    '스토리텔링 & 픽션',
    '직접선택',
  ]

  const storyConceptContents = [
    '유머러스한',
    '감성적인',
    '신뢰감 있는',
    '동기부여가 되는',
    '임팩트있는',
    '어두운',
    '기타',
  ]

  const storyQuantityContents = ['15초', '30초', '1분', '3분', '5분']

  const [isClickedFilter, setIsClickedFilter] = useState(false)

  const category = useStoryBoardStore((state) => state.category)
  const concept = useStoryBoardStore((state) => state.concept)
  const conceptInputValue = useStoryBoardStore((state) => state.conceptInputValue)
  const quantity = useStoryBoardStore((state) => state.quantity)

  const setStoryBoardState = useStoryBoardStore((state) => state.setStoryBoardState)

  return (
    <div className="flex flex-col xl:gap-y-[2.5rem] 2xl:gap-y-[20px]">
      <h2 className="title-lg">영상 스타일</h2>

      <section className="flex flex-col xl:gap-y-[3.75rem] 2xl:gap-y-[30px]">
        <section className="flex flex-col gap-y-3">
          <h3 className="subtitle-lg">카테고리</h3>
        </section>
        <DropDownBox>
          <DropDownBox.DropDownContent
            onDropDownClick={() => setIsClickedFilter(!isClickedFilter)}
            selectedContent={category}
            placeholder={'카테고리를 선택'}
          />
          <DropDownBox.DropDownFilter
            setIsClickedFilter={setIsClickedFilter}
            isClickedFilter={isClickedFilter}
            setStoryBoardState={setStoryBoardState}
            data={storyCategoryContents}
          />
        </DropDownBox>

        <section className="flex flex-col gap-y-3">
          <h3 className="subtitle-lg">스토리 컨셉</h3>
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
  )
}
export default VideoStyleForm

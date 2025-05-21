import { ArrowDownIcon } from '../../assets/svgComponents'

const VideoStyleForm = () => {
  const storyConceptContents = ['유머러스한', '감성적인', '신뢰감 있는', '동기부여가 되는', '임팩트있는', '어두운']
  const storyQuantityContents = ['15초', '30초', '1분', '3분', '5분']

  return (
    <div className="flex flex-col gap-y-[2.5rem]">
      <h2 className="title-lg">영상 스타일</h2>

      <section className="flex flex-col gap-y-[3.75rem]">
        <section className="flex flex-col gap-y-3">
          <h3 className="subtitle-lg">카테고리</h3>
          <div className="default-input w-[30.375rem]">
            카테고리 선택 <ArrowDownIcon width={24} height={24} />
          </div>
        </section>

        <section className="flex flex-col gap-y-3">
          <h3 className="subtitle-lg">스토리 컨셉</h3>
          <div className="flex gap-x-3">
            {storyConceptContents.map((content) => {
              return (
                <button key={content} className="secondary-default-button w-[8.625rem] p-3">
                  {content}
                </button>
              )
            })}
          </div>
          <input
            placeholder="스토리 컨셉을 작성해주세요."
            className="default-input focus:outline-gray-4 placeholder:text-gray-4 focus:outline-1"
          ></input>
        </section>

        <section className="flex flex-col gap-y-3">
          <h3 className="subtitle-lg">분량</h3>
          <div className="flex gap-x-3">
            {storyQuantityContents.map((content) => {
              return (
                <button key={content} className="secondary-default-button w-[6.25rem] p-3">
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

const ViewerInfoForm = () => {
  const genderContents = ['여자', '남자', '선택 안함']
  const ageContents = ['영유아', '10대', '20대', '20-30대', '40-50대', '60대', '노인']

  return (
    <div className="flex flex-col gap-y-[2.5rem] 2xl:gap-y-[20px]">
      <h2 className="title-lg">시청자 정보</h2>

      <section className="flex flex-col gap-y-[3.75rem] 2xl:gap-y-[30px]">
        <section className="flex flex-col gap-y-3">
          <h3 className="subtitle-lg">성별</h3>
          <div className="flex gap-x-3">
            {genderContents.map((content) => {
              return (
                <button key={content} className="secondary-default-button w-[7.938rem] p-3">
                  {content}
                </button>
              )
            })}
          </div>
        </section>

        <section className="flex flex-col gap-y-3">
          <h3 className="subtitle-lg">연령대</h3>
          <div className="flex gap-x-3">
            {ageContents.map((content) => {
              return (
                <button key={content} className="secondary-default-button w-[6.25rem] p-3">
                  {content}
                </button>
              )
            })}
          </div>
        </section>

        <section className="flex flex-col gap-y-3">
          <h3 className="subtitle-lg">분량</h3>
          <input
            placeholder="ex) 유머를 좋아하는, 지식을 중요하게 생각하는 등 원하는 대로 작성해 보세요."
            className="default-input focus:outline-gray-4 placeholder:text-gray-4 focus:outline-1"
          ></input>
        </section>
      </section>
    </div>
  )
}
export default ViewerInfoForm

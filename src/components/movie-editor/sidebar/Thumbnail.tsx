import { CloudUploadIcon } from '../../../assets/svgComponents'

const Thumbnail = () => {
  return (
    <div className="flex h-[875px] flex-col justify-between">
      <section>
        <h2 className="title-md">장면 중 선택</h2>
        <p className="body-md mt-3">
          썸네일로 쓰고 싶은 장면(Scene)의 우측 상단 별표를 클릭하시면 해당 장면이 썸네일로 등록해요.
        </p>
      </section>
      <section className="flex flex-col gap-y-3">
        <h2 className="title-md">직접 업로드</h2>
        <p className="body-md">직접 업로드 시, 장면 중 선택은 적용되지 않아요.</p>
        <div className="flex w-full flex-col items-center justify-center">
          <div className="gap-y-3">
            <CloudUploadIcon width={160} height={160} />
            <p>파일을 업로드 해보세요.</p>
            <button className="outline-active-button mt-6 h-[56px] w-full rounded-[8px]">업로드</button>
          </div>
        </div>
      </section>
      <button className="secondary-active-button h-[56px] w-full">선택하기</button>
    </div>
  )
}
export default Thumbnail

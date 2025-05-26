import { CloudUploadIcon } from '../../../assets/svgComponents'

const Upload = () => {
  return (
    <div className="">
      <h2 className="title-md">업로드</h2>
      <div className="flex h-[790px] flex-1 flex-col items-center justify-center">
        <CloudUploadIcon width={160} height={160} />
        <p className="title-md">파일을 업로드 해보세요.</p>
      </div>
      <button className="secondary-active-button h-[56px] w-full">업로드</button>
    </div>
  )
}
export default Upload

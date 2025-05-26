import { AshbnIcon, CopyIcon, PlusIcon } from '../../assets/svgComponents'
import { useNavigate } from 'react-router-dom'

const MainDashBoard = () => {
  const navigate = useNavigate()

  return (
    <div className="flex h-[56.25rem] w-2/3 flex-col items-center justify-between px-[40px] py-[24px]">
      <section className="bg-color border-gray-6 flex w-full gap-x-5 overflow-x-scroll rounded-[1.25rem] border p-6">
        <div className="bg-gray-5 h-[106px] w-[11.75rem] rounded-[8px]" />
        <div className="bg-gray-5 h-[106px] w-[11.75rem] rounded-[8px]" />
        <button className="ghost-active-button h-[106px] w-[11.75rem]">
          <PlusIcon width={24} height={24} />
        </button>
      </section>

      <div className="bg-gray-5 mt-[32px] h-[50%] w-[80%]"></div>

      <section className="w-full">
        <div className="flex justify-between">
          <h2 className="title-md">#2</h2>
          <div className="flex gap-x-3">
            <CopyIcon width={24} height={24} />
            <AshbnIcon width={18} height={18} />
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="flex w-full flex-col gap-y-3">
            <h3 className="subtitle-lg">장면 설명</h3>
            <textarea className="default-input h-[7.5rem] w-full"></textarea>
          </div>
          <div className="flex w-full flex-col gap-y-3">
            <h3 className="subtitle-lg">음성 및 자막</h3>
            <textarea className="default-input h-[7.5rem] w-full"></textarea>
          </div>
        </div>
      </section>
      <div className="mt-7 flex w-full justify-end">
        <button
          onClick={() => {
            navigate('/create-movie')
          }}
          className="active-button h-[56px] w-[392px]"
        >
          영상 생성하기
        </button>
      </div>
    </div>
  )
}
export default MainDashBoard

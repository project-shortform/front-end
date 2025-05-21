import { AshbnIcon, CopyIcon, PlusIcon } from '../../assets/svgComponents'

const MainDashBoard = () => {
  return (
    <div className="flex h-[56.25rem] w-2/3 flex-col items-center justify-between">
      <section className="bg-color border-gray-6 flex w-full gap-x-5 overflow-x-scroll rounded-[1.25rem] border p-6">
        <div className="bg-gray-5 h-[6.75rem] w-[11.75rem]" />
        <div className="bg-gray-5 h-[6.75rem] w-[11.75rem]" />
        <button className="ghost-active-button h-[6.75rem] w-[11.75rem]">
          <PlusIcon width={24} height={24} />
        </button>
      </section>

      <div className="bg-gray-5 h-[28.75rem] w-[51.875rem]"></div>
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
    </div>
  )
}
export default MainDashBoard

import {
  ArrowDownIcon,
  AshbnIcon,
  CirculationIcon,
  CopyIcon,
  DeleteIcon,
  WhiteArrowUpIcon,
} from '../../assets/svgComponents'

interface StoryboardPreviewProps {
  onPrevious: () => void
}

const StoryboardPreview = (props: StoryboardPreviewProps) => {
  const { onPrevious } = props

  return (
    <div className="relative h-full">
      <section className="flex flex-col gap-y-4">
        <div className="flex justify-between">
          <h1 className="title-lg">스토리보드 미리보기</h1>
          <DeleteIcon width={24} height={24} onClick={onPrevious} />
        </div>
        <div className="flex items-center justify-between">
          <h2 className="title-md">생성된 장면 총 3개</h2>
          <button className="secondary-active-button p-3">
            <CirculationIcon width={24} height={24} />
            전체 스토리라인 재생성
          </button>
        </div>
      </section>

      <div className="mt-4 flex h-[32.5rem] flex-col gap-y-5 overflow-y-scroll">
        <section className="border-gray-5 flex flex-col gap-y-3 rounded-[1.25rem] border p-5">
          <div className="flex justify-between">
            <h3 className="title-md">#1</h3>
            <div className="flex items-center gap-x-3">
              <WhiteArrowUpIcon width={24} height={24} />
              <ArrowDownIcon width={24} height={24} />
              <CopyIcon width={24} height={24} />
              <AshbnIcon width={18} height={18} />
            </div>
          </div>
          <div className="flex gap-x-6">
            <div className="flex w-full flex-col gap-y-3">
              <div className="subtitle-lg">장면 설명</div>
              <textarea
                placeholder={'원하는 장면을 성명해주세요.\n' + 'ex) 업무중인 직장인들이 피곤한 모습으로 앉아있다.'}
                className="default-input border-gray-5 h-[7.5rem] w-full border"
              ></textarea>
            </div>
            <div className="flex w-full flex-col gap-y-3">
              <div className="subtitle-lg">음성 및 자막</div>
              <textarea
                placeholder={
                  '원하는 나레이션 및 자막을 작성해주세요.\n' + 'ex) 나레이션: 오후 3시, 달콤한 간식이 필요할때'
                }
                className="default-input border-gray-5 h-[7.5rem] w-full border"
              ></textarea>
            </div>
          </div>
        </section>

        <section className="border-gray-5 flex flex-col gap-y-3 rounded-[1.25rem] border p-5">
          <div className="flex justify-between">
            <h3 className="title-md">#1</h3>
            <div className="flex items-center gap-x-3">
              <WhiteArrowUpIcon width={24} height={24} />
              <ArrowDownIcon width={24} height={24} />
              <CopyIcon width={24} height={24} />
              <AshbnIcon width={18} height={18} />
            </div>
          </div>
          <div className="flex gap-x-6">
            <div className="flex w-full flex-col gap-y-3">
              <div className="subtitle-lg">장면 설명</div>
              <textarea
                placeholder={'원하는 장면을 성명해주세요.\n' + 'ex) 업무중인 직장인들이 피곤한 모습으로 앉아있다.'}
                className="default-input border-gray-5 h-[7.5rem] w-full border"
              ></textarea>
            </div>
            <div className="flex w-full flex-col gap-y-3">
              <div className="subtitle-lg">음성 및 자막</div>
              <textarea
                placeholder={
                  '원하는 나레이션 및 자막을 작성해주세요.\n' + 'ex) 나레이션: 오후 3시, 달콤한 간식이 필요할때'
                }
                className="default-input border-gray-5 h-[7.5rem] w-full border"
              ></textarea>
            </div>
          </div>
        </section>

        <section className="border-gray-5 flex flex-col gap-y-3 rounded-[1.25rem] border p-5">
          <div className="flex justify-between">
            <h3 className="title-md">#1</h3>
            <div className="flex items-center gap-x-3">
              <WhiteArrowUpIcon width={24} height={24} />
              <ArrowDownIcon width={24} height={24} />
              <CopyIcon width={24} height={24} />
              <AshbnIcon width={18} height={18} />
            </div>
          </div>
          <div className="flex gap-x-6">
            <div className="flex w-full flex-col gap-y-3">
              <div className="subtitle-lg">장면 설명</div>
              <textarea
                placeholder={'원하는 장면을 성명해주세요.\n' + 'ex) 업무중인 직장인들이 피곤한 모습으로 앉아있다.'}
                className="default-input border-gray-5 h-[7.5rem] w-full border"
              ></textarea>
            </div>
            <div className="flex w-full flex-col gap-y-3">
              <div className="subtitle-lg">음성 및 자막</div>
              <textarea
                placeholder={
                  '원하는 나레이션 및 자막을 작성해주세요.\n' + 'ex) 나레이션: 오후 3시, 달콤한 간식이 필요할때'
                }
                className="default-input border-gray-5 h-[7.5rem] w-full border"
              ></textarea>
            </div>
          </div>
        </section>
      </div>

      <button className="active-button absolute bottom-0 mt-5 w-full py-5">스토리보드 영상 생성하기</button>
    </div>
  )
}
export default StoryboardPreview

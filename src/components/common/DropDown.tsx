import { ArrowDownIcon } from '../../assets/svgComponents'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import type { StoryBoardStoreType } from '../../store/useStoryBoardStore.ts'

const DropDownBox = ({ children }: { children: ReactNode }) => {
  return <section className="flex w-[30.375rem] flex-col gap-y-2">{children}</section>
}
export default DropDownBox

const DropDownContent = ({
  onDropDownClick,
  selectedContent,
  placeholder,
}: {
  onDropDownClick: () => void
  selectedContent: string
  placeholder: string
}) => {
  return (
    <div onClick={onDropDownClick} className="default-input">
      {selectedContent === '' ? placeholder : selectedContent}
      <ArrowDownIcon width={24} height={24} />
    </div>
  )
}
const DropDownFilter = ({
  isClickedFilter,
  setStoryBoardState,
  data,
  setIsClickedFilter,
}: {
  data: string[]
  isClickedFilter: boolean
  setStoryBoardState: (params: StoryBoardStoreType) => void
  setIsClickedFilter: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    isClickedFilter && (
      <div className="bg-gray-6 flex w-full flex-col rounded-[8px] p-2">
        {data.map((category) => {
          return (
            <button
              onClick={() => {
                setStoryBoardState({ category: category })
                setIsClickedFilter(!isClickedFilter)
              }}
              key={category}
              className="dropdown-list"
            >
              {category}
            </button>
          )
        })}
      </div>
    )
  )
}

DropDownBox.DropDownContent = DropDownContent
DropDownBox.DropDownFilter = DropDownFilter

interface StoryBoardCreatorCardProps {
  children: React.ReactNode
}
const StoryBoardCreatorCard = (props: StoryBoardCreatorCardProps) => {
  const { children } = props
  return (
    <div className="border-gray-5 bg-color relative flex w-[76.188rem] flex-col rounded-[2.5rem] border p-[2.5rem] xl:h-[600px] 2xl:h-[700px]">
      <div className="flex flex-col justify-between gap-y-[2.5rem] overflow-y-scroll 2xl:gap-y-[20px]">{children}</div>
    </div>
  )
}
export default StoryBoardCreatorCard

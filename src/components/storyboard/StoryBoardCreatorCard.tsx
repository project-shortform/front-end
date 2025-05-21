interface StoryBoardCreatorCardProps {
  children: React.ReactNode
}
const StoryBoardCreatorCard = (props: StoryBoardCreatorCardProps) => {
  const { children } = props
  return (
    <div className="border-gray-5 bg-color relative flex h-[50.313rem] w-[76.188rem] flex-col gap-y-[2.5rem] rounded-[2.5rem] border p-[2.5rem]">
      {children}
    </div>
  )
}
export default StoryBoardCreatorCard

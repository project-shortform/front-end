const SideBar = () => {
  return (
    <div className="flex h-[56.25rem] w-1/3 gap-x-[1.75rem]">
      <section className="flex flex-col gap-y-3">
        <button className="bg-gray-5 h-[5rem] w-[5rem]">설정</button>
        <button className="bg-gray-5 h-[5rem] w-[5rem]">영상</button>
        <button className="bg-gray-5 h-[5rem] w-[5rem]">업로드</button>
        <button className="bg-gray-5 h-[5rem] w-[5rem]">썸네일</button>
      </section>
      <div className="bg-color border-gray-5 w-full rounded-[1.25rem] border p-6">
        <div>
          <h1 className="title-md">추천</h1>
          <h1 className="title-md">관련</h1>
        </div>
      </div>
    </div>
  )
}
export default SideBar

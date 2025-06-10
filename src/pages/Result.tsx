import Header from '../components/common/Header.tsx'

const Result = () => {
  return (
    <div>
      <Header headerType={'DEFAULT'} />
      <div className="grid-cols mt-[120px] grid w-full gap-6 px-[40px] lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
        <section className="flex flex-col gap-y-2">
          <h1 className="title-lg">온열처리 예방법</h1>
          <video controls src={'https://clips.ngrok.app/output/final_edit_55.mp4'} width={500} height={200} />
        </section>

        <section className="flex flex-col gap-y-2">
          <h1 className="title-lg">성별에 따른 해킹</h1>
          <video controls src={'https://clips.ngrok.app/output/final_edit_53.mp4'} width={500} height={200} />
        </section>

        <section className="flex flex-col gap-y-2">
          <h1 className="title-lg">챗GPT 열풍 감소</h1>
          <video controls src={'https://clips.ngrok.app/output/final_edit_56.mp4'} width={500} height={200} />
        </section>

        <section className="flex flex-col gap-y-2">
          <h1 className="title-lg">주 4.5일제 찬반 의견</h1>
          <video controls src={'https://clips.ngrok.app/output/final_edit_57.mp4'} width={500} height={200} />
        </section>

        <section className="flex flex-col gap-y-2">
          <h1 className="title-lg">관세</h1>
          <video controls src={'https://clips.ngrok.app/output/final_edit_47.mp4'} width={500} height={200} />
        </section>

        <section className="flex flex-col gap-y-2">
          <h1 className="title-lg">지하철 시간 단축</h1>
          <video controls src={'https://clips.ngrok.app/output/final_edit_49.mp4'} width={500} height={200} />
        </section>
      </div>
    </div>
  )
}
export default Result

import { AshbnIcon, CopyIcon } from '../../assets/svgComponents'
import { useStoryBoardStore } from '../../store/useStoryBoardStore.ts'
import { createVideo } from '../../lib/api.ts'
import type { CreateAsyncMovieResultType } from '../../types/common.ts'

const BASE_URL = import.meta.env.VITE_API_URL

const MainDashBoard = () => {
  const selectedVideoFileName = useStoryBoardStore((state) => state.selectedVideoFileName)
  const selectedScene = useStoryBoardStore((state) => state.selectedScene)
  const storyList = useStoryBoardStore((state) => state.storyList)
  const selectedVideoList = useStoryBoardStore((state) => state.selectedVideoList)
  const selectedMusic = useStoryBoardStore((state) => state.selectedMusic)

  const setStoryBoardState = useStoryBoardStore((state) => state.setStoryBoardState)

  return (
    <div className="flex w-2/3 flex-col items-center justify-between px-[40px] py-[24px]">
      <section className="bg-color border-gray-6 flex w-full gap-x-5 overflow-x-scroll rounded-[1.25rem] border p-6">
        {selectedVideoList?.map((searchVideo) => {
          const isSelected = selectedScene === searchVideo.scene

          return (
            <div
              className={`group relative h-[109px] w-[190px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[8px] transition-all duration-300 ${
                isSelected ? 'shadow-lg ring-2 ring-blue-500 ring-offset-2' : 'bg-gray-100 hover:shadow-md'
              }`}
              onClick={() => {
                setStoryBoardState({
                  selectedScene: searchVideo.scene,
                  selectedVideoFileName: searchVideo.video_file_name,
                })
              }}
              key={searchVideo.scene}
            >
              {/* 썸네일 이미지 */}
              <img
                className={`h-full w-full object-cover transition-transform duration-300 ${
                  isSelected ? 'scale-105' : 'group-hover:scale-105'
                }`}
                src={`${BASE_URL}${searchVideo.thumbnail}`}
                alt={`Scene ${searchVideo.scene} 썸네일`}
              />

              {/* 오버레이 텍스트 */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  isSelected ? 'bg-black/40 opacity-100' : 'bg-black/20 opacity-0 group-hover:opacity-100'
                }`}
              >
                <span className="text-sm font-semibold text-white"># {searchVideo.scene}</span>
              </div>
            </div>
          )
        })}
      </section>
      {selectedVideoFileName ? (
        <video controls src={`${BASE_URL}/uploads/${selectedVideoFileName}`} className="bg-gray-5 mt-[32px] w-[80%]" />
      ) : (
        <div className="bg-gray-5 mt-[32px] w-[80%]"></div>
      )}
      <section className="w-full">
        <div className="flex justify-between">
          <h2 className="title-md">#2</h2>
          <div className="flex gap-x-3">
            <CopyIcon width={24} height={24} />
            <AshbnIcon width={18} height={18} />
          </div>
        </div>
        {storyList && selectedScene && (
          <div className="flex gap-x-6">
            <div className="flex w-full flex-col gap-y-3">
              <h3 className="subtitle-lg">장면 설명</h3>
              <div className="default-input h-[7.5rem] w-full">{storyList[selectedScene - 1]?.script_ko}</div>
            </div>
            <div className="flex w-full flex-col gap-y-3">
              <h3 className="subtitle-lg">음성 및 자막</h3>
              <div className="default-input h-[7.5rem] w-full">{storyList[selectedScene - 1]?.subtitle}</div>
            </div>
          </div>
        )}
      </section>
      <div className="mt-7 flex w-full justify-end">
        <button
          onClick={async () => {
            console.log('[MainDashBoard] 영상 생성 시작')
            console.log('selectedVideoList:', selectedVideoList)
            if (!selectedVideoList?.length) {
              console.error('[MainDashBoard] selectedVideoList가 비어있습니다')
              return
            }

            // ========== 상태 업데이트 - 올바른 순서 ==========
            // 1. 먼저 로딩 상태 활성화
            setStoryBoardState({ isLoading: true })
            console.log('[MainDashBoard] isLoading: true')

            const transformedList = selectedVideoList.map(({ scene, video_file_name, subtitle, script }) => ({
              scene,
              video_file_name,
              subtitle,
              script,
            }))

            try {
              console.log('[MainDashBoard] API 호출 중: createVideo')
              const results: CreateAsyncMovieResultType = await createVideo(transformedList, selectedMusic)
              console.log('[MainDashBoard] ✅ 영상 생성 요청 성공')
              console.log('[MainDashBoard] 응답:', results)

              if (results?.task_id) {
                console.log('[MainDashBoard] task_id 수신:', results.task_id)

                // ========== 상태 업데이트 - 올바른 순서 ==========
                // 2. 비디오 생성 상태 활성화
                // 3. 작업 ID 설정
                // 4. isLoading은 true 유지 (진행 모달 표시를 위해)
                setStoryBoardState({
                  activeAsyncVideo: true, // ✅ 먼저 이걸 true
                  processingTaskId: results.task_id, // ✅ 작업 ID 설정
                  isLoading: true, // ✅ 로딩은 계속 true
                })
                console.log('[MainDashBoard] ✅ 상태 업데이트 완료')
                console.log('[MainDashBoard] - activeAsyncVideo: true')
                console.log('[MainDashBoard] - processingTaskId:', results.task_id)
                console.log('[MainDashBoard] - isLoading: true')
              } else {
                console.error('[MainDashBoard] ❌ task_id가 없습니다')
                console.error('[MainDashBoard] 응답 구조:', results)
                setStoryBoardState({ isLoading: false })
              }
            } catch (err) {
              console.error('[MainDashBoard] ❌ 비디오 생성 실패:', err)
              if (err instanceof Error) {
                console.error('[MainDashBoard] 에러 메시지:', err.message)
              }
              setStoryBoardState({ isLoading: false })
            }
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

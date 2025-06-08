import {
  ArrowDownIcon,
  AshbnIcon,
  CirculationIcon,
  CopyIcon,
  DeleteIcon,
  WhiteArrowUpIcon,
} from '../../assets/svgComponents'
import { useNavigate } from 'react-router-dom'
import type { StoryType } from '../../types/common.ts'
import { createStoryBoardType, createVideo } from '../../lib/api.ts'
import { useStoryBoardStore } from '../../store/useStoryBoardStore.ts'
import { useEffect } from 'react'

interface StoryboardPreviewProps {
  onPrevious: () => void
}

const StoryboardPreview = (props: StoryboardPreviewProps) => {
  const { onPrevious } = props
  const navigate = useNavigate()

  const isLoading = useStoryBoardStore((state) => state.isLoading)
  const content = useStoryBoardStore((state) => state.content)
  const age = useStoryBoardStore((state) => state.age)
  const conceptDetail = useStoryBoardStore((state) => state.conceptDetail)
  const materialType = useStoryBoardStore((state) => state.material_type)
  const concept = useStoryBoardStore((state) => state.concept)
  const conceptInputValue = useStoryBoardStore((state) => state.conceptInputValue)
  const quantity = useStoryBoardStore((state) => state.quantity)
  const storyList = useStoryBoardStore((state) => state.storyList)

  const setStoryBoardState = useStoryBoardStore((state) => state.setStoryBoardState)

  useEffect(() => {
    console.log('storyList', storyList)
  }, [storyList])

  return (
    <div className="flex h-full flex-col">
      <section className="flex flex-col gap-y-4">
        <div className="flex justify-between">
          <h1 className="title-lg">스토리보드 미리보기</h1>
          <DeleteIcon width={24} height={24} onClick={onPrevious} />
        </div>
        <div className="flex items-center justify-between">
          <h2 className="title-md">생성된 장면 총 {storyList.length}개</h2>
          <button
            onClick={() => {
              setStoryBoardState({ isLoading: true })
              createStoryBoardType({
                basic_info: {
                  quantity: quantity,
                  age: age,
                },
                style_info: {
                  concept: concept === '기타' ? conceptInputValue : concept,
                  concept_detail: conceptDetail,
                },
                material_info: {
                  material_type: materialType,
                  content: content,
                },
              }).then((res: { story: StoryType[] }) => {
                console.log('스토리 라인 생성 완료', res)
                setStoryBoardState({ isLoading: false, storyList: res.story })
              })
            }}
            className="secondary-active-button p-3"
          >
            <CirculationIcon width={24} height={24} />
            전체 스토리라인 재생성
          </button>
        </div>
      </section>

      <div className="custom-scroll mt-4 flex flex-grow flex-col gap-y-5 overflow-y-scroll xl:h-[32.5rem] 2xl:h-[400px]">
        {isLoading
          ? null
          : storyList &&
            storyList.length > 0 &&
            storyList.map((story, index) => {
              return (
                <section key={story.scene} className="border-gray-5 flex flex-col gap-y-3 rounded-[1.25rem] border p-5">
                  <div className="flex justify-between">
                    <h3 className="title-md">#{story.scene}</h3>
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
                        value={story.script_ko}
                        onChange={(e) => {
                          const updated = [...storyList]
                          updated[index] = {
                            ...story,
                            script_ko: e.target.value,
                          }
                          setStoryBoardState({ storyList: updated })
                        }}
                        placeholder={
                          '원하는 장면을 성명해주세요.\n' + 'ex) 업무중인 직장인들이 피곤한 모습으로 앉아있다.'
                        }
                        className="default-input h-[7.5rem] w-full"
                      ></textarea>
                    </div>
                    <div className="flex w-full flex-col gap-y-3">
                      <div className="subtitle-lg">음성 및 자막</div>
                      <textarea
                        value={story.subtitle}
                        onChange={(e) => {
                          const updated = [...storyList]
                          updated[index] = {
                            ...story,
                            subtitle: e.target.value,
                          }
                          setStoryBoardState({ storyList: updated })
                        }}
                        placeholder={
                          '원하는 나레이션 및 자막을 작성해주세요.\n' + 'ex) 나레이션: 오후 3시, 달콤한 간식이 필요할때'
                        }
                        className="default-input h-[7.5rem] w-full"
                      ></textarea>
                    </div>
                  </div>
                </section>
              )
            })}
      </div>

      <button
        onClick={async () => {
          console.log('storyList', storyList)
          if (storyList.length === 0) return

          setStoryBoardState({ isLoading: true })

          // ✅ 스토리 리스트 변환
          const transformedList = storyList.map((story) => ({
            scene: story.scene,
            script: story.script_eng, // 영어 스크립트를 script에 넣음
            subtitle: story.subtitle,
          }))

          try {
            const results = await createVideo(transformedList) // 변환된 리스트 사용
            setStoryBoardState({ searchVideoList: results })
            console.log('모든 씬 검색 결과:', results)
            if (results) {
              navigate('/edit-movie')
            }
          } catch (err) {
            console.error('검색 실패:', err)
          } finally {
            setStoryBoardState({ isLoading: false })
          }
        }}
        className="active-button mt-5 w-full py-5"
      >
        스토리보드 영상 생성하기
      </button>
    </div>
  )
}
export default StoryboardPreview

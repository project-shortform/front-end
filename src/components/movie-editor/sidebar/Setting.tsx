import { useState, useEffect } from 'react'
import { useStoryBoardStore } from '../../../store/useStoryBoardStore.ts'

const Setting = () => {
  const storyList = useStoryBoardStore((state) => state.storyList)
  const selectedVideoList = useStoryBoardStore((state) => state.selectedVideoList)
  const setStoryBoardState = useStoryBoardStore((state) => state.setStoryBoardState)
  const selectedScene = useStoryBoardStore((state) => state.selectedScene)

  const [tempSubtitle, setTempSubtitle] = useState('')

  useEffect(() => {
    const currentVideo = selectedVideoList?.find((item) => item.scene === selectedScene)
    setTempSubtitle(currentVideo?.subtitle || '')
  }, [selectedScene, selectedVideoList])

  const handleSave = () => {
    if (!storyList || !selectedVideoList) {
      console.error('storyList 또는 selectedVideoList가 없습니다')
      return
    }

    // ✅ 새로운 배열 생성 (참조 변경 필수)
    const updatedStoryList = storyList.map((item) => ({
      ...item,
      subtitle: item.scene === selectedScene ? tempSubtitle : item.subtitle,
    }))

    const updatedVideoList = selectedVideoList.map((item) => ({
      ...item,
      subtitle: item.scene === selectedScene ? tempSubtitle : item.subtitle,
    }))

    console.log('업데이트 전:', { storyList, selectedVideoList })
    console.log('업데이트 후:', { updatedStoryList, updatedVideoList })

    // ✅ 각각 따로 업데이트
    setStoryBoardState({ storyList: updatedStoryList })
    setStoryBoardState({ selectedVideoList: updatedVideoList })
  }

  return (
    <div className="flex h-[875px] flex-col justify-between">
      <div className="flex flex-col gap-y-[28px]">
        <section>
          <h2 className="title-lg">스토리보드 설정 및 수정</h2>
          <p className="body-md mt-3">스토리보드의 음성 및 자막을 수정할 수 있어요.</p>
        </section>

        <section>
          <h3>음성 및 자막</h3>
          <textarea
            onChange={(e) => setTempSubtitle(e.target.value)}
            value={tempSubtitle}
            className="default-input mt-2 h-[120px] w-full"
          />
        </section>
      </div>
      <button onClick={handleSave} className="secondary-active-button h-[56px] w-full">
        저장하기
      </button>
    </div>
  )
}
export default Setting

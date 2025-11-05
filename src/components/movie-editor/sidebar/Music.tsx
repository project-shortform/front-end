import { useStoryBoardStore } from '../../../store/useStoryBoardStore.ts'
import { useState } from 'react'
import { getMusicSearch } from '../../../lib/api.ts'
import { RedCircleCheckIcon, UnCheckIcon } from '../../../assets/svgComponents'

const BASE_URL = import.meta.env.VITE_API_URL

export default function Music() {
  const setStoryBoardState = useStoryBoardStore((state) => state.setStoryBoardState)
  const selectedMusic = useStoryBoardStore((state) => state.selectedMusic)
  const resultList = useStoryBoardStore((state) => state.searchMusicList)

  const [searchValue, setSearchValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [playingMusic, setPlayingMusic] = useState<string | null>(null)
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null)

  const handleSearch = async () => {
    if (!searchValue.trim()) return

    setIsLoading(true)
    try {
      const result = await getMusicSearch(searchValue)
      console.log('result', result)
      setStoryBoardState({ searchMusicList: result })
    } catch (error) {
      console.error('음악 검색 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectMusic = (fileName: string) => {
    setStoryBoardState({ selectedMusic: fileName })
  }

  const handlePlayMusic = (musicUrl: string, fileName: string) => {
    // 1. 이미 같은 곡이 재생 중이면 토글 (재생/일시정지)
    if (playingMusic === fileName && audioRef) {
      if (audioRef.paused) {
        audioRef.play()
        setPlayingMusic(fileName)
      } else {
        audioRef.pause()
        setPlayingMusic(null) // ✅ 일시정지 시 상태 초기화
      }
      return
    }

    // 2. 다른 곡이 재생 중이면 이전 곡 중지
    if (audioRef && playingMusic !== fileName) {
      audioRef.pause()
      audioRef.currentTime = 0
    }

    // 3. 새로운 곡 재생
    const audio = new Audio(musicUrl)
    audio.onended = () => setPlayingMusic(null)
    audio.play()
    setAudioRef(audio)
    setPlayingMusic(fileName)
  }

  const handleStopMusic = () => {
    if (audioRef) {
      audioRef.pause()
      audioRef.currentTime = 0
    }
    setPlayingMusic(null)
  }

  const formatMusicName = (fileName: string) => {
    return fileName.replace('.mp3', '').replace(/_/g, ' ')
  }

  return (
    // ✅ h-full w-full로 부모 크기 고정
    <div className="flex h-full w-full flex-col justify-between overflow-hidden">
      <div className="flex flex-col gap-y-[28px] overflow-hidden">
        <section>
          <h2 className="title-lg">배경음악 설정</h2>
          <p className="body-md mt-3">영상의 배경음악을 설정할 수 있어요.</p>
        </section>

        <section className="flex flex-col gap-y-3">
          <h3>배경 음악 분위기 검색</h3>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="ex) 감성적인 피아노 음악"
            className="default-input focus:outline-gray-4 placeholder:text-gray-4 w-full focus:outline-1"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="secondary-active-button h-[56px] w-full disabled:opacity-50"
          >
            {isLoading ? '검색 중...' : '검색하기'}
          </button>
        </section>

        {/* ✅ 음악 리스트 영역 - w-full max-w-full 추가 */}
        <section className="flex min-h-0 w-full max-w-full flex-1 flex-col gap-y-3 overflow-hidden">
          {resultList && resultList.length > 0 && (
            <div className="min-h-0 w-full max-w-full flex-1 space-y-2 overflow-y-auto pr-2">
              {resultList.map((music) => {
                const isSelected = selectedMusic === music.metadata.file_name
                const isPlaying = playingMusic === music.metadata.file_name
                const displayName = formatMusicName(music.metadata.file_name)

                return (
                  <div
                    key={music.metadata.file_name}
                    // ✅ w-full max-w-full로 가로 크기 고정
                    className={`flex w-full max-w-full flex-shrink-0 items-center gap-x-3 rounded-lg border-2 p-4 transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {/* ✅ 체크 아이콘 (선택) */}
                    <div
                      onClick={() => handleSelectMusic(music.metadata.file_name)}
                      className="flex-shrink-0 cursor-pointer"
                    >
                      {isSelected ? <RedCircleCheckIcon className="h-6 w-6" /> : <UnCheckIcon className="h-6 w-6" />}
                    </div>

                    {/* ✅ 음악 이름 */}
                    <div className="min-w-0 flex-1">
                      <p className={`truncate text-sm font-medium ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>
                        {displayName}
                      </p>
                      <p className="mt-1 truncate text-xs text-gray-500">{music.metadata.file_name}</p>
                    </div>

                    {/* ✅ 재생/일시정지 버튼 */}
                    <button
                      onClick={() =>
                        handlePlayMusic(`${BASE_URL}/music/${music.metadata.file_name}`, music.metadata.file_name)
                      }
                      className={`flex-shrink-0 rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                        isPlaying
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      }`}
                    >
                      {isPlaying ? '⏸ 정지' : '▶ 재생'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {/* ✅ 검색 결과 없음 */}
          {resultList?.length === 0 && searchValue && !isLoading && (
            <div className="flex justify-center py-8">
              <p className="text-sm text-gray-500">검색 결과가 없습니다.</p>
            </div>
          )}
        </section>
      </div>

      {/* ✅ 재생 중인 음악 표시 */}
      {playingMusic && (
        <div className="mt-4 flex w-full max-w-full flex-shrink-0 items-center justify-between gap-4 rounded-lg border border-blue-300 bg-blue-100 p-4">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="flex-shrink-0 text-sm font-medium text-blue-700">🎵 재생 중:</span>
            <span className="truncate text-sm text-blue-900">{formatMusicName(playingMusic)}</span>
          </div>
          <button
            onClick={handleStopMusic}
            className="flex-shrink-0 rounded bg-blue-500 px-3 py-1 text-sm whitespace-nowrap text-white transition-all hover:bg-blue-600"
          >
            정지
          </button>
        </div>
      )}
    </div>
  )
}

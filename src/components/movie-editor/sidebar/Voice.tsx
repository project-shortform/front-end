import { useStoryBoardStore } from '../../../store/useStoryBoardStore.ts'
import { useState } from 'react'
import { RedCircleCheckIcon, UnCheckIcon } from '../../../assets/svgComponents'

const voiceList = [
  { name: 'despina', displayName: 'Despina', file: 'despina.wav' },
  { name: 'fenrir', displayName: 'Fenrir', file: 'fenrir.wav' },
  { name: 'kore', displayName: 'Kore', file: 'kore.wav' },
  { name: 'rasalgethi', displayName: 'Rasalgethi', file: 'rasalgethi.wav' },
  { name: 'puck', displayName: 'Puck', file: 'puck.wav' },
  { name: 'vindemiatrix', displayName: 'Vindemiatrix', file: 'vindemiatrix.wav' },
  { name: 'zephyr', displayName: 'Zephyr', file: 'zephyr.wav' },
]

export default function Voice() {
  const setStoryBoardState = useStoryBoardStore((state) => state.setStoryBoardState)
  const selectedVoice = useStoryBoardStore((state) => state.selectedVoice)

  const [playingVoice, setPlayingVoice] = useState<string | null>(null)
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null)

  const handleSelectVoice = (voiceName: string) => {
    setStoryBoardState({ selectedVoice: voiceName })
  }

  const handlePlayVoice = (voiceFile: string, voiceName: string) => {
    if (playingVoice === voiceName && audioRef) {
      if (audioRef.paused) {
        audioRef.play()
        setPlayingVoice(voiceName)
      } else {
        audioRef.pause()
        setPlayingVoice(null)
      }
      return
    }

    if (audioRef && playingVoice !== voiceName) {
      audioRef.pause()
      audioRef.currentTime = 0
    }

    const audio = new Audio(`/voice/${voiceFile}`)
    audio.onended = () => setPlayingVoice(null)
    audio.play()
    setAudioRef(audio)
    setPlayingVoice(voiceName)
  }

  const handleStopVoice = () => {
    if (audioRef) {
      audioRef.pause()
      audioRef.currentTime = 0
    }
    setPlayingVoice(null)
  }

  return (
    <div className="flex h-full w-full flex-col justify-between overflow-hidden">
      <div className="flex flex-col gap-y-[28px] overflow-hidden">
        <section>
          <h2 className="title-lg">음성 설정</h2>
          <p className="body-md mt-3">영상의 내레이션 음성을 설정할 수 있어요.</p>
        </section>

        {/* 음성 리스트 */}
        <section className="flex min-h-0 w-full max-w-full flex-1 flex-col gap-y-3 overflow-hidden">
          <h3>음성 선택</h3>
          <div className="min-h-0 w-full max-w-full flex-1 space-y-2 overflow-y-auto pr-2">
            {voiceList.map((voice) => {
              const isSelected = selectedVoice === voice.name
              const isPlaying = playingVoice === voice.name

              return (
                <div
                  key={voice.name}
                  className={`flex w-full max-w-full flex-shrink-0 items-center gap-x-3 rounded-lg border-2 p-4 transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {/* 체크 */}
                  <div onClick={() => handleSelectVoice(voice.name)} className="flex-shrink-0 cursor-pointer">
                    {isSelected ? <RedCircleCheckIcon className="h-6 w-6" /> : <UnCheckIcon className="h-6 w-6" />}
                  </div>

                  {/* 음성 이름 */}
                  <div className="min-w-0 flex-1">
                    <p className={`truncate text-sm font-medium ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>
                      {voice.displayName}
                    </p>
                    <p className="mt-1 truncate text-xs text-gray-500">{voice.file}</p>
                  </div>

                  {/* 재생/일시정지 버튼 */}
                  <button
                    onClick={() => handlePlayVoice(voice.file, voice.name)}
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
        </section>
      </div>

      {/* 재생 중인 음성 표시 */}
      {playingVoice && (
        <div className="mt-4 flex w-full max-w-full flex-shrink-0 items-center justify-between gap-4 rounded-lg border border-blue-300 bg-blue-100 p-4">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="flex-shrink-0 text-sm font-medium text-blue-700">🎤 재생 중:</span>
            <span className="truncate text-sm text-blue-900">
              {voiceList.find((v) => v.name === playingVoice)?.displayName}
            </span>
          </div>
          <button
            onClick={handleStopVoice}
            className="flex-shrink-0 rounded bg-blue-500 px-3 py-1 text-sm whitespace-nowrap text-white transition-all hover:bg-blue-600"
          >
            정지
          </button>
        </div>
      )}
    </div>
  )
}

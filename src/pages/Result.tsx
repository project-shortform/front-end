import Header from '../components/common/Header.tsx'
import { useEffect, useState } from 'react'
import { getVideoHistory } from '../lib/api.ts'
import type { VideoHistoryResponse } from '../types/common.ts'

const BASE_URL = import.meta.env.VITE_API_URL

interface FeaturedVideo {
  title: string
  url: string
  thumbnail?: string
}

const Result = () => {
  const [historyData, setHistoryData] = useState<VideoHistoryResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // 메인 영상 5개 (직접 URL 입력)
  const featuredVideos: FeaturedVideo[] = [
    {
      title: '하나에 1000원, 이해 안가요... 붕어빵은 왜 비쌀까?',
      url: 'https://clips.bucket.click/output/final_edit_117.mp4',
    },
    {
      title: '내년 최저임금 인상',
      url: 'https://clips.bucket.click/output/final_edit_116.mp4',
    },
    {
      title: '로미오와 줄리엣 줄거리 요약',
      url: 'https://clips.bucket.click/output/final_edit_115.mp4',
    },
    {
      title: '코스피 4000 관련 전체 시총 ‘빅5 그룹’ 쏠림',
      url: 'https://clips.bucket.click/output/final_edit_114.mp4',
    },
    {
      title: '독감·코로나 걱정 아니어도 겨울철에 마스크 쓰는 게 좋은 이유는',
      url: 'https://clips.bucket.click/output/final_edit_113.mp4',
    },
  ]

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getVideoHistory(20, 0)
        setHistoryData(data)
      } catch (error) {
        console.error('비디오 히스토리 로딩 실패:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistory()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getVideoTitle = (item: VideoHistoryResponse['history'][0]) => {
    if (item.story_request?.scenes?.[0]?.subtitle) {
      return item.story_request.scenes[0].subtitle.slice(0, 30) + '...'
    }
    return `영상 #${item.id}`
  }

  return (
    <div className="bg-background min-h-screen">
      <Header headerType={'DEFAULT'} />

      {/* 메인 영상 섹션 */}
      <section className="mx-auto max-w-6xl px-6 pt-32 pb-16">
        <div className="mb-8">
          <h1 className="title-lg mb-2 text-white">주요 영상</h1>
          <p className="body-md text-gray-3">AI가 제작한 대표 영상 컬렉션</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredVideos.map((video, index) => (
            <div
              key={index}
              className="group bg-gray-6 hover:ring-main relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:ring-2"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedVideo(video.url)}
            >
              <div className="relative aspect-video">
                <video
                  src={video.url}
                  controls={hoveredIndex === index}
                  autoPlay={hoveredIndex === index}
                  muted={hoveredIndex === index}
                  className="pointer-events-none h-full w-full object-cover"
                  preload="metadata"
                />
                {hoveredIndex !== index && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity">
                    <div className="text-center">
                      <div className="text-main mb-2 text-4xl">▶</div>
                      <p className="body-sm text-white">클릭하여 크게 보기</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                <h3 className="subtitle-md text-white">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 히스토리 영상 섹션 */}
      <section className="border-gray-6 border-t px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="title-lg mb-2 text-white">생성된 영상</h2>
            <p className="body-md text-gray-3">
              최근 생성된 영상 {historyData?.returned_count || 0}개 / 전체 {historyData?.total_count || 0}개
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="border-gray-5 border-t-main h-12 w-12 animate-spin rounded-full border-4"></div>
            </div>
          ) : (
            <div className="custom-scroll grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {historyData?.history.map((item, index) => (
                <div
                  key={item.id}
                  className="group bg-gray-6 hover:ring-main relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:ring-2"
                  onMouseEnter={() => setHoveredIndex(1000 + index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedVideo(`${BASE_URL}/${item.output_path}`)}
                >
                  {/* 비디오 섹션 */}
                  <div className="bg-gray-5 relative aspect-video">
                    <video
                      src={`${BASE_URL}/${item.output_path}`}
                      muted
                      className="pointer-events-none h-full w-full object-cover"
                      preload="metadata"
                    />

                    {/* 호버 시 상세 정보 오버레이 */}
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/70 to-black/30 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="space-y-2">
                        <h4 className="subtitle-sm line-clamp-2 text-white">{getVideoTitle(item)}</h4>

                        {item.story_request?.scenes?.[0]?.subtitle && (
                          <p className="small text-gray-2 line-clamp-2">{item.story_request.scenes[0].subtitle}</p>
                        )}

                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="small bg-gray-5/80 text-gray-1 rounded px-2 py-1">
                            {item.story_request?.scenes?.length || 0} 씬
                          </span>

                          {item.generation_options?.voice && (
                            <span className="small bg-main/80 flex items-center gap-1 rounded px-2 py-1 text-white">
                              <span>🎤</span>
                              {item.generation_options.voice}
                            </span>
                          )}
                        </div>

                        <div className="border-gray-5/50 mt-2 flex items-center justify-between border-t pt-2">
                          <span className="small text-gray-3">{formatDate(item.created_at)}</span>
                          <span className="small text-gray-3">#{item.id}</span>
                        </div>
                      </div>

                      {/* 재생 버튼 */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="bg-main rounded-full p-4 shadow-lg transition-transform group-hover:scale-110">
                          <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* 기본 상태 재생 아이콘 */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                      <div className="text-main text-3xl">▶</div>
                    </div>
                  </div>

                  {/* 하단 정보 (항상 표시) */}
                  <div className="p-3">
                    <h4 className="subtitle-sm text-gray-1 truncate">{getVideoTitle(item)}</h4>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="small text-gray-4">{formatDate(item.created_at)}</span>
                      <span className="small bg-gray-5 text-gray-3 rounded-full px-2 py-1">#{item.id}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 전체화면 모달 */}
      {selectedVideo && (
        <div
          className="bg-overlay/95 fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedVideo(null)}
              className="text-gray-1 hover:text-main absolute -top-12 right-0 transition-colors"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <video src={selectedVideo} controls autoPlay className="w-full rounded-lg" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Result

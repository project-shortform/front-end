import {
  MovieIcon,
  RedMovieIcon,
  RedSettingIcon,
  RedThumbnailIcon,
  SettingIcon,
  ThumbnailIcon,
} from '../../assets/svgComponents'
import type { Dispatch, SetStateAction } from 'react'
import type { SideBarType } from '../../types/common.ts'
import Movie from './sidebar/Movie.tsx'
import Setting from './sidebar/Setting.tsx'
import Music from './sidebar/Music.tsx'
import Voice from './sidebar/Voice.tsx'

interface SideBarProps {
  setSelectedMenu: Dispatch<SetStateAction<SideBarType>>
  selectedMenu: SideBarType
}

const SideBar = ({ selectedMenu, setSelectedMenu }: SideBarProps) => {
  const sideBarMenu: SideBarType[] = ['영상', '설정', '음악', '음성']

  const renderIcon = (sideBarMenu: SideBarType) => {
    switch (sideBarMenu) {
      case '설정':
        return <SettingIcon width={32} height={32} />
      case '음악':
        return <MovieIcon width={32} height={32} />
      case '음성':
        return <SettingIcon width={32} height={32} />
      default:
        return <ThumbnailIcon width={32} height={32} />
    }
  }

  const renderRedIcon = (sideBarMenu: SideBarType) => {
    switch (sideBarMenu) {
      case '설정':
        return <RedSettingIcon width={32} height={32} />
      case '음악':
        return <RedMovieIcon width={32} height={32} />
      case '음성':
        return <RedSettingIcon width={32} height={32} />
      default:
        return <RedThumbnailIcon width={32} height={32} />
    }
  }

  const renderSideBar = (sideBarMenu: SideBarType) => {
    switch (sideBarMenu) {
      case '설정':
        return <Setting />
      case '음악':
        return <Music />
      case '음성':
        return <Voice />
      default:
        return <Movie />
    }
  }

  return (
    <div className="flex h-[56.25rem] w-1/3">
      <section className="border-gray-5 flex flex-col gap-y-3 border-r px-5 py-6">
        {sideBarMenu.map((menu) => {
          return (
            <button
              onClick={() => {
                setSelectedMenu(menu)
              }}
              key={menu}
              className={`${selectedMenu === menu ? 'text-main rounded-[8px] bg-[#501616]' : ''} button-md flex h-[72px] w-[72px] flex-col items-center justify-center gap-y-1`}
            >
              {selectedMenu === menu ? renderRedIcon(menu) : renderIcon(menu)}
              {menu}
            </button>
          )
        })}
      </section>
      <div className="border-gray-5 flex-1 overflow-hidden border-r p-6">{renderSideBar(selectedMenu)}</div>
    </div>
  )
}
export default SideBar

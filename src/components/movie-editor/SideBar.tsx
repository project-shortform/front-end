import {
  MovieIcon,
  RedMovieIcon,
  RedSettingIcon,
  RedThumbnailIcon,
  RedUploadIcon,
  SettingIcon,
  ThumbnailIcon,
  UploadIcon,
} from '../../assets/svgComponents'
import type { Dispatch, SetStateAction } from 'react'
import type { SideBarType } from '../../types/common.ts'
import Movie from './sidebar/Movie.tsx'
import Setting from './sidebar/Setting.tsx'
import Upload from './sidebar/Upload.tsx'
import Thumbnail from './sidebar/Thumbnail.tsx'

interface SideBarProps {
  setSelectedMenu: Dispatch<SetStateAction<SideBarType>>
  selectedMenu: SideBarType
}

const SideBar = ({ selectedMenu, setSelectedMenu }: SideBarProps) => {
  const sideBarMenu: SideBarType[] = ['영상', '설정', '업로드', '썸네일']

  const renderIcon = (sideBarMenu: SideBarType) => {
    switch (sideBarMenu) {
      case '설정':
        return <SettingIcon width={32} height={32} />
      case '썸네일':
        return <ThumbnailIcon width={32} height={32} />
      case '업로드':
        return <UploadIcon width={32} height={32} />
      default:
        return <MovieIcon width={32} height={32} />
    }
  }

  const renderRedIcon = (sideBarMenu: SideBarType) => {
    switch (sideBarMenu) {
      case '설정':
        return <RedSettingIcon width={32} height={32} />
      case '썸네일':
        return <RedThumbnailIcon width={32} height={32} />
      case '업로드':
        return <RedUploadIcon width={32} height={32} />
      default:
        return <RedMovieIcon width={32} height={32} />
    }
  }

  const renderSideBar = (sideBarMenu: SideBarType) => {
    switch (sideBarMenu) {
      case '설정':
        return <Setting />
      case '썸네일':
        return <Thumbnail />
      case '업로드':
        return <Upload />
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
      <div className="border-gray-5 w-full border-r p-6">{renderSideBar(selectedMenu)}</div>
    </div>
  )
}
export default SideBar

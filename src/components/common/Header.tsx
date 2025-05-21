import type { HeaderType } from '../../types/common.ts'
import { Logo } from '../../assets/svgComponents'
import { useLocation } from 'react-router-dom'

interface HeaderProps {
  headerType: HeaderType
  onClick?: () => void
}
const Header = (props: HeaderProps) => {
  const { headerType, onClick } = props
  const path = useLocation()

  const renderHeaderType = (headerType: HeaderType) => {
    switch (headerType) {
      case 'DEFAULT':
        return (
          <div className="flex items-center justify-between">
            <Logo width={72} height={36} />
            <section className="border-gray-6 rounded-[12px] border p-2">
              <button
                className={
                  path.pathname === '/storyboard'
                    ? 'ghost-active-button h-[2.25rem] w-[8.25rem]'
                    : 'ghost-disabled-button h-[2.25rem] w-[8.25rem]'
                }
              >
                스토리보드 생성
              </button>
              <button
                className={
                  path.pathname === '/edit-movie'
                    ? 'ghost-active-button h-[2.25rem] w-[8.25rem]'
                    : 'ghost-disabled-button h-[2.25rem] w-[8.25rem]'
                }
              >
                영상 편집
              </button>
              <button
                className={
                  path.pathname === '/create-movie'
                    ? 'ghost-active-button h-[2.25rem] w-[8.25rem]'
                    : 'ghost-disabled-button h-[2.25rem] w-[8.25rem]'
                }
              >
                영상 생성
              </button>
            </section>
            <button onClick={onClick} className="text-gray-2 button-md">
              로그인 | 회원가입
            </button>
          </div>
        )
    }
  }

  return (
    <div className="fixed top-0 w-full bg-[#00000033] px-10 py-5 py-[0.875rem]">{renderHeaderType(headerType)}</div>
  )
}
export default Header

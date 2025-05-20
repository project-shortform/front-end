import type { HeaderType } from '../../types/common.ts'
import { Logo } from '../../assets/svgComponents'

interface HeaderProps {
  headerType: HeaderType
  onClick?: () => void
}
const Header = (props: HeaderProps) => {
  const {headerType, onClick} = props

  const renderHeaderType = (headerType: HeaderType) => {
    switch (headerType) {
      case 'DEFAULT':
        return (
          <div className="flex justify-between">
            <Logo width={72} height={36} />
            <button onClick={onClick} className="text-gray-2 button-md">로그인 | 회원가입</button>
          </div>
        )
    }
  }

  return (
    <div className="fixed top-0 py-5 px-10 h-[5rem] bg-[#00000033] w-full">
      {renderHeaderType(headerType)}
    </div>
  )
}
export default Header

import type { SVGProps } from 'react'
const SvgKakaoLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 19 19" {...props}>
    <g clipPath="url(#kakao-logo_svg__a)">
      <path
        fill="#000"
        fillRule="evenodd"
        d="M9.751 1.462c-4.97 0-9 3.113-9 6.953 0 2.387 1.559 4.492 3.932 5.744l-.999 3.648c-.088.322.28.58.564.392l4.377-2.888q.553.054 1.126.056c4.97 0 9-3.113 9-6.952s-4.03-6.953-9-6.953"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="kakao-logo_svg__a">
        <path fill="#fff" d="M.751.862h18v18h-18z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgKakaoLogo

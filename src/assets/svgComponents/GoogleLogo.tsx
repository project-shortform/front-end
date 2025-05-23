import type { SVGProps } from 'react'
const SvgGoogleLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 21 21" {...props}>
    <mask
      id="google-logo_svg__a"
      width={21}
      height={21}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path fill="#fff" d="M20.251.862h-20v20h20z" />
    </mask>
    <g mask="url(#google-logo_svg__a)">
      <path
        fill="#4285F4"
        d="M19.851 11.09q-.002-1.064-.182-2.046h-9.418v3.868h5.382a4.6 4.6 0 0 1-1.995 3.018v2.51h3.231c1.891-1.742 2.982-4.305 2.982-7.35"
      />
      <path
        fill="#34A853"
        d="M10.251 20.862c2.7 0 4.964-.895 6.618-2.422l-3.231-2.51c-.896.6-2.041.955-3.387.955-2.604 0-4.809-1.76-5.595-4.123H1.315v2.591a10 10 0 0 0 8.936 5.51"
      />
      <path
        fill="#FBBC04"
        d="M4.656 12.763c-.2-.6-.314-1.241-.314-1.9 0-.66.114-1.3.314-1.9V6.371H1.315a10 10 0 0 0-1.064 4.49c0 1.614.387 3.141 1.064 4.491z"
      />
      <path
        fill="#E94235"
        d="M10.251 4.84c1.468 0 2.787.504 3.823 1.495l2.868-2.868C15.21 1.853 12.947.862 10.252.862c-3.91 0-7.292 2.241-8.937 5.51l3.34 2.59C5.443 6.6 7.648 4.84 10.252 4.84"
      />
    </g>
  </svg>
)
export default SvgGoogleLogo

import type { SVGProps } from 'react'
const SvgCloudUploadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 160 160" {...props}>
    <mask
      id="cloud_upload-icon_svg__a"
      width={160}
      height={160}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}
    >
      <path fill="#D9D9D9" d="M0 0h160v160H0z" />
    </mask>
    <g mask="url(#cloud_upload-icon_svg__a)">
      <path
        fill="#4F5052"
        d="M42.59 129.997q-13.573 0-23.082-9.478Q10 111.041 10 97.467q0-12.23 8.082-21.598 8.08-9.367 20.303-10.727 2.778-15.333 14.537-25.205t27.258-9.872q17.661 0 29.912 12.622t12.25 30.463v5.317h2.051q10.787.009 18.197 7.415T150 104.21q0 10.659-7.565 18.222-7.563 7.565-18.222 7.565H84.188v-51.18l11.004 10.97q1.205 1.248 2.9 1.248t2.933-1.24q1.226-1.205 1.217-2.981-.012-1.778-1.217-2.984L83.653 66.39q-1.56-1.56-3.653-1.56t-3.653 1.56l-17.44 17.44q-1.206 1.206-1.2 2.932.006 1.727 1.268 2.923 1.205 1.247 2.987 1.212 1.781-.036 3.021-1.242l10.829-10.838v51.18z"
      />
    </g>
  </svg>
)
export default SvgCloudUploadIcon

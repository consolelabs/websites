import type { SVGProps } from 'react'

const IconApt = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <path
      d="M47.2819 29.8057C44.0766 42.663 31.0542 50.4877 18.1954 47.2815C5.34204 44.0761 -2.48265 31.053 0.724136 18.1967C3.9281 5.33806 16.9504 -2.48721 29.8052 0.718162C42.6631 3.92354 50.4873 16.9481 47.2816 29.806L47.2818 29.8057H47.2819Z"
      fill="url(#apt)"
    />
    <defs>
      <pattern
        id="apt"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <use xlinkHref="#apt_image" transform="scale(0.00500056)" />
      </pattern>
      <image
        id="apt_image"
        width={200}
        height={200}
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
)
export default IconApt

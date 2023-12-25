import * as RadixAvatar from '@radix-ui/react-avatar'
import { useId } from 'react'
import { avatar, AvatarStylesProps } from '@mochi-ui/theme'
import { Skeleton } from '@mochi-ui/skeleton'
import { boringAvatar } from './util'

const { avatarCva, avatarImgClsx, avatarFallbackCls, avatarImgSvgCls } = avatar

interface AvatarProps extends AvatarStylesProps {
  src: string
  smallSrc?: string
  fallback?: string
  className?: string
}

export default function Avatar({
  size,
  src,
  smallSrc,
  fallback = '',
  className,
}: AvatarProps) {
  const id = useId()
  const fallbackUrl = boringAvatar(fallback)

  return (
    <RadixAvatar.Root className={avatarCva({ size, className })}>
      <RadixAvatar.Image
        src={src || fallbackUrl}
        className={avatarImgClsx({ smallSrc: Boolean(smallSrc) })}
        asChild={!!smallSrc}
      >
        {smallSrc ? (
          <svg height="100%" role="none" viewBox="0 0 100 100" width="100%">
            <mask id={`circle-mask-${id}`}>
              <circle cx="50%" cy="50%" fill="white" r="50%" />
              <circle cx="80%" cy="80%" fill="black" r="20%" />
            </mask>
            <image
              height="100%"
              mask={`url(#circle-mask-${id})`}
              width="100%"
              xlinkHref={src || fallbackUrl}
              className={avatarImgSvgCls}
            />
            <image
              height="33%"
              width="33%"
              x="63%"
              xlinkHref={smallSrc || fallbackUrl}
              y="63%"
            />
          </svg>
        ) : null}
      </RadixAvatar.Image>
      <RadixAvatar.Fallback>
        <Skeleton className={avatarFallbackCls} />
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}

export { type AvatarProps }

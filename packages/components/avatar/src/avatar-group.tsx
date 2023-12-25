import {
  Children,
  cloneElement,
  DetailedReactHTMLElement,
  Fragment,
  ReactNode,
} from 'react'
import { avatar, AvatarStylesProps } from '@mochi-ui/theme'
import Avatar, { AvatarProps } from './avatar'

const {
  avatarGroupWrapperCva,
  avatarGroupCva,
  avatarGroupItemClsx,
  avatarGroupItemAvatarClsx,
} = avatar

export type AvatarGroupProps = {
  children: ReactNode
  size?: 'xs' | 'sm' | 'base' | 'lg'
  className?: string
}

export default function AvatarGroup(props: AvatarGroupProps) {
  const { children, size = 'base', className } = props
  const avatarChild = Children.toArray(children).filter(
    (child) => (child as React.ReactElement<AvatarProps, any>).type === Avatar,
  )

  const hasMoreThanFour = avatarChild.length > 4

  return (
    <div className={avatarGroupWrapperCva({ size })}>
      <div className={avatarGroupCva({ size, className })}>
        {(hasMoreThanFour ? avatarChild.slice(0, 3) : avatarChild).map(
          (child, index) => (
            <div
              key={index}
              className={avatarGroupItemClsx({
                // Only fill the cell 0, 2 and 3 if there are more than 4 avatars,
                // the cell 1 (bottom right) is for displaying the hidden amount
                index: index && hasMoreThanFour ? index + 1 : index,
              })}
            >
              {cloneElement(
                child as DetailedReactHTMLElement<AvatarProps, HTMLElement>,
                {
                  className: avatarGroupItemAvatarClsx(),
                },
              )}
            </div>
          ),
        )}
        {hasMoreThanFour ? (
          <div className={avatarGroupItemClsx({ index: 1 })}>
            <div className={avatarGroupItemAvatarClsx({ isExtraCell: true })}>
              +{avatarChild.length - 4}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

import { cva, VariantProps } from 'class-variance-authority'

const avatarCva = cva(['inline-block flex-shrink-0 rounded-full'], {
  variants: {
    size: {
      xs: 'w-4 h-4',
      sm: 'w-7 h-7',
      base: 'w-10 h-10',
      lg: 'w-14 h-14',
      xl: 'w-20 h-20',
    },
  },
  defaultVariants: {
    size: 'base',
  },
})

const tokenAvatarCva = cva(['inline-block flex-shrink-0 rounded-full'], {
  variants: {
    size: {
      base: 'w-6 h-6',
    },
  },
  defaultVariants: {
    size: 'base',
  },
})

export const avatar = { avatarCva, tokenAvatarCva }

export type AvatarStylesProps = VariantProps<typeof avatarCva>
export type TokenAvatarStylesProps = VariantProps<typeof tokenAvatarCva>

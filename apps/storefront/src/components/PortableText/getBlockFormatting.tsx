import { PortableTextBlockComponent } from '@portabletext/react'
import { PortableTextBlockStyle } from '@portabletext/types'
import { twMerge } from 'tailwind-merge'

export const getBlockFormatting = (
  defaultBlockClass?: string,
):
  | Record<PortableTextBlockStyle, PortableTextBlockComponent | undefined>
  | PortableTextBlockComponent => ({
  normal: ({ children }) => (
    <p className={twMerge('text-xl my-6', defaultBlockClass)}>{children}</p>
  ),
  h1: ({ children }) => (
    <h1
      className={twMerge('mb-4 md:mb-8 text-6xl font-bold', defaultBlockClass)}
    >
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2
      className={twMerge('mb-4 md:mb-8 text-4xl font-bold', defaultBlockClass)}
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      className={twMerge('mb-4 md:mb-8 text-3xl font-bold', defaultBlockClass)}
    >
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4
      className={twMerge('mb-4 md:mb-8 text-xl font-bold', defaultBlockClass)}
    >
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className={twMerge('mb-4 md:mb-8', defaultBlockClass)}>{children}</h5>
  ),
  h6: ({ children }) => (
    <h6 className={twMerge('mb-4 md:mb-8', defaultBlockClass)}>{children}</h6>
  ),
})

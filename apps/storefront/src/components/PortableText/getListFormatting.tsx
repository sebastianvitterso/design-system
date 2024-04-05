import { PortableTextListComponent } from '@portabletext/react'
import { PortableTextListItemType } from '@portabletext/types'
import { twMerge } from 'tailwind-merge'

export const getListFormatting = (
  defaultBlockClass?: string,
):
  | Record<PortableTextListItemType, PortableTextListComponent | undefined>
  | PortableTextListComponent => ({
  bullet: ({ children }) => (
    <ul
      className={twMerge(
        'list-disc pl-4 mb-4 text-xl space-y-4',
        defaultBlockClass,
      )}
    >
      {children}
    </ul>
  ),
  number: ({ children }) => (
    <ol
      className={twMerge(
        'list-decimal pl-4 mb-4 text-xl space-y-4',
        defaultBlockClass,
      )}
    >
      {children}
    </ol>
  ),
})

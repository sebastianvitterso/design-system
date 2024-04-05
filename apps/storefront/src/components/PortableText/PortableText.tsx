import {
  PortableText as PortableTextComponent,
  PortableTextMarkComponent,
} from '@portabletext/react'
import { TypedObject } from '@portabletext/types'
import Image from 'next/image'
import { urlForImage } from '../../../sanity/lib/image'
import { getBlockFormatting } from './getBlockFormatting'
import { getListFormatting } from './getListFormatting'

const LinkMarkComponent: PortableTextMarkComponent = ({ value, children }) => {
  const { blank, href } = value

  if (!value?.href) return <>{children}</>

  return blank ? (
    <a className="underline" href={href} target="_blank" rel="noopener">
      {children}
    </a>
  ) : (
    <a className="underline" href={href}>
      {children}
    </a>
  )
}

// TODO: Add support for links to other documents and external resources

export const PortableText = ({ value }: { value: TypedObject }) => {
  return (
    <PortableTextComponent
      value={value}
      components={{
        marks: {
          link: LinkMarkComponent,
        },
        block: getBlockFormatting(),
        list: getListFormatting(),
        types: {
          text: ({ value }) => {
            return <p className="mb-4">{value}</p>
          },
          image: ({ value }) => {
            return (
              <Image
                src={urlForImage(value)}
                alt={value?.alt}
                width="1600"
                height="900"
                className="mb-8"
              />
            )
          },
        },
      }}
    />
  )
}

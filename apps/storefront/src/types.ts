import { PortableTextBlock } from '@portabletext/types'
import { Image } from 'sanity'

export type Document = {
  _id: string
  _type: string
  title?: string
  slug?: {
    current: string
  }
  category?: {
    _id: string
  }
}

export type Post = {
  _id: string
  title?: string
  mainImage?: Image
  slug?: {
    current: string
  }
  category?: {
    _id: string
  }
  body?: PortableTextBlock
}

export type Category = {
  _id: string
  title?: string
  slug?: {
    current: string
  }
  description?: string
  category?: {
    _id: string
  }
}

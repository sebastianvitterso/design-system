import { sanityFetch } from '@/utils/sanityFetch'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import { Document, Post } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '../../../sanity/lib/image'
import { PortableText } from '@/components/PortableText/PortableText'

// eslint-disable-next-line import/no-default-export
export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = params?.slug?.[params?.slug?.length - 1]

  const document = await sanityFetch<Document>({
    query: groq`*[slug.current == $slug][0]`,
    params: {
      slug,
    },
    revalidate: 30, // in seconds
  })

  if (!document) {
    notFound()
  }

  if (document._type === 'category') {
    const category = document as Category

    const categories = await sanityFetch<Document[]>({
      query: groq`*[_type == "category" && references($id) && defined(slug)]`,
      params: {
        id: category._id,
      },
    })
    const posts = await sanityFetch<Post[]>({
      query: groq`*[_type == "post" && references($id) && defined(slug)]`,
      params: {
        id: category._id,
      },
    })
    return (
      <article className="mx-auto container pt-14">
        <span>Category</span>
        <div className="mb-14">
          <h1 className="text-6xl">{category?.title}</h1>
          <p>{category?.description}</p>
        </div>
        <div className="flex flex-col gap-12">
          {categories.length > 0 && (
            <section>
              <h2 className="text-4xl mb-4">Categories</h2>
              <ul>
                {categories.map((category) => (
                  <li key={category._id}>
                    <Link href={category?.slug?.current} className="underline">
                      {category?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {posts.length > 0 && (
            <section>
              <h2 className="text-4xl mb-4">Posts</h2>
              <ul>
                {posts.map((post) => (
                  <li key={post._id}>
                    <Link href={post?.slug?.current} className="underline">
                      {post?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>
    )
  }

  const post = document as Post

  return (
    <article className="mx-auto container pt-14">
      {post.mainImage ? (
        <Image
          src={urlForImage(post.mainImage)}
          width="1600"
          height="900"
          alt={post.mainImage?.alt}
          className="mb-14"
        />
      ) : (
        <div className="post__cover--none" />
      )}
      <span>Post</span>
      <h1 className="text-6xl">{document?.title}</h1>
      {document?.body && <PortableText value={document?.body} />}
    </article>
  )
}

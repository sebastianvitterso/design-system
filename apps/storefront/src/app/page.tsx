/* eslint-disable import/no-default-export */
import { Category } from '@/types'
import { sanityFetch } from '@/utils/sanityFetch'
import { groq } from 'next-sanity'
import Link from 'next/link'

export default async function Home() {
  const mainCategories = await sanityFetch<Category[]>({
    query: groq`*[_type == "category" && !defined(category) && defined(slug)]`,
    tags: ['categories'],
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {mainCategories.map((category) => (
          <Link
            key={category._id}
            href={category?.slug?.current}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              {category?.title}{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              {category?.description}
            </p>
          </Link>
        ))}
        <a
          href="/components"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Components{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            The design system contains basic components that can be assembled in
            many different ways and in various patterns.
          </p>
        </a>
      </div>
    </main>
  )
}

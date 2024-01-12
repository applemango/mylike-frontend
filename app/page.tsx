import { ArticleForm } from '@/components/form'
import { req } from '@/lib/req'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const articles = (await req<{articles: Array<any>}>("/article"))?.articles
  return <div>
    <h1>自分の好きなもの</h1>
    <div>
      {articles?.map((article)=> <Link href={`/${article.username}/${article.id}`}>
        <div>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
        </div>
      </Link>)}
    </div>
    <ArticleForm />
  </div>
}

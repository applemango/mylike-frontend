import { ArticleForm } from '@/components/form'
import { TimeLine } from '@/components/timeline'
import { req } from '@/lib/req'
import { Article } from '@/lib/type'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const articles = (await req<{articles: Array<Article>}>("/article"))?.articles.reverse()
  return <TimeLine articles={articles || []} />
  return <div style={{
    width: "92%",
    maxWidth: "800px",
    margin: "0 auto",
  }}>
    <h1>他人の好きなもの</h1>
    <div>
      {articles?.map((article)=> <Link href={`/${article.username}/${article.id}`}>
        <div>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
        </div>
      </Link>)}
    </div>
  </div>
}

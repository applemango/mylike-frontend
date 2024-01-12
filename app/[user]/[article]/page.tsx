import { req } from "@/lib/req"
import { parseMD } from "@/md/md"
import { MDRenderV2 } from "@/renderv2/renderv2"
import Link from "next/link"

const PageArticle = async ({ params }: {
    params: { user: string, article: number }
}) => {
    const article = (await req<{article: any}>(`/article/${params.article}`))?.article
    return <div>
        <h1>{article.title}</h1>
        <h2>{article.description}</h2>
        <MDRenderV2 md={article.body.split("\\n")} />
        <Link href="/">back</Link>
    </div>
}
export default PageArticle
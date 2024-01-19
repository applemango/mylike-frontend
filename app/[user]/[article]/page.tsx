import { req } from "@/lib/req"
import { parseMD } from "@/md/md"
import { MDRenderV2 } from "@/renderv2/renderv2"
import Link from "next/link"

const PageArticle = async ({ params }: {
    params: { user: string, article: number }
}) => {
    const article = (await req<{article: any}>(`/article/${params.article}`))?.article
    return <div style={{
        width: "80%",
        maxWidth: "800px",
        margin: "0 auto",
    }}>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <MDRenderV2 md={article.body.split("\n").reduce((acc: Array<string>, v: string)=> {
            acc = acc.concat(v.split("\\n"))
            return acc
        },[])} />
        <Link href="/">back</Link>
    </div>
}
export default PageArticle
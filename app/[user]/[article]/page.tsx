import { ArticleEditFormCore } from "@/components/edit"
import { ArticleComment, ArticleForm } from "@/components/form"
import { TimeLineBorderContainer, TimeLineContainer } from "@/components/timeline"
import { req } from "@/lib/req"
import { parseMD } from "@/md/md"
import { MDRenderV2 } from "@/renderv2/renderv2"
import Link from "next/link"

const PageArticle = async ({ params }: {
    params: { user: string, article: number }
}) => {
    const article = (await req<{article: any}>(`/article/${params.article}`))?.article
    return <TimeLineContainer>
        <TimeLineBorderContainer>
            <Link href="/" style={{
                color: "inherit",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 16
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="32" height="32" viewBox="0 0 24 24" stroke-width="1" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                    <path d="M5 12l6 6" />
                    <path d="M5 12l6 -6" />
                </svg>
                <p style={{
                    margin: 0,
                    cursor: "pointer",
                    width: "100%",
                    marginTop: 2
                }}>Home</p>
            </Link>
        </TimeLineBorderContainer>
        <TimeLineBorderContainer>
            <h1 style={{
                marginTop: 0
            }}>{article.title}</h1>
            <p>{article.description}</p>
            <MDRenderV2 md={article.body.split("\n").reduce((acc: Array<string>, v: string) => {
                acc = acc.concat(v.split("\\n"))
                return acc
            }, [])} />
        </TimeLineBorderContainer>
        <ArticleEditFormCore />
        {/*<TimeLineBorderContainer>
            <p style={{
                textAlign: "center",
                margin: 0,
                cursor: "pointer"
            }}>Comment</p>
        </TimeLineBorderContainer>*/}
        <TimeLineBorderContainer>
            <ArticleComment />
        </TimeLineBorderContainer>
    </TimeLineContainer>
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
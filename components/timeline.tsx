import { Article } from "@/lib/type"
import Link from "next/link"
import { ReactElement } from "react"
import { ArticleForm } from "./form"

export const TimeLine = ({ articles }:{
    articles: Array<Article>
}) => {
    return <div style={{
        width: "80%",
        maxWidth: "600px",
        margin: "0 auto",
        borderRight: "1px solid #eee",
        borderLeft: "1px solid #eee",
        minHeight: "100dvh"
    }}>
        <TimeLineBorderContainer>
            <ArticleForm />
        </TimeLineBorderContainer>
        <TimeLineBorderContainer>
            <p style={{
                textAlign: "center",
                margin: 0,
                cursor: "pointer"
            }}>Show {Math.floor(Math.random() * 1000)} articles</p>
        </TimeLineBorderContainer>
        {articles.map((article)=> <TimeLineBorderContainer>
            <ArticleSummary article={article} />
        </TimeLineBorderContainer>)}
    </div>
}

export const TimeLineBorderContainer = ({ children }:{
    children: ReactElement
}) => {
    return <div style={{
        borderBottom: "1px solid #eee",
        padding: "16px"
    }}>
        {children}
    </div>
}

export const ArticleSummary = ({ article }:{
    article: Article
}) => {
    return <div>
        <Link style={{
            textDecoration: "none",
            color: "inherit"
        }} href={`/${article.username}/${article.id}`}>
            <p>@{article.username}</p>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
        </Link>
    </div>
}
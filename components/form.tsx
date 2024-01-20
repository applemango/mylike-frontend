import { req } from "@/lib/req"
import { FormButton, Input, TextArea } from "./formTextarea"
import { ArticleEditFormCore } from "./edit"
import { Article } from "@/lib/type"

export const ArticleComment = ({article}:{
    article: Article
}) => {
    const createArticle = async (form: FormData) => {
        "use server"
        const res = await req(`/article/comment/${article.id}`, {
            method: "POST",
            body: {
                body: form.get("body"),
            }
        })
        return res
    }
    return <form action={createArticle}>
        <TextArea />
        <FormButton />
    </form>
}

export const ArticleForm = ({}) => {
    const createArticle = async (form: FormData) => {
        "use server"
        const res = await req("/article", {
            method: "POST",
            body: {
                title: form.get("title"),
                description: form.get("description"),
                body: form.get("body"),
            }
        })
        return res
    }
    return <form action={createArticle}>
        <Input fontSize={32} name="title" />
        <Input fontSize={24} name="description"/>
        <TextArea />
        <FormButton />
    </form>
}

export const ArticleEditForm = () => {
    const updateForm = async (form: FormData) => {
        "use server"
    }
    return <form action={updateForm}>
        <ArticleEditFormCore />
    </form>
}
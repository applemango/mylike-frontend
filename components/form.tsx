import { req } from "@/lib/req"
import { FormButton, Input, TextArea } from "./formTextarea"

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
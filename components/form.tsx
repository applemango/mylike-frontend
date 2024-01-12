import { req } from "@/lib/req"

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
        <label htmlFor="form-title">タイトル</label>
        <input id="form-title" name="title" type="text" placeholder="title" />
        <br />

        <label htmlFor="form-description">詳細</label>
        <input id="form-description" name="description" type="text" placeholder="description" />
        <br />

        <textarea placeholder="body" name="body" id="body" cols={30} rows={10} />
        <br />

        <button>投稿する</button>
    </form>
}
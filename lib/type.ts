export type Article = {
    id: number,
    user_id: number,
    product_id: number | null,
    title: string,
    description: string,
    body: string,
    created_at: string,
    updated_at: string,
    email: string,
    password: string,
    username: string,
    bio: string,
    icon_image: string | null,
    profile_image: string | null
}
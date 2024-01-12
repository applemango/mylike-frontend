export type ReqOptions = {
    isJSON?: boolean,
    isSSR?: boolean,
    ContentType?: string,
    method?: "GET" | "POST" | "DELETE",
    body?: object | void | null | any,
    baseUrl?: string
}

export const uStateReq = async <T>(url: string, fn?: (v: T | null)=> any, option?: ReqOptions): Promise<any> => {
    return fn ? fn(await req(url, option)) : await req(url, option)
}

export const req = async <T>(url: string, option?: ReqOptions): Promise<T | null>  => {
    const headerHeader = {
        "accept": "application/json, text/plain, */*",
        "accept-language": "ja,en-US;q=0.9,en;q=0.8,ja-JP;q=0.7",
        "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Content-type": option?.ContentType || (option?.isJSON === false ? "application/json" : "application/json"),
    }
    const header = {
        "headers": headerHeader,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": option?.body ? option?.isJSON === false ? option.body : JSON.stringify(option.body) : null,
        "method": option?.method || "GET",
        "credentials": "include"
    }
    const headerSSR = {
        "headers": headerHeader,
        "body": option?.body ? option?.isJSON === false ? option.body : JSON.stringify(option.body) : null,
        "method": option?.method || "GET",
    }
    try {
        const _res = await fetch(option?.baseUrl ? `${option.baseUrl}${url}` : `http://127.0.0.1:3000${url}`, option?.isSSR ? headerSSR : header)
        return await _res.json()
    } catch {
        return null
    }
}
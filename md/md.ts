export const parseMD = (md: string):string[] => {
    return md ? md.split("\n").map((s:string,i:number)=>s.slice(-1) == "\r" ? s.slice(0,-1) : s) : [""]
}
export type config = {
    title: string,
    url_title: string,
    date: string,
    tags: Array<string>,
    description: string,
    sort: number,
    index: boolean,
    show: boolean,
    public: boolean,
    image: string,
    render: "v1" | "v2",
    by: string
}
export const getConfigHelper = (md: Array<string>) => {
    const configs: any = {}
    if(md[0] !== "---" || md.indexOf("---", 1) === -1)
        return configs
    const lines = md.slice(1, md.indexOf("---", 1))
    lines.map((config)=> {
        const key = config.split(":")[0].trim()
        const value = config.split(":")[1].trim()
        if(!key || !value) return
        configs[key] = value
    })
    return configs
}
export const getConfig = (md: Array<string>): config => {
    if(!md || !md.length)
        return {
            title: "",
            url_title: "",
            description: "",
            date: "",
            tags: [],
            sort: -1,
            public: true,
            index: true,
            image: "",
            render: "v1",
            show: true,
            by: ""
        }
    const config = getConfigHelper(md)
    const Str = (name: string): string => config[name] ? config[name] : ""
    const Bool = (name: string): boolean => ["false", "0", "none", "nil", "null", "no", "!", "-"].includes(config[name]) ? false : true
    const Int = (name: string): number => isNaN(Number(config[name])) ? 0 : Number(config[name])
    const Arr = (name: string): Array<string> => config[name] ? config[name][0]=="[" && config[name][config[name].length - 1]=="]" ? config[name].slice(1, -1).split(",").map((s: string)=> s.trim()) : config[name].split(",").map((s: string)=> s.trim()) : []
    return {
        title: Str("title"),
        url_title: Str("url-title"),
        description: Str("description"),
        date: Str("date"),
        tags: Arr("tags"),
        sort: Int("sort"),
        index: Bool("index"),
        show: Bool("show"),
        public: Bool("public"),
        image: Str("image"),
        render: Str("render") == "v2" ? "v2" : "v1",
        by: Str("by") || "applemango"
    }
}
export const getMDConfig = (md: string) => {
    const MD = parseMD(md)
    return getConfig(MD)
}
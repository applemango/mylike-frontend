import { render_sub, render_code, render_json_, render_math, render_info, render_quiz, render_filetree, render_request, render_table, Render_htmlpreview, render_multiple_images } from "./render_"
import styles from "./components/styles/span_styles.module.scss"
import { getConfig, getMDConfig, parseMD } from "../md/md"

export function Md_render(d: any) {
    console.log(d.data)
    if(!d.data) { return <div></div> }
    const config = Array.isArray(d.data) ? getConfig(d.data) : getMDConfig(d.data)
    let name = config.title
    let date = config.date
    let tags = config.tags

    let result = [];
    const data = d.data
    //const data_array = data.split("\n")
    const data_array = Array.isArray(data) ? data : parseMD(data)
    
    const md_list = [
        "#","##","###","####","#####","######","#######"
    ]
    if(data_array[0] == "---") {
        const shift = () => {data_array.shift()}
        let s = 0
        shift()
        while(data_array[0] != "---" && data_array.length > 0 && s < 100000) {if(s != 0) shift();if(data_array[0] == "---") continue;s++}
        shift()
    }
    while (data_array.length) {
        let isShift = false;
        let isChange = false;
        const now = data_array[0]
        const md_f = now.slice(0,now.indexOf(" "))
        const md_f_data = now.slice(now.indexOf(" ")+1)
        const shift = () => {
            data_array.shift()
            isShift = true
            isChange = true
        }
        const getListSymbol = (start:string, end:string) => {
            if(now == start && data_array.includes(end) ) {
                let s = 0
                let r = []
                shift()
                while (data_array[1] != end && data_array.length > 0 && s < 100000) {
                    if (s != 0) shift()
                    if(data_array[0] == start) continue;
                    r.push(data_array[0])
                    s++
                }
                shift()
                shift()
                return r
            }
            return false
        }

        if(now == "//*" && data_array.includes("*//")) {
            const arr = getListSymbol("//*","*//")
        }

        if(now == "[form:post" && data_array.includes("]")) {
            const arr:any = getListSymbol("[form:post","]")
            result.push(render_request(
                arr[0].slice(5,-1),
                arr[1].slice(7),
                arr[2].slice(5),
                arr[3].slice(5),
                "post"
            ))
        }
        if(now == "[form:post-nobody" && data_array.includes("]")) {
            const arr:any = getListSymbol("[form:post-nobody","]")
            result.push(render_request(
                arr[0].slice(5,-1),
                arr[1].slice(7),
                arr[2].slice(5),
                arr[3].slice(5),
                "post-nobody"
            ))
        }
        if(now == "[form:delete" && data_array.includes("]")) {
            const arr:any = getListSymbol("[form:delete","]")
            result.push(render_request(
                arr[0].slice(5,-1),
                arr[1].slice(7),
                arr[2].slice(5),
                arr[3].slice(5),
                "delete"
            ))
        }
        
        if(now == "[form:get" && data_array.includes("]")) {
            const arr:any = getListSymbol("[form:get","]")
            result.push(render_request(
                arr[0].slice(5,-1),
                arr[1].slice(7),
                arr[2].slice(5),
                arr[3].slice(5),
                "get"
            ))
        }

        const htmlPre = () => {
            if (!(now == "[html" && data_array.includes("]")))
                return
            const arr = getListSymbol("[html","]")
            if(!arr)
                return
            let data = {
                data: [
                    "",
                    "",
                    "",
                    ""
                ],
                type: [
                    "```body",
                    "```head",
                    "```style",
                    "```config"
                ]
            }
            let type = -1
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === "```") {
                    type = -1
                    continue
                }
                if (data.type.includes(arr[i])) {
                    type = data.type.indexOf(arr[i])
                    continue
                }
                if (type === -1)
                    continue
                data.data[type] += arr[i]
            }
            result.push(Render_htmlpreview(data.data[0], data.data[2], data.data[1], data.data[3]))
        }
        htmlPre()

        const multiple_images = () => {
            if (now == "[multiple_images" && data_array.includes("]")) {
                const arr = getListSymbol("[multiple_images","]")
                if(!Array.isArray(arr)) {
                    return
                }
                let data = ""
                arr.map((line: string, index: number) => {
                    data += line.replaceAll(" ","")
                })
                try {
                    data = JSON.parse(`[${data.slice(1, -1)}]`)
                } catch (e) {
                    return
                }
                result.push(render_multiple_images(data))
            }
        }
        multiple_images()

        const file = () => {
            if(now == "[file" && data_array.includes("]")) {
                const arr = getListSymbol("[file","]")
                let data = ""
                if(!Array.isArray(arr)) {
                    return
                }
                arr.map((line: string, index: number) => {
                    data += line.replaceAll(" ","")
                })
                try {
                    data = JSON.parse(data)
                } catch (e) {
                    return
                }
                result.push(render_filetree(data))
            }
        }
        file()

        const table = () => {
            if(now == "[table" && data_array.includes("]")) {
                const arr = getListSymbol("[table","]")
                let data = ""
                if(!Array.isArray(arr)) {
                    return
                }
                arr.map((line: string, index: number) => {
                    data += line.replaceAll(" ","")
                })
                try {
                    data = JSON.parse(data)
                } catch (e) {
                    return
                }
                result.push(render_table(data))
            }
        }
        table()

        if ((now == "[quiz:1" || now == "[quiz:2") && data_array.includes("]")) {
            const type = now.replace("[","").split(":")
            let list;
            if (now == "[quiz:1") list = getListSymbol("[quiz:1","]")
            if (now == "[quiz:2") list = getListSymbol("[quiz:2","]")
            if(Array.isArray(list)) {
                let trues:string = ""
                let question:string = ""
                let data: string[] = []
                list.forEach(s => {
                    if(s.indexOf("true=") + 1) {
                        const t = s.slice(s.indexOf("true=") + 5)
                        trues = t
                    } else if (s.indexOf("question=") + 1) {
                        const q = s.slice(s.indexOf("question=") + 9)
                        question = q
                    } else {
                        data.push(s)
                    }
                });
                result.push(render_quiz(question, Number(type[1]), data, trues))
            }
            //console.log(type)
            //console.log(list)
        }
        /*if(now == "---") {
            let s = 0
            data_array.shift()
            while(data_array[0] != "---" && data_array.length > 0 && s < 100000) {
                if(s != 0) shift()
                if(data_array[0] == "---") continue;
                //const config = [data_array[0].slice(0,data_array[0].indexOf(":")), data_array[0].slice(data_array[0].indexOf(":") + 1)]
                //switch (config[0]) {
                //    case "title":
                //        name = config[1]
                //        break;
                //    case "date":
                //        date = config[1]
                //        break;
                //    case "tags":
                //        tags = config[1].replaceAll("[","").replaceAll("]","").split(",")
                //    case "description":
                //    default:
                //}
                s++
            }
            shift()
        }*/
        
        if(!now || now == "") {
            result.push(<div className = { styles.br }/>)
            shift()
            continue;
        }

        if (md_list.includes(md_f)) {
            if(["#","##","###","####","#####","######","#######"].includes(md_f)) {
                result.push(render_sub(md_f,md_f_data))
            }
            shift()
            continue;
        }
        
        if ((now == "[") && (data_array.includes("]"))) {
            let t = [];
            let n = false;
            let s = 0;
            data_array.shift()
            while ((data_array[0] != "]") || n && !(s < 100000)) {
                if(data_array[0] && data_array[0].slice(0,3) == "```") {
                    n = !n
                }
                t.push(data_array[0])
                data_array.shift()
                s++
            }
            result.push(render_code(t))
            shift()
            continue;
        }

        if(md_f[0] == "{" && md_f[md_f.length - 1] == "}") {
            try {
                const json = JSON.parse(md_f)
                const res = render_json_(json, md_f_data, config)
                if(res) {
                    result.push(res)
                    shift()
                    continue;
                }
            } catch (e) {
            }
        }

        if((now == "```math") && (data_array.includes("```"))) {
            let t = ""
            let s = 0;
            data_array.shift()
            while ((data_array[0] != "```") || !(s < 100000)) {
                t = t+data_array[0]
                data_array.shift()
                s++
            }
            result.push(render_math(t))
            shift()
            continue;
        }

        if(now.slice(0,3) == ":::") {
            let t = [];
            let n = false;
            let s = 0;
            let b = false;
            let type = now.slice(3)
            data_array.shift()
            while ((data_array[0] != ":::") || n && !(s < 100000)) {
                if(data_array.length < 1) {b = true;break}
                t.push(data_array[0])
                data_array.shift()
                s++
            }
            if(b) {
                break
            }
            result.push(render_info(t, type))
            shift()
            continue;
        }

        if (!isChange && !isShift) {
            result.push(<p className = { styles.p }>{now}</p>)
            data_array.shift()
        }
        //if (!isShift) {data_array.shift()}
    }

    //console.log(data_array)
    return (
        <div>
            {/*[result]*/}
            { result.length > 0 && result.map((r:any,i:number) => (
                <div key={i}>
                    {r}
                </div>
            ))}
        </div>
    )
}
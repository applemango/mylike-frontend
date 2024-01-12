import Code from "./components/code"
import Colors from "./components/colors"
import Info from "./components/info"
import styles from "./components/styles/span_styles.module.scss"

import Link from "next/link"
import Image from "next/image"

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import Warning from "./components/warning"
import Quiz from "./components/quiz"
import CodeDiff from "./components/codediff"
import FileTree from "./components/filetree"
//import Request from "./components/request"
import Url from "./components/url"
import PageLink from "./components/link"
import Table from "./components/table"
import { useRouter } from "next/router"
import HtmlPreview from "./components/htmlpreview"
import MultipleImages from "./components/multipleImages"

export function render_sub(type: string, data:any) {
    if(type == "#") {
        return <h1 id={data} className = { styles.h1 }>{render_text(data)}</h1>
    }
    if(type == "##") {
        return <h2 id={data} className = { styles.h2 }>{render_text(data)}</h2>
    }
    if(type == "###") {
        return <h3 id={data} className = { styles.h3 }>{render_text(data)}</h3>
    }
    if(type == "####") {
        return <h4 id={data} className = { styles.h4 }>{render_text(data)}</h4>
    }
    if(type == "#####") {
        return <h5 id={data} className = { styles.h5 }>{render_text(data)}</h5>
    }
    if(type == "######") {
        return <h6 id={data} className = { styles.h6 }>{render_text(data)}</h6>
    }
    if(type == "#######") {
        return <p className = { styles.p }>{render_text(data)}</p>
    }
}

export function render_json_(type:any, data:string,info?:any) {
    try {
        if(type.type == "link" && type.link) {
            return <PageLink link={type.link} data={data} />
        }
        if(type.type == "link_h1" && type.link) {
            return <h1 className = { styles.h1 }><Link legacyBehavior href = {type.link }><a className={styles.link}>{data}</a></Link></h1>
        }
        if(type.type == "link_next" && type.link) {
            return <div className={styles.link_next}>
                <Link legacyBehavior href={type.link}>
                    <a>{data}</a>
                </Link>
            </div>
        }
        if(type.type == "url" && type.url) {
            return <Url url={type.url} data={data} follow={type.follow} />
        }
        if(type.type == "back") {
            return <Link legacyBehavior href="/"><a className = {styles.link_back}>back</a></Link>
        }
        if(type.type == "info") {
            return <Info info={info} />
        }
        if(type.type == "image" && type.link) {
            return  <div className={styles.imageContainer}>
                <Image src={type.link} alt={type.alt} layout="fill" objectFit="contain" />
            </div>
            //return  <Image src={type.link} width = {type.size[0]} height = {type.size[1]} />
        }
        if(type.type == "color" && type.color) {
            return  <Colors colors={type.color} />
        }
        if(type.type == "br" && data) {
            return <div style={{height:Number(data)}} className={styles.br} />
        }
    } catch (e) {
        return false
    }
}

export function render_text(data:string, special?:boolean, test?:any):any {
    const l = [ "*", "_", "`", "~", "$"]
    for (let i = 0; i < data.length; i++) {
        if (l.includes(data[i])) {
            const first = data.indexOf(data[i])
            const second = data.indexOf(data[i],data.indexOf(data[i])+1)
            const start = data.slice(0,first)
            const word = data.slice(first+1,second)
            const end = data.slice(second+1)
            const isSpecial = data[i] == "`" || data[i] == "*" ? true : false
            if(first == second) {continue;}
            if(test == data ) {return data}
            if(special) {return (data)}
            if(data[i] == "`") {
                return (<>{start}<span className = { styles.code }><code>{render_text(word, isSpecial, data)}</code></span>{render_text(end, false, data)}</>)
            }
            if(data[i] == "*") {
                return (<>{start}<span className = { styles.code_font }><code>{render_text(word, isSpecial, data)}</code></span>{render_text(end, false, data)}</>)
            }
            if(data[i] == "_") {
                return (<>{start}<span className = { styles.underline }>{render_text(word, isSpecial, data)}</span>{render_text(end, false, data)}</>)
            }
            if(data[i] == "~") {
                return (<>{start}<span className = { styles.delete }>{render_text(word, isSpecial, data)}</span>{render_text(end, false, data)}</>)
            }
            if(data[i] == "$") {
                return (<>{start}<InlineMath>{word}</InlineMath>{render_text(end, false, data)}</>)
            }
        }
    }
    return data
}

export function render_code(data: Array<string>) {
    let lang:any = []
    let code:any = []
    let name:any = []
    let json:any = []
    for (let i = 0; i < data.length; i++) {
        if(data[i].indexOf("```") == 0) {
            if(data[i] == "```\r") {
                code[lang.length - 1].slice(0, -1)
            } else {
                const d = (data[i].split("```")[1].replace("\r","").split(":").length>2) ?
                        [data[i].split("```")[1].replace("\r","")
                            .slice(0,data[i].indexOf(":")-3),
                            data[i].split("```")[1].replace("\r","")
                            .slice(data[i].indexOf(":")-2)
                        ]:data[i].split("```")[1].replace("\r","").split(":")
                // "```js:test" => "js:test" => ["js","test"]
                try {
                    const j = JSON.parse(d[1])
                    json.push(j)
                    name.push(j.name)
                    lang.push(d[0])

                } catch (e) {
                    lang.push(d[0])
                    name.push(d[1])
                    json.push(undefined)
                }
                if(!d[1]) {
                    name[name.length - 1] = d[0]
                }
            }
        } else {
            let a;
            if(code[lang.length - 1] == undefined) {
                a = ""
            } else {
                a = code[lang.length - 1] + "\n"
            }
            code[lang.length - 1] = a + data[i].replace("\r","")
        }
    }
    //console.log(lang,code)

    if(code.length == 1 && (json[0] && json[0].type=="diff")) {
        return (
            <CodeDiff 
                name={name[0]}
                lang={lang[0]}
                code={code[0]}
                start={json[0]?json[0].start:null}/>
        )
    }

    if(code.length == 1) {
        return (
            <Code
                name = {name[0]}
                lang  = {lang[0]}>
                {code[0]}
            </Code>
        )
    }
    return (
        <Code
            name = {name}
            lang  = {lang}>
            {code}
        </Code>
    )
}

export function render_math(data: string) {
    return <BlockMath math={data}/>
}

export function render_info(data: Array<string>, type: string) {
    return <Warning data={data} type={type}/>
}

export function render_quiz(question: string, type: number, data: string[], trues: string) {
    return <Quiz question={question} type={type} data={data} trues={trues}/>
}

export function render_filetree(data: string) {
    return <FileTree data={data} />
}

export function render_table(data: any) {
    return <Table data={data} />
}

export function render_request(url: string, header: string, body: string, form: string, type: string) {
    return <div></div>
    //return <Request type={type} url={url} header={header} body={body} form={form} />
}

export function Render_htmlpreview(body: string, style: string, head: string, config: string) {
    return <HtmlPreview body={body} style={style} head={head} config={config} />
}

export function render_multiple_images(data: any) {
    return <MultipleImages data={data} />
}

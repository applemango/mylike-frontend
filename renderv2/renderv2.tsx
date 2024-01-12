/*
 * MarkDown Syntax Render
 *
 * **bold**
 * *italic*
 * ~~strikethrough~~
 * ==highlight==
 * $math$
 * `code`
 * `` code in ` ``
 * ``` code in `` ```
 * x+1` code in x` x+1`
 *
 * - list
 *   - list
 *   - list
 * - list
 *
 * 1. list
 * 2. list
 * 3. list
 * 
 * 1. list
 * 2. list
 *   - list
 *   - list
 * 3. list
 *
 * [link](https://)
 * ![image](https://)
 * *caption*
 * [![image](https://)](https://)
 *
 * # title h1 //下に線あり
 * ## title h2 //あり
 * ### title h3 //なし
 * #### title h4　//なし
 * ##### title h5 //なし
 * ###### title h6 //なし
 *
 * ```javascript:not javascript
 * console.log("javascript")
 * ```
 * 
 * ```diff js:not javascript
 * +console.log("diff")
 * ```
 * 
 * ```web diff js:not javascript
 * +console.log("diff")
 * ```
 *
 * | Head | Head | Head |
 * | ---- | ---- | ---- |
 * | Text | Text | Text |
 * | Text | Text | Text |
 * 
 * $$
 * x^2+2x*x=0
 * $$
 * 
 * > example quote
 * >
 * 
 * > [!info]
 * 
 * > [!tips]
 * 
 * > [!tips]
 * > > [!tips]
 * > > ![Hello, world!]()
 * 
 * -----
 * 
 * books[^1]
 * [^1]: https://books.google.com/
 * 
 * ````
 * ````
 */
type style = {
    readonly [key: string]: string;
}
let s: {
    text: style,
    main: style,
} = {
    text: {},
    main: {},
}

import Image from "next/image";
import stylesText from "./text.module.scss"
import stylesMain from "./main.module.scss"
import Link from "next/link";
import { InlineMath, BlockMath } from 'react-katex';
import { lazy } from "react";
import CodeDiff from "../render/components/codediff";
import 'katex/dist/katex.min.css';
import Table from "../render/components/table";
import Url from "../render/components/url";
import { Md_render } from "../render/render";
import { getConfig } from "../md/md";
s.text = stylesText
s.main = stylesMain

const symbols = "*~=$`"
const specialSymbols = [
    "**",
    "*",
    "~~",
    "==",
    "$",
]
const specialTextClassNames: any = {
    "**": "bold",
    "*": "italic",
    "~~": "underline",
    "==": "highlight",
    "$": "math"
}

const multilineSymbolsEndFunction: {readonly [key: string]: (line: string, after: string, before: string) => boolean} = {
    "````": (line, after, before) => line === "````",
    "```": (line, after, before) => line === "```",
    ">":  (line, after, before) => !after ? true : after.trim()[0] != ">",
    "|": (line, after, before) => !after ? true : after.trim()[0] != "|",
    "$$": (line, after, before) => line === "$$",
    "---": (line, after, before) => line === "---",
}

const multilineSymbols = [
    "````",
    "```",
    ">",
    "|",
    "$$",
    "---"
]

export const MDRenderV2 = ({md}:{md: Array<string>}) => {
    const Main = ({md}:{md: Array<string>}) => {
        const config = getConfig(md)
        const ele = [];
        for (let i = 0; i < md.length; i++) {
            const line = md[i]
            const [isMulti, multilineSymbol] = isMultiline(line)
            if (isMulti) {
                const multi = multiLineHelper(md, i, (line, after, before) => multilineSymbolsEndFunction[multilineSymbol](line, after, before), (i_)=> i = i_)
                ele.push(<MDMultiLine md={multi} symbol={multilineSymbol}/>)
                continue
            }
            ele.push(<MDSingleLine line={line} />)
        }
        return <div>
            {ele.map((ele, i) => <div key={i}>{ele}</div>)}
        </div>
    }
    if(!md?.length)
        return <div />
    try {
        return <Main md={removeConfig(md)} />
    } catch(e) {
        console.error(e)
        return <div>Error</div>
    }
}

const removeConfig = (md: Array<string>) => {
    if(md[0]!=="---" || md.indexOf("---", 1) == -1)
        return md
    const end = md.indexOf("---", 1)
    return md.slice(end + 1)
}

const multiLineHelper = (md: Array<string>, i: number, isEnd: (line: string, after: string, before: string) => boolean, setI: (i_: number)=> void = (i_)=> {}) => {
    let lines = [md[i]];
    const j = i
    for (i++; i < md.length; i++) {
        lines.push(md[i])
        if (isEnd(md[i], md[i + 1], md[i - 1])) {
            setI(i)
            return lines
        }
    }
    i = j
    return []
}

const multilineSymbolsRenderFunction: {readonly [key: string]: (md: Array<string>) => JSX.Element} = {
    "---": (md)=> {
        return <></>
    },
    "````": (md) => {
        md.shift()
        md.pop()
        console.log(md)
        return <Md_render data={md} />
    },
    "```": (md) => {
        const getCodeOptions = (arr: Array<string>) => {
            const types = ["diff"]
            type config = {
                lang: string | null,
                isDiff: boolean,
                isWeb: boolean,
                options: Array<string>
            }
            const config: config = {
                lang: null,
                isDiff: false,
                isWeb: false,
                options: []
            }
            arr.map(str => {
                if(types.includes(str))
                    config.options.push(str)
                else
                    config.lang = str
            })
            config.isDiff = config.options.includes("diff")
            config.isWeb = config.options.includes("web")
            return config
        }
        const code = md.concat()
        code.shift()
        code.pop()
        const head = md[0]
        const comment = head.includes(":") ? head.split(":")[1] : ""
        const optionStr = head.includes(":") ? head.split(":")[0].slice(3) : head.slice(3)
        const optionArray = optionStr.split(" ")
        const options = getCodeOptions(optionArray)
        return <div>
            <CodeDiff
                lang={options.lang || ""}
                code={code}
                start={0}
            />
        </div>
    },
    ">": (md) => {
        const m = md.map(line=> line.slice(0, 2) == "> " ? line.slice(line.indexOf(" ") + 1) : line.slice(1))
        const noteTypes = [
            "[!note]"
        ]
        if (noteTypes.includes(m[0].split(" ")[0])) {
            m.shift()
            return <div style={{
                backgroundColor: "#3291ff50",
                padding: 8,
                borderRadius: 4,
            }}>
                <MDRenderV2 md={m} />
            </div>
        }
        return <blockquote style={{
            margin: 0,
            borderLeft: '4px solid #000',
            paddingLeft: 6
        }}>
            <MDRenderV2 md={m} />
        </blockquote>
    },
    "|": (md) => {
        const parseTableLine = (line: string) => {
            const t = line.split("|")
            t.pop()
            t.shift()
            return t
        }
        const parseTable = (md: Array<string>) => {
            const data: {
                columns:string[],
                rows: Object[]
            } = {
                columns: parseTableLine(md[0]),
                rows: []
            }
            md.filter((_, i) => i > 1).map((row, i)=> {
                const rows = parseTableLine(row)
                let obj: any = {}
                for (let j = 0; j < data.columns.length; j++) {
                    obj[data.columns[j]] = rows[j]
                }
                data.rows.push(obj)
            })
            return data
        }
        return <div>
            <Table data={parseTable(md)} />
        </div>
    },
    "$$": (md) => {
        let math = "";
        md.pop()
        md.shift()
        md.map(m => math += m)
        return <BlockMath math={math}/>
    }
}

export const MDMultiLine = ({md, symbol}:{
    md: Array<string>,
    symbol: string,
}) => {
    console.log(md, symbol)
    return <div>
        {multilineSymbolsRenderFunction[symbol](md)}
    </div>
}

const singleLineSymbols: {readonly [key: string]: Function} = {
    "#": (x: any)=> <h1>{x}</h1>,
    "##": (x: any)=> <h2>{x}</h2>,
    "###": (x: any)=> <h3>{x}</h3>,
    "####": (x: any)=> <h4>{x}</h4>,
    "#####": (x: any)=> <h5>{x}</h5>,
    "######": (x: any)=> <h6>{x}</h6>,
}
export const MDSingleLine = ({line}:{
    line: string
}) => {
    const t = line.trim()
    if (isList(t)) {
        return <List line={line} />
    }
    const symbol = line.split(" ", 2)[0]
    if(Object.keys(singleLineSymbols).includes(symbol)) {
        const x = line.split(" ", 2)[1]
        const body = line.slice(line.indexOf(" "))
        return singleLineSymbols[symbol](<Text text={body} />)
    }
    if(isLink(line)) {
        return <Link_ line={line} />
    }
    if(isImage(line)) {
        return <Image_ line={line} />
    }
    if(!line)
        return <br />
    if(isTextLink(line))
        return <Url url={line} data={line} follow={false} />
    return <div><Text text={line} /></div>
}

const isTextLink = (line: string): boolean => {
    const regexp = /^https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+$/
    return regexp.test(line)
}

const Link_ = ({line}:{line: string}) => {
    //[link](/)
    //[![image](/images/blog/shooting-star.jpg)](https://google.com/)
    const text = line.includes(")](") ? line.split(")](")[0].slice(1) + ")" : line.split("](")[0].slice(1)
    const url = line.includes(")](") ? line.split(")](")[1].slice(0, -1) : line.split("](")[1].slice(0, -1)
    console.log()
    return <div>
        <Link href={url}>
            {line.includes(")](") ? <Image_ line={text} /> : <Text style={{textDecoration: "underline"}} text={text} />}
        </Link>
    </div>
}
const Image_ = ({line}:{line: string}) => {
    //![image](/images/blog/nasa-hj8.jpg)
    const src = line.split("](")[1].slice(0, -1)
    const alt = line.split("](")[0].slice(2)
    return <div className={s.main.image}>
        <Image src={src} alt={alt} layout="fill" objectFit="contain" />
    </div>
}

const List = ({line}:{line: string}) => {
    const t = line.trim()
    const body = t.slice(t.indexOf(" ")+1)
    const margin = () => {
        let i = line.indexOf("-")
        return i
    }
    const marginOl = (l?: string, i: number = 0): any => {
        if(!l) return marginOl(line)
        if(l[i] != " ")
            return i
        return marginOl(l.slice(1), i + 1)
    }
    if(isOlList(t))  {
        const num = t.split(".", 2)[0]
        return <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginLeft: 10 * marginOl()
        }}>
            <p style={{
                margin: 0
            }}>{num}</p>
            <Text text={body} />
        </div>
    }
    return <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginLeft: 10 * margin()
    }}>
        <div style={{
            width: 6,
            height: 6,
            borderRadius: "100%",
            backgroundColor: "#000",
        }} />
        <Text text={body} />
    </div>
}

const isLink = (line: string) => {
    if(line[0]=="[" && line.includes("](") && line[line.length-1]==")")
        return true
    return false
}
const isImage = (line: string) => {
    if(line.slice(0,2)=="![" && line.includes("](") && line[line.length-1]==")")
        return true
    return false

}

const isMultiline = (text: string): [boolean, string] => {
    const t = text.replaceAll(" ","")
    for (let i = 0; i < multilineSymbols.length; i++) {
        const symbol = multilineSymbols[i]
        if (
            t.length >= symbol.length &&
            t.slice(0, symbol.length) === symbol
        ) {
            return [true, symbol]
        }
    }
    return [false, ""];
}
const isList = (text: string) => {
    const t = text.trim()
    if(t.split(" ", 2)[0] == "-")
        return true
    if(isOlList(t))
        return true
    return false
}

const isOlList = (text: string) => {
    if(!text.includes("."))
        return false
    const index = text.indexOf(".")
    if (text[index + 1] != " ")
        return false
    const num = text.split(".", 2)[0]
    if (Number.isNaN(Number(num)))
        return false
    return true
}


export const Text = ({text, style}:{text: string, style?: React.CSSProperties}) => {
    return <p style={Object.assign({
        margin: 0
    }, style)}>
        <SpecialText line={text} />
    </p>
}
export const SpecialText = ({line, s}:{line: string, s?: string | undefined}) => {
    let first = ""
    let symbol = "";
    for (let i = 0; i < line.length; i++) {
        const continues = symbol ? line[i] === symbol[0] : true
        const isBackslashAndSymbol =  !s?.includes("`") || s?.length < symbol.length
        const isBackslash = s?.includes("`")
        if (isSpecialSymbol(line[i]) && continues) {
            symbol = symbol + line[i]
        } else if (symbol && isBackslashAndSymbol && !isBackslash) {
            const symbolPosition = line.indexOf(symbol, i)
            const head = first
            const body = line.slice(line.indexOf(symbol), symbolPosition)
            const foot = line.slice(symbolPosition)
            const h = head
            const b = body.slice(symbol.length)
            const f = foot.slice(symbol.length)
            return <>
                {h}
                <SpecialTextHelper symbol={symbol} line={b} />
                <SpecialText line={f} />
            </>
        } else {
            first += line[i]
        }
    }
    return <>{line}</>
}
const isSpecialSymbol = (char: string) => symbols.includes(char)
const SpecialTextHelper = ({symbol, line}:{
    symbol: string,
    line: string
}) => {
    return <span className={symbol.includes("`") ? s.text.code : s.text[specialTextClassNames[symbol]]}>
        <SpecialText s={symbol} line={line} />
    </span>
}
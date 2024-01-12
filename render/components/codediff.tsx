"use client"
import { ReactNode, useEffect, useRef, useState } from 'react'
import styles from "./styles/code.module.scss"
type Props = {
    lang : string
    ,code : string | Array<string>
    ,name? : null
    ,start?: number
}
const deletePlusMinus = (text:string) => {
    return ["+","-"].indexOf(text[0])+1? text.slice(1) : text
}
const plusMinus = (text:string) => {
    return ["+","-"].indexOf(text[0])+1? text[0] : " "
}

const  CodeDiff = ({lang, code, name = null, start }:Props) => {
    //console.log(code.split("\n"))
    return <CodeDiffV2 lang={lang} code={code} name={name} start={start} />
    /*return <div className={styles.codeDiff}>
        { code && code.split("\n").map((line:string,i:number) => (
            <div key={i} className={styles.codeDiff_line}>
                <div className={styles.codeDiff_data}>
                    <div className={`${styles.codeDiff_length} ${plusMinus(line)=="+"?styles.puls2:plusMinus(line)=="-"?styles.minus2:""}`}>
                        <p>{i+1 + (Number(start)>0?Number(start):0)}</p>
                    </div>
                    <div className={`${styles.codeDiff_puls_minus} ${plusMinus(line)=="+"?styles.puls:plusMinus(line)=="-"?styles.minus:""}`}>
                        <p>{plusMinus(line)}</p>
                    </div>
                </div>
                <div className={`${styles.codeDiff_code}`}>
                    <pre className={`${plusMinus(line)=="+"?styles.puls:plusMinus(line)=="-"?styles.minus:""}`}>
                        <code>
                            {deletePlusMinus(line)}
                        </code>
                    </pre>
                </div>
            </div>
        ))}
    </div>*/
}

const CodeDiffV2 = ({lang, code, name = null, start}: Props) => {
    const [isWidth, setIsWidth] = useState(false)
    const ref = useRef<any>(null)
    const refs = useRef<any>(null)
    useEffect(() => {
        if (!ref || !ref.current || !refs || !refs.current)
            return
        if (ref.current.offsetWidth + 44 < refs.current.offsetWidth) {
            setIsWidth(true)
        }
    },[])
    const lines = code ? Array.isArray(code) ? code :  code.split("\n") : []
    return <div ref={refs} className={styles.codeDiff}>
        <div>
            {lines.map((line: string, i: number) => (
                <div key={i} className={styles.codeDiff_line}>
                    <div className={styles.codeDiff_data}>
                        <div style={{
                            width: lines.length.toString().length * 7.815 + 22.185
                        }} className={`${styles.codeDiff_length} ${plusMinus(line)=="+"?styles.puls2:plusMinus(line)=="-"?styles.minus2:""}`}>
                            <p>{i+1 + (Number(start)>0?Number(start):0)}</p>
                        </div>
                        <div className={`${styles.codeDiff_puls_minus} ${plusMinus(line)=="+"?styles.puls:plusMinus(line)=="-"?styles.minus:""}`}>
                            <p>{plusMinus(line)}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div style={isWidth ? {width: "100%"}:{}} ref={ref}>
            {lines.map((line: string, i: number) => (
                <div key={i} className={styles.codeDiff_line}>
                    <div className={`${styles.codeDiff_code}`}>
                        <pre className={`${plusMinus(line)=="+"?styles.puls:plusMinus(line)=="-"?styles.minus:""}`}>
                            <code className = { lang }>
                                {deletePlusMinus(line) || "\n"}
                            </code>
                        </pre>
                    </div>
                </div>
            ))}
        </div>
    </div>
}
export default CodeDiff
"use client"
import { useEffect, useRef, useState } from "react"
import styles from "./styles/quiz.module.scss"
import { suggestDataMain } from "./suggestData"
const Quiz = ({
    question
    ,type
    ,data
    ,trues
}: {
    question: string
    type: number
    data: string[]
    trues: string
}) => {
    const [nowSelected, setNowSelected] = useState(-1)
    const [nowInput, setNowInput] = useState("")
    const [suggestInput, setSuggestInput] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const ref = useRef<any>(null)
    //const addText = (position:number, text:string, str: string) => {
    //    const r = text.slice(0,position) + str + text.slice(position)
    //    //ref.current.focus()
    //    //ref.current.setSelectionRange(position,position)
    //    console.log(position)
    //    return r
    //}
    const getLastSymbolPosition = (text:string) => {
        return Math.max(text.lastIndexOf("@"), text.lastIndexOf(":"), text.lastIndexOf("."), text.lastIndexOf('"'), text.lastIndexOf("'"), text.lastIndexOf("("), text.lastIndexOf(")"), 0)
    }
    const getLastSymbolText = (text:string) => {
        return text.slice(getLastSymbolPosition(text))
    }
    const setLastSymbol = (text:string, str:string) => {
        return text.slice(0,getLastSymbolPosition(text)) + str
    }
    const suggestIf = (text:string, str:string, type:string) => {
        if(type == "function") {
            return str.indexOf(getLastSymbolText(text)) + 1 || ("." + str).indexOf(getLastSymbolText(text)) + 1
        } else if(type == "variable") {
            return str.indexOf(getLastSymbolText(text)) + 1
        } else if(type == "decorator") {
            return str.indexOf(getLastSymbolText(text)) + 1 || ("@" + str).indexOf(getLastSymbolText(text)) + 1
        } else if(type == "string") {
            return (text[getLastSymbolPosition(text)]=='"' || text[getLastSymbolPosition(text)] == "'") && str.indexOf(getLastSymbolText(text).slice(1)) + 1
        }
        return false
    }
    const suggestAddIf = (text:string, str:string, type:string) => {
        if(type == "function") {
            return str.indexOf(getLastSymbolText(text)) + 1 ? str : ("." + str)
        } else if(type  == "variable") {
            return str
        } else if(type == "decorator") {
            return str.indexOf(getLastSymbolText(text)) + 1 ? str : ("@" + str)
        } else if(type == "string") {
            return `${text[getLastSymbolPosition(text)]}${str}${text[getLastSymbolPosition(text)]}`
        }
        return str
    }
    /*useEffect(() => {
        console.log(getLastSymbolPosition(nowInput))
    })*/
    return <div className={styles.main}>
        <p className={styles.question}>{question}</p>
        { type == 1 && (
            <div>
                <div className={styles.selectors}>
                    {data.map((item: string, i:number) => (
                        <button onClick={() => {
                            if(isSubmitted) return
                            setNowSelected(i)
                        }} className={`${styles.selector} ${(isSubmitted && i == data.indexOf(trues) ) ? styles.nice : i == nowSelected ? styles.active : nowSelected != 0 ? styles.notActive: ""}`} key={i}>
                            <p>{item}</p>
                        </button>
                    ))}
                </div>
                { !isSubmitted ? (
                    <button onClick={() => {
                        setIsSubmitted(true)
                    }} className={styles.submit}>submit</button>
                ):(
                    data[nowSelected] == data[data.indexOf(trues)] ? (
                        <div className={styles.result}>
                            <p className={styles.good}> Correct. Good job!</p>
                        </div>
                    ): (
                        <div className={styles.result}>
                            <p className={styles.bad}> Incorrect, but nice try!</p>
                        </div>
                    )
                )}
            </div>
        )}
        { type == 2 && (
            <div>
                <div className={styles.selectBox}>
                    <input ref={ref} value={nowInput} disabled={isSubmitted} onKeyDown={(e) => {
                        //const p = ref.current.selectionStart
                        //if (e.key.length == 1) {
                        //    //setSuggestInput((value) => value + e.key)
                        //    //setNowInput((value) => value + e.key)
                        //    setNowInput((value) => addText(ref.current.selectionStart, value, e.key))
                        //} else if (e.key == "Backspace") {
                        //    //setSuggestInput((value) => value.slice(0,-1))
                        //    //setNowInput((value) => value.slice(0,-1))
                        //}
                        //console.log(ref.current.selectionStart)
                        //e.preventDefault();
                        //ref.current.focus()
                        //ref.current.setSelectionRange(p,p)
                    }} onChange={(e) => {
                        //console.log(nowInput)
                        setNowInput(e.target.value)
                    } }className={styles.input} type="text" />
                    { !isSubmitted &&
                        <div className={styles.suggester}>
                            { suggestDataMain().map((item: {name:string,type:string}, i:number) => {
                                if (suggestIf(nowInput, item.name, item.type)/*item.name.indexOf(getLastSymbolText(nowInput)) + 1*//*item.name.indexOf(nowInput) + 1*/ /*|| data.indexOf(nowInput) + 1*/) {
                                    return (
                                        <button key={i} onClick={() => {
                                            //setNowInput((value) => setLastSymbol(value, item.name))
                                            setNowInput((value) => setLastSymbol(value,suggestAddIf(value, item.name, item.type)))
                                        }} className={styles.suggest}>
                                            <div className={styles.icon}>
                                                { (item.type == "function" || item.type == "decorator") &&
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-box" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="#6f32be" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                        <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
                                                        <line x1="12" y1="12" x2="20" y2="7.5" />
                                                        <line x1="12" y1="12" x2="12" y2="21" />
                                                        <line x1="12" y1="12" x2="4" y2="7.5" />
                                                    </svg>
                                                }
                                                { item.type == "variable" &&
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-variable" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="#00abfb" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                        <path d="M5 4c-2.5 5 -2.5 10 0 16m14 -16c2.5 5 2.5 10 0 16m-10 -11h1c1 0 1 1 2.016 3.527c.984 2.473 .984 3.473 1.984 3.473h1" />
                                                        <path d="M8 16c1.5 0 3 -2 4 -3.5s2.5 -3.5 4 -3.5" />
                                                    </svg>
                                                }
                                                { item.type == "string" &&
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-language" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="#597e8d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                        <path d="M4 5h7" />
                                                        <path d="M9 3v2c0 4.418 -2.239 8 -5 8" />
                                                        <path d="M5 9c-.003 2.144 2.952 3.908 6.7 4" />
                                                        <path d="M12 20l4 -9l4 9" />
                                                        <path d="M19.1 18h-6.2" />
                                                    </svg>
                                                }
                                            </div>
                                            <div>
                                                <p>{item.name}</p>
                                            </div>
                                        </button>
                                    )
                                }
                                return (<div key={i}></div>)
                            })}
                        </div>
                    }
                </div>
                { !isSubmitted ? (
                    <button onClick={() => {
                        setNowInput((value) => value.replaceAll("'",'"'))
                        setIsSubmitted(true)
                    }} className={styles.submit}>submit</button>
                ):(
                    trues == nowInput ? (
                        <div className={styles.result}>
                            <p className={styles.good}> Correct. Good job!</p>
                        </div>
                    ): (
                        <div className={styles.result}>
                            <p className={styles.bad}> Incorrect, but nice try!</p>
                            <p className={styles.nice}>{`correct : ${trues}`}</p>
                        </div>
                    )
                )}
            </div>
        )}
    </div>
}
export default Quiz
/*
function
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-box" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="#6f32be" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
    <line x1="12" y1="12" x2="20" y2="7.5" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <line x1="12" y1="12" x2="4" y2="7.5" />
</svg>

variable
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-variable" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="#00abfb" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M5 4c-2.5 5 -2.5 10 0 16m14 -16c2.5 5 2.5 10 0 16m-10 -11h1c1 0 1 1 2.016 3.527c.984 2.473 .984 3.473 1.984 3.473h1" />
    <path d="M8 16c1.5 0 3 -2 4 -3.5s2.5 -3.5 4 -3.5" />
</svg>
*/
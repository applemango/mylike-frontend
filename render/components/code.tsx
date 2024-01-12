"use client"
import { ReactNode, useState } from 'react'
import style from "./styles/code.module.scss"
//{ children.length > 0 && children.map((child, index) => (<div></div>))}
//<pre className = { style.code }><code className = {lang[0]}>{children[0]}</code></pre>
type Props = {
    lang : string[] | string
    ,children : ReactNode[] | ReactNode
    ,name : string[] | null
}
export default function Code({lang, children, name = null }:Props) {
    const [now, setNow] = useState(0)
    if(lang && children) {
        if (!Array.isArray(children) && !Array.isArray(lang)) return (
            <div>
                <pre className = { style.code }>
                    <code className = { lang }>
                        {children}
                    </code>
                </pre>
            </div>
        )
        if(Array.isArray(children) && Array.isArray(lang) && Array.isArray(name)) {
            return (
                <div className = { style.code_array }>
                    <div className = { style.code_array_button }>
                        <div>
                            { children.length > 0 && children.map((child, index) => (
                                <button className = { `${style.code_array_button_button} ${now == index ? style.code_array_button_background_true : style.code_array_button_background_false } `}onClick={ () => setNow(index)} key = { index }>{name[index]}</button>
                            ))}
                        </div>
                    </div>
                    <div className = { style.code_array_code }>
                        { children.length > 0 && children.map((child, index) => (
                            <div className = { now == index ? style.show : style.hide } key = { index } >
                                <pre className = { style.code }>
                                    <code className = {lang[index]}>
                                        {child}
                                    </code>
                                </pre>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    }
    return (
        <div>
            <pre className = { style.code }>
                <code className = { "" }>
                    {children}
                </code>
            </pre>
        </div>
    )
    return (<div>Error Array.isArray(children) != Array.isArray(lang) or lang = children = undefined , please reading the source code</div>)
}
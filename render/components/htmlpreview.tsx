"use client"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import useMousePosition from "./hook/useMousePosition"
import useWindowSize from "./hook/useWindowSize"
import styles from "./styles/htmlpreview.module.scss"

export type HtmlPreviewConfig = {
    height: number,
    responsive: boolean
}

const defaultStyle = `
    ::-webkit-scrollbar {width: 5px;height: 5px;background-color: transparent;}
    ::-webkit-scrollbar-thumb {background-color: #f5f5f5;border-radius: 3px;}
    ::-webkit-scrollbar-track {background-color: transparent;}
    /*body::-webkit-scrollbar{display: none}*/
    html,body {padding: 0;margin: 0;font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;background-color: var(--background-color);}
    a {color: inherit;text-decoration: none;}
    * {box-sizing: border-box;}
    `
const HtmlPreview = ({body, head, style, config }:{body: string,head: string,style: string, config: string}) => {
    const [w, setW] = useState(-1)
    const [mw, setMw] = useState(0)
    const [s, setS] = useState(false)
    const ref = useRef<any>(null)
    const getConfig = (name: string, defaults: any, type: string) => {
        try {
            const config_ = JSON.parse(config.replaceAll(" ",""))
            if (config_[name] && typeof config_[name] === type)
                return config_[name]
            return defaults
        } catch (e) {return defaults}
    }
    const configs: HtmlPreviewConfig = {
        height: getConfig("height", 300, "number"),
        responsive: getConfig("responsive", true, "boolean")
    }
    useEffect(()=> {
        setS(true)
        if (!configs.responsive)
            return
        if (w != -1)
            return
        if (!ref.current?.clientWidth)
            return
        setW(ref.current.clientWidth)
        setMw(ref.current.clientWidth)
    })
    if(!s)
        return <div></div>
    return <div ref={ref} className={styles._}> 
        { configs.responsive && <input value={w} onChange={(e: any) => {
            if (e.target.value < 15)
                return setW(15)
            setW(e.target.value)
        }} max={mw - 5} className={styles.bar} type="range" style={{"--height":`${configs.height}px`} as React.CSSProperties} />}
        <iframe width={w != -1 ? w : "100%"} key={Math.random()} height={configs.height} className={styles.iframe} /*sandbox="allow-scripts"*/ srcDoc={`
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="referrer" content="no-referrer">
                <meta name="viewport" content="width=device-width">
                ${head}
                <style>${defaultStyle}</style>
                <style>${style}</style>
            </head>
            <body>
                ${body}
            </body>
        </html>`}></iframe>
    </div>
}
export default HtmlPreview
import { ReactNode, useState } from 'react'
import styles from "./styles/colors.module.scss"

type Props = {
    colors : string[] | string
}
export default function Colors({colors}:Props) {
    if(!Array.isArray(colors)) {
        return (
            <div></div>
        )
    }
    return (
        <div className={ styles.main }>
            {colors.map((color, index) => (
                <div key = {index} style={{
                    width: `calc(100% / ${colors.length})`
                    ,backgroundColor: color.indexOf(":") != -1 ? color.slice(0,color.indexOf(":")) : color
                }}
                    className = { styles.color }
                ><p style={{
                    color: color.indexOf(":") != -1 ? color.slice(color.indexOf(":")+1) : ""
                }}>{color.indexOf(":") != -1 ? color.slice(0,color.indexOf(":")) : color}</p></div>
            ))}
        </div>
    )
}
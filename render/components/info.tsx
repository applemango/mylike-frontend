import { ReactNode, useState } from 'react'
import Link from "next/link"
import styles from "./styles/info.module.scss"

type Props = {
    info : any
    link?: string
    link_name?: string
}
export default function Info({info, link, link_name}:Props) {
    if(!info.date) {info.date = "1970-01-01"}
    if(!info.name) {info.name = "Cannot be specified in editor"}
    if(!info.tags) {info.tags = ["Cannot be specified in editor"]}
    return (
        <div className={ styles.main } style={{display: "block"}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div className={ styles.info }>
                    <p className={ styles.time}>{info.date}</p>
                    <div className={ styles.space }></div>
                    <div className={ styles.tags}>
                        { info.tags && info.tags.map((tag:any, index:any) => (
                            <div key={index} className={ styles.tag}>
                                <p>{tag}</p>
                            </div>
                    ))}
                    </div>
                </div>
                <div>
                    <Link legacyBehavior href={link ? link : "/"}><a className = {styles.link_back}>{link_name ? link_name : "back"}</a></Link>
                </div>
            </div>
            <div style={{display: "flex", marginTop: 8}}>
                <p>Posted by</p>
                <div className={ styles.tags } style={{ marginLeft: 4 }}>
                    <div className={ styles.tag}>
                        <p>{info.by}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
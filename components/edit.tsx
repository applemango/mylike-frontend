"use client"
import { useState } from "react"
import { TimeLineBorderContainer } from "./timeline"
import { FormButton, Input, TextArea } from "./formTextarea"
import { motion } from "framer-motion"

export const ArticleEditFormCore = () => {
    const [open, setOpen] = useState(false)
    return <motion.div animate={{
        height: "auto"
    }} style={{
        borderBottom: "1px solid #eee",
        padding: "16px"
    }}>
        <motion.div animate={{
            height: open ? 0 : "auto",
            opacity: open ? 0 : 1
        }}>
            <p onClick={() => setOpen(true)} style={{
                textAlign: "center",
                margin: 0,
                cursor: "pointer"
            }}>Edit</p>
        </motion.div>
        <motion.div animate={{
            height: open ? "auto" : 0,
            opacity: open ? 1 : 0
        }} style={{
            overflow: "hidden",
            height: 0
        }}>
            <Input fontSize={32} name="title" />
            <Input fontSize={24} name="description" />
            <TextArea />
            <FormButton />
        </motion.div>
    </motion.div>
}
"use client"
import ReactTextareaAutosize from "react-textarea-autosize"

export const TextArea = () => {
    return <ReactTextareaAutosize style={{
        width: "100%",
        padding: 0,
        margin: 0,
        border: "none",
        outline: "none",
        resize: "none",
    }} placeholder="body" name="body" id="body" />
}

export const Input = ({ name, fontSize = 16 }:{
    name: string,
    fontSize?: number
}) => {
    return <input style={{
        width: "100%",
        padding: 0,
        margin: "4px 0",
        border: "none",
        outline: "none",
        fontSize
    }} id={name} name={name} type="text" placeholder={name} />
}

export const FormButton = () => {
    return <div style={{
        display: "flex",
        justifyContent: "flex-end"
    }}>
        <button style={{
            background: "none",
            border: "1px solid #eee",
            padding: "8px 16px",
            outline: "none",
            borderRadius: 128,
            cursor: "pointer"
        }}>投稿する</button>
    </div>
}
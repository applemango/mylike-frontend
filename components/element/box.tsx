import { ComponentProps } from "react"

type Box = ComponentProps<"div"> & {}

export const Box = ({ children, className, style, ...props }: Box) => {
    return <div style={{
        ...style,
    }} className={className} {...props}>
        {children}
    </div>
}